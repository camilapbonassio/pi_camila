const express = require("express");
const {Imagens} = require("../models/Imagens")
const router = express.Router();

/// listar todas as imagens
router.get("/", async(req, res) => {
    try {
        const imagens = await Imagens.find()
        res.status(200).send(imagens)
        
    } catch (error) {
        
        console.log(error)
        res.status(500).send(error);
    }
    
})

module.exports = router;