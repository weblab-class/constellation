const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({

    user_id : String,
    collection_name : String,
    node_array : Array,
    edge_array : Array,

    },
    {"collection": "collections"}
    );

    // 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("Collection", collectionSchema);


