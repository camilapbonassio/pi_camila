const express = require("express");
const {Categorias} = require("../models/Categoria")
const router = express.Router();

/// listar todas categorias
router.get("/", async (req, res) => {
    const categoryList = await Categorias.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList)
})

//// find specific category
router.get("/find/:id", async (req, res) => {
    const category = await Categorias.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: "the id is wrong"})
    }
    res.status(200).send(category)
})

/// update
router.put("/update/:id", async (req, res) =>{
    const category = await Categorias.findByIdAndUpdate(
        req.params.id, {

            $set: {
                name: req.body.name,
                color: req.body.color,
            },
        }, 

        {new: true}
        
    )
    if(!category)
    return res.status(400).send("the category cannot be created")

    res.status(200).send(category)
})



router.post(("/"), async (req, res) => {
    const{name, color} = req.body
    try {

        if(name){
            const category = new Categorias({
                name,
                color
            })

            const savedCategory = await category.save()

            res.status(200).send(savedCategory);
        }
        
    } catch(error) {

        console.log(error)
        res.status(500).send(error);

} })

router.delete("/:id", (req, res)  => {
    Categorias.findByIdAndRemove(req.params.id).then(category =>{
    try{
        if(category) {
            return res.status(200).json({success: true, message: "category deleted"})
        } else {
            return res.status(404).json({success: false, message: "category not found"})
        }
    }catch(err) {
        res.status(500).send(error);
    }
})
})

module.exports = router;