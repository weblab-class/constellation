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

// GET REQUESTS : GRAPH INFORMATION

const goodGraphInfoArguments = (req, res) => {

  // 1/15: https://stackoverflow.com/questions/203739/why-does-instanceof-return-false-for-some-literals
  
  if(typeof req.query.subjectId === 'undefined'){
    const errorStr = "Did not specify subjectId as parameter in empty query -- did you use the wrong parameter name?";
    console.log(errorStr);
    res.status(400).send( {errorMessage : errorStr} );
    return false;
    }
  if(!(typeof req.query.subjectId === "string")){
    errorStr = "subjectId argument is not a String.";
    console.log(errorStr);
    res.status(400).send( {errorMessage : errorStr} );
    return false;
  }
  return true;
}

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

router.get("/collectionNames", auth.ensureLoggedIn, (req, res) => {

  collectionName.find({"userId": req.user}).then(
    (userCollectionNames) => {

    if (userCollectionNames === null){
      return [];
    }

    //Check for authorized user.

    if(req.user._id !== userCollectionNames[0].userId){
      const errorMessage = "Attempted to request information that does not belong to this user.";
      console.log(errorMessage);
      res.status(403); res.send({message : errorMessage});
    }
    
    res.send(userCollectionNames);
    
    }).catch(
      (err) => {res.status(500); res.send({info : err.message});}
    );


});

router.get("/loadCollection", auth.ensureLoggedIn, (req, res) => {

  console.log("Req user in loadCollection:"+req.user._id);

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

router.post("/saveCollection", auth.ensureLoggedIn, (req, res) => {

  // If POST request is attempted and user is not logged in,
  //    reject the POST request.

  if (!req.user){
    console.log("Post request was attempted with non-logged in user. Terminating request.")
    return;
  }
  
  // this will save the name of the collection
  
  collectionName.findOne({"userId": req.user}).then(
    (userCollectionNames) => {

      //If user does not yet have saved collections
      if(!userCollectionNames){

        const newCollection = new collectionName({
          userId : req.user,
          names : [req.body.collectionName]
        });
        
        newCollection.save();
      }

      else {

        // Need to update the collection names
        userCollectionNames.names = [... userCollectionNames.names].concat([req.body.collectionName]);
        userCollectionNames.save();
        
      }

    });

  //This will save the collection itself.

  //Either update the contents of the graph
  //  or save a new Graph.

  Collection.findOne({
    "userId": req.user, "collectionName": req.body.collectionName
  }).then(
    (thisGraph) => {
      if(thisGraph === null){
        //if the collection doesn't already exist
        
        const graph = new Collection({
          userId : req.user,
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


// POST REQUESTS : TAG INFORMATION

router.post("/dontUseSaveTags", (req, res) => {

  // DON'T USE THIS FUNCTION, IT WILL BE REMOVED LATER.
  // Please don't remove it either! I may use some of it for later type checking.

  if(typeof req.body.tag_name === "undefined" || typeof req.body.nodes_active === "undefined"){
    const errorString = "Did not specify either tag_name or nodes_active as parameters in empty query -- did you use the wrong parameter names?"
    console.log(errorString);
    res.status(400).send( {errorMessage : errorString} );
    return;
  }
  if(!(typeof req.body.tag_name === "string")){
    const errorStr = "tag_name is not a string."
    console.log(errorStr);
    res.status(400).send( {errorMessage : errorStr} );
    return;
  }
  // 1/15: How to use filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  if(!(typeof req.body.nodes_active === "Array"
          && req.body.nodes_active.filter(
            class_name => typeof class_name !== "string").length === 0)){
    const errorStr = "nodes_active is not an Array of strings.";
    console.log(errorStr);
    res.status(400).send( {errorMessage : errorStr} );
    return;
  }

  const newTag = new Tags({
    user_ID : req.user,
    tag_name : req.body.tag_name,
    nodes_active : req.body.nodes_active
  });

  newTag.save().then((savedTags) => {res.send(savedTags)}).catch(
    (err) => {res.send(err);}
  );

});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;