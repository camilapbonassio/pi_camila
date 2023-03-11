const mongoose = require("mongoose");


const categoriaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    color: {
        type: String
    }

})


//exports.Categoria = mongoose.model("Categoria", categoriaSchema);

const Categoria = mongoose.model("Categoria", categoriaSchema)

module.exports = Categoria;