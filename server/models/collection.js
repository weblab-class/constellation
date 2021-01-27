const { faObjectGroup } = require("@fortawesome/free-solid-svg-icons");
const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({

    userId : String,
    collectionName : String,
    nodeArray : Array,
    edgeArray : Array,
    filterObject : Array,

    },
    {"collection": "collections"}
    );

    // 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose
    // 1/26: https://stackoverflow.com/questions/24442676/mongoose-schema-types-mixed-not-working

module.exports = mongoose.model("Collection", collectionSchema);


