const mongoose = require("mongoose");


const categoriasSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    color: {
        type: String
    }

})


exports.Categorias = mongoose.model("Categorias", categoriasSchema);