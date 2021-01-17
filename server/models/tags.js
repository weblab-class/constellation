const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({

    user_ID : String,
    tag_name : String,
    nodes_active: Array,

    },
    {"collection": "tags"}

    );

    // 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("Tags", tagsSchema);


