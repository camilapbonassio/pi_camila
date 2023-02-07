const mongoose = require("mongoose");


const imagensSchema = new mongoose.Schema({

    banner:{type: String},
    produtos: {type: String},
    categoria1: {type: String},
    categoria2: {type: String},
    categoria3: {type: String}
})

const Imagens = mongoose.model("Imagens", imagensSchema)

exports.Imagens = Imagens;


 