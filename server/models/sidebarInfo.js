const mongoose = require("mongoose");

const sidebarInfoSchema = new mongoose.Schema({

    subject_id : String,
    title : String,
    description : String,
    offered_fall : Boolean,
    offered_spring : Boolean,
    offered_IAP : Boolean,
    gir_attribute : String,
    instructors : Array,
    total_units: Number,
    level : String,
    prerequisites: String,
    corequisites: String,

    },
    {'collection': 'sidebarInfo'}
);

// 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("sidebarInfo", sidebarInfoSchema);