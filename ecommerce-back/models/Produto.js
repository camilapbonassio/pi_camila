const mongoose = require("mongoose");
const Categoria = require("../models/Categoria")
const User = require("../models/User")


const reviewSchema = mongoose.Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true}
},
{
    timestamps: true,
})

const productSchema = new mongoose.Schema({
userId:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
item: {type: String, required: true},
desc: {type: String, required: true},
valor: {type: Number, required: true},
countInStock: {type: Number, required: true, default:0},
img: {type: String},
categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required:true},
rating:{ type: Number, required: true, default: 0},
numReviews: {type: Number, required: true, default: 0}
},
//producedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
//countInStock: { type: Number, required: true, min: 0, max: 255}
{
    timestamps: true
} )

const Produto = mongoose.model("Produto", productSchema)

module.exports = Produto;

//added: category, producedBy