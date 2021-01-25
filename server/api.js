/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

//Changing this line to test commit

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const graphInfo = require("./models/graphInfo.js");
const sidebarInfo = require("./models/sidebarInfo.js");
const collectionName = require("./models/collectionName.js");
const Collection = require("./models/collection.js");
const subjectIds = require("./models/subjectIds.js");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// GET REQUESTS : CLASS INFORMATION (public information)

const goodGraphInfoArguments = (req, res) => {

  // 1/15: https://stackoverflow.com/questions/203739/why-does-instanceof-return-false-for-some-literals
  
  if(typeof req.query.subjectId === 'undefined'){
    const errorStr = "Did not specify subjectId as parameter in empty query -- did you use the wrong parameter name?";
    console.log(errorStr);
    res.status(400).send( {errorMessage : errorStr} );
    return false;
    }
  if(!(typeof req.query.subjectId === "string")){
    const errorStr = "subjectId argument is not a String.";
    console.log(errorStr);
    res.status(400).send( {errorMessage : errorStr} );
    return false;
  }
  return true;
}

/*
subjectIds (GET)

  Arguments: None,
  Returns:
    an Object with attribute
      subjectId, an Array of Strings,
        which list all of the decimal class names.
*/

router.get("/subjectIds", (req, res) => {

  subjectIds.findOne({}).then(
    (allSubjectIds) => {
      res.send(allSubjectIds);
    }
  )
});

/*
graphNode (GET)

  Arguments: subjectId, a String, the decimal representation of the class name
  Returns:
    a graphNode-style object, with the following information:
      subjectId : String, the decimal representation name
      prerequisites: Array, listing subjectIds
      corequisites: Array, listing subjectIds
      relatedSubjects: Array, listing subjectIds
      girAttribute: String, present if the class if a GIR
      afterSubjects: Array, listing subjectIds
    
*/

router.get("/graphNode", (req, res) => {

  if(!goodGraphInfoArguments(req, res)){
    return;
  }

  graphInfo.find({"subjectId" : String(req.query.subjectId)}).then(
    (nodeInfo) => {
      res.send(nodeInfo);
    }).catch(
        (err) => {res.status(500).send({info : err.message});}
      );
});

/*
sidebarNode (GET)

  Arguments: subjectId, a String, the decimal representation of the class name
  Returns:
    a sidebarNode-style object, with the following information:
        subjectId : String,
        title : String,
        description : String,
        offeredFall : Boolean,
        offeredSpring : Boolean,
        offeredIAP : Boolean,
        girAttribute : String,
        instructors : Array,
        totalUnits: Number,
        level : String,
        prerequisites: String,
        corequisites: String,
    
*/

router.get("/sidebarNode", (req, res) => {
  if(!goodGraphInfoArguments(req, res)){
    return;
  }

  sidebarInfo.find({"subjectId" : String(req.query.subjectId)}).then(
    (nodeInfo) => {res.send(nodeInfo);}
    ).catch(
      (err) => {res.status(500); res.send({info : err.message});}
    );
});

// COLLECTION REQUESTS : user-specific

/*
collectionNames (GET)

  Requires: User to be logged in
  Arguments: None
  Returns: a List of the CollectionNames,
    empty if the User has no collections yet.

*/

router.get("/collectionNames", auth.ensureLoggedIn, (req, res) => {

  collectionName.find({"userId": req.user._id}).then(
    (userCollectionNames) => {

    if (userCollectionNames.length === 0){
      res.send([]); return;
    }
    
    res.send(userCollectionNames);
    
    }).catch(
      (err) => {res.status(500); res.send({info : err.message});}
    );


});

/*
loadCollection (GET)

  Requires: User to be logged in
  Arguments:
    collectionName, the string name of the collection to be requested.
  Returns:
    a collection-type object:
      userId : String,
      collectionName : String,
      nodeArray : Array, to be used in VisNetwork
      edgeArray : Array, to be used in VisNetwork
*/

router.get("/loadCollection", auth.ensureLoggedIn, (req, res) => {

  Collection.findOne({
    "userId": req.user._id, "collectionName": req.query.collectionName
  }).then(
    (thisGraph) => {

      res.send({
        nodeArray: thisGraph.nodeArray,
        edgeArray: thisGraph.edgeArray,
      });
    }
  );

});


/*
saveCollection (POST)

  Requires: User to be logged in
  Arguments:
    collectionName, the string name of the collection to be requested.
  Saves:
      a collection-type object:
        userId : String,
        collectionName : String,
        nodeArray : Array, to be used in VisNetwork
        edgeArray : Array, to be used in VisNetwork
      will overwrite previous collection contents.
  Updates:
    if the collection was not previously loaded from database,
      adds the current collectionName to the list of collectionNames for the user
*/

router.post("/saveCollection", auth.ensureLoggedIn, (req, res) => {
  
  // this will save the name of the collection
  
  collectionName.findOne({"userId": req.user._id}).then(
    (userCollectionNames) => {

      //If user does not yet have saved collections
      if(!userCollectionNames){

        const newCollection = new collectionName({
          userId : req.user._id,
          names : [req.body.collectionName]
        });
        
        newCollection.save();
      }

      else {

        // Need to update the collection names if this canvas is not already present.
        //If the canvas is already present, it's updating an old collection by definition
        //  (front end will eventually reject duplicate names for different canvas)

        if (!(userCollectionNames.names.includes(req.body.collectionName))){

          userCollectionNames.names = [... userCollectionNames.names].concat([req.body.collectionName]);
          userCollectionNames.save();
        }
  
      }

    });

  //This will save the collection itself.

  //Either update the contents of the graph
  //  or save a new Graph.

  Collection.findOne({
    "userId": req.user._id, "collectionName": req.body.collectionName
  }).then(
    (thisGraph) => {
      if(thisGraph === null){
        //if the collection doesn't already exist
        
        const graph = new Collection({
          userId : req.user._id,
          collectionName : req.body.collectionName,
          nodeArray : req.body.nodeArray,
          edgeArray : req.body.edgeArray,
        });

        graph.save();
      }
      else{
        //update the collection
        thisGraph.nodeArray = req.body.nodeArray;
        thisGraph.edgeArray = req.body.edgeArray;

        thisGraph.save();
      }
    }
  );
 });


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;