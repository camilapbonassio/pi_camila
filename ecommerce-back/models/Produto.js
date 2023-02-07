const mongoose = require("mongoose");
const Categorias = require("../models/Categoria")


const productSchema = new mongoose.Schema({
item: {type: String, required: true},
desc: {type: String, required: true},
valor: {type: Number, required: true},
img: {type: String},
categorias: { type: mongoose.Schema.Types.ObjectId, ref: "Categorias", required:true}
//producedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
//countInStock: { type: Number, required: true, min: 0, max: 255}


}, {
    timestamps: true
} )

const Produto = mongoose.model("Produto", productSchema)

exports.Produto = Produto;

//added: category, producedBy