const mongoose = require("mongoose");

const graphInfoSchema = new mongoose.Schema({

    subject_id : String,
    prerequisites: Array,
    corequisites: Array,
    related_subjects: Array,
    gir_attribute: String,
    after_subjects: Array,

},
{'collection': 'graphInfo'}
);

// 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("graphInfo", graphInfoSchema);