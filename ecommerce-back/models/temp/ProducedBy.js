const mongoose = require("mongoose");


const producedBySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    color: {
        type: String
    }

})

exports.ProducedBySchema = mongoose.model("ProducedBySchema", producedBySchema);
