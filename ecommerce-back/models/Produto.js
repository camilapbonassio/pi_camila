const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
produtor: {type: String, required: true},
item: {type: String, required: true},
desc: {type: String, required: true},
valor: {type: Number, required: true},
categoria: {type: String},
img: {type: String},
category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
//producedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
//countInStock: { type: Number, required: true, min: 0, max: 255}


}, {
    timestamps: true
} )

const Produto = mongoose.model("Produto", productSchema)

exports.Produto = Produto;

//added: category, producedBy