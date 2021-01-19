const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({

    userId : String,
    collectionName : String,
    nodeArray : Array,
    edgeArray : Array

    },
    {"collection": "collections"}
    );

    // 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("Collection", collectionSchema);


