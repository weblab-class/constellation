const mongoose = require("mongoose")

const collectionNameSchema = new mongoose.Schema({

    userId : String,
    names : [String],

},
{'collection': 'collectionNames'}
);
    
// 1/13: https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose
module.exports = mongoose.model("collectionName", collectionNameSchema);

