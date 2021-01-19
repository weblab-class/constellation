const mongoose = require("mongoose");

const sidebarInfoSchema = new mongoose.Schema({

    subjectId : String,
    title : String,
    description : String,
    offeredFall : Boolean,
    offeredSpring : Boolean,
    offeredIAP : Boolean,
    girAttribute : String,
    instructors : Array,
    totalUnits: Number,
    level : String,
    prerequisites: String,
    corequisites: String,

    },
    {'collection': 'sidebarInfo'}
);

// 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose

module.exports = mongoose.model("sidebarInfo", sidebarInfoSchema);