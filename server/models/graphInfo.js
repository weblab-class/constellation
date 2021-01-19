const mongoose = require("mongoose");

const graphInfoSchema = new mongoose.Schema({

    subjectId : String,
    prerequisites: Array,
    corequisites: Array,
    relatedSubjects: Array,
    girAttribute: String,
    afterSubjects: Array,

},
{'collection': 'graphInfo'}
);

// 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("graphInfo", graphInfoSchema);