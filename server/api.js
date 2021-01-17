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

//Required methods:

router.get("/graphNode", (req, res) => {

  graphInfo.find({"subject_id" : String(req.query.subject_id)}).then(
    (nodeInfo) => {
      res.send(nodeInfo).catch(
        (err) => {console.log(err);}
      )}).catch(
        (err) => {console.log(err);}
      );
});

router.get("/sidebarNode", (req, res) => {
  sidebarInfo.find({"subject_id" : String(req.query.subject_id)}).then(
    (nodeInfo) => {res.send(nodeInfo)}
    );
});

/*

router.get("/graphNode", async (req, res) => {

  try {
    const nodeInfo = await graphInfo.find({"subject_id" : String(req.query.subject_id)});
    await res.send(nodeInfo);
  } catch (err) {
    console.log("Error in sending/receiving graph information request.");
    console.log(err);
  }

});

router.get("/sidebarNode", async (req, res) => {

  try{
    const classInfo = sidebarInfo.find({"subject_id" : String(req.query.subject_id)});
    await res.send(classInfo);
  } catch (err) {
      console.log("Error in sending/receiving side bar information request.");
      console.log(err);
    }
});

*/

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
