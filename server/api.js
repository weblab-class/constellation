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
// const Tags = require("./models/tags.js");
//SHOULD ABOVE BE ./models/collections.js??????

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
  
  if(typeof req.query.subject_id === 'undefined'){
    const errorStr = "Did not specify subject_id as parameter in empty query -- did you use the wrong parameter name?";
    console.log(errorStr);
    res.status(400).send( {errorMessage : errorStr} );
    return false;
    }
  if(!(typeof req.query.subject_id === "string")){
    errorStr = "subject_id argument is not a String.";
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

  graphInfo.find({"subject_id" : String(req.query.subject_id)}).then(
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

  sidebarInfo.find({"subject_id" : String(req.query.subject_id)}).then(
    (nodeInfo) => {res.send(nodeInfo);}
    ).catch(
      (err) => {res.status(500); res.send({info : err.message});}
    );
});

//Note to self for later: 403 not authorized. don't get user data -> req.user id is not the current user, throw an error!

// POST REQUESTS : TAG INFORMATION

router.post("/saveTags", (req, res) => {

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