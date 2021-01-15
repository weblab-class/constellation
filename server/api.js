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

router.post("/test", (req, res) => {

  testObj = new graphInfo({
    "subject_id": "1.00 test another new",
    "prerequisites": ["18.01", "18.01A", "CC.181A", "ES.1801", "ES.181A"],
    "corequisites": [],
    "related_subjects": ["1.082", "1.000", "1.631", "1.063", "6.481", "1.125", "1.205", "6.802", "6.874", "IDS.524"],
    "gir_attribute": "REST",
    "after_subjects": ["1.124", "1.079", "1.020", "16.405", "6.141", "1.022", "2.091", "1.041", "15.053", "16.35"]
  });

  console.log("Is in post request.")
  testObj.save().then((info) => console.log(info));
  console.log(JSON.stringify(testObj));

});

router.get("/graphNode", (req, res) => {

  graphInfo.find({"subject_id" : String(req.query.class_id)}).then(
    (nodeInfo) => {
      res.send(nodeInfo)});

});

router.get("/sidebarNode", (req, res) => {
  sidebarInfo.find({"subject_id" : String(req.query.class_id)}).then(
    (nodeInfo) => {res.send(nodeInfo)}
    );
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
