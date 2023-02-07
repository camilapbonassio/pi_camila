const express = require("express")
const cloudinary = require("../utils/cloudinary")
const {Produto} = require("../models/Produto")
const {Categorias} = require("../models/Categoria")
const {isAdmin} = require("../middleware/auth")
const {upload} = require ("../middleware/multer")
var fs = require('fs');
var path = require('path');
require('dotenv/config');
const multer  = require('multer');
const router = express.Router()

//receber do cliente (do dashboard) - criar produto



router.post("/", upload.single("image"), async (req, res) =>{

    ///valida a categoria
const category = await Categorias.findById(req.body.categorias)
if(!category) return res.status(400).send("Invalid Category")

    try{
    const product = new Produto ({
        item: req.body.item,
        desc: req.body.desc,
        valor: req.body.valor,
        categorias: req.body.categorias,
        img:req.file.originalname
    })
    console.log(req.body)
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
        } catch(error){
        console.log(error)
        }
    })

    

/// enviar para o cliente (para a tela de produtos)
router.get("/", async(req, res) => {
    try {
        const products = await Produto.find().populate('categorias')
        res.status(200).send(products)
        
    } catch (error) {
        
        console.log(error)
        res.status(500).send(error);
    }
    
})


// get product by id 
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Produto.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error)
        
    }
})



//delete product
router.delete("/:id", async (req,res) => {
    try{
        const product = await Produto.findById(req.params.id);

        if (product) {
            const deletedProduct = await Produto.findByIdAndDelete(req.params.id);
            res.status(200).send(deletedProduct);}
            else{
                console.log("failed to delete product")} 
        } catch (err){
        res.status(500).send(err);
    }
})

//edit productImg
///valida a categoria
//const category = await Category.findById(req.body.category)
//if(!category) return res.status(400).send("Invalid Category")
router.put("/:id", upload.single("image"), async(req, res) => {
    Produto.findById(req.params.id)
    .then((formData) =>{
        formData.item = req.body.item,
        formData.desc = req.body.desc,
        formData.valor = req.body.valor, 
        formData.categorias = req.body.categorias,
        formData.img = req.file.originalname;

        formData
        .save()
        .then(() => res.json("updated"))
        .catch((err) => res.status(400).json(`Error: ${err}`))
    })
    .catch ((err) => res.status(400).json(`Error: ${err}`))
});


module.exports = router;