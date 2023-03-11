const express = require("express")
const cloudinary = require("../utils/cloudinary")
const Produto = require("../models/Produto")
const Categoria = require("../models/Categoria")
const {isAdmin} = require("../middleware/auth")
const {upload} = require ("../middleware/multer")
var fs = require('fs');
var path = require('path');
require('dotenv/config');
const multer  = require('multer');
const router = express.Router()
const asyncHandler = require('express-async-handler')

//receber do cliente (do dashboard) - criar produto



router.post("/", upload.single("image"), async (req, res) =>{

    ///valida a categoria


    try{
    const product = new Produto ({
        userId: req.body.userId,
        item: req.body.item,
        desc: req.body.desc,
        valor: req.body.valor,
        categoria: req.body.categoria,
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
        const products = await Produto.find({})//.populate('categoria')
        res.status(200).send(products)
        
    } catch (error) {
        
        console.log(error)
        res.status(500).send(error);
    }
    
})


// get product by id 
router.get("/find/:id", asyncHandler (async (req, res) => {
    
        const product = await Produto.findById(req.params.id);
        
        if (product){
            res.json(product)
        } else{
            res.status(404)
            throw new Error ('Product not find') //middleware
        }
    
        res.status(500).send(error)
        
    }
))



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
        formData.userId = req.body.userId,
        formData.item = req.body.item,
        formData.desc = req.body.desc,
        formData.valor = req.body.valor, 
        formData.categoria = req.body.categoria,
        formData.img = req.file.originalname;

        formData
        .save()
        .then(() => res.json("updated"))
        .catch((err) => res.status(400).json(`Error: ${err}`))
    })
    .catch ((err) => res.status(400).json(`Error: ${err}`))
});




module.exports = router;