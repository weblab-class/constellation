const mongoose = require("mongoose");

const subjectIdsSchema = new mongoose.Schema({
    subjectId : [String]
    },
    {'collection': 'subjectIds'}
);

// 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("subjectIds", subjectIdsSchema);