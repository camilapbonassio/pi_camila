const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const User = require("../models/User");
const genAuthToken = require("../utils/genAuthToken");
//const jwt = require("jsonwebtoken");
const router = require('express').Router();
require('dotenv').config()
//const User = require('../models/User');



router.post('/', async(req, res) => {

    const schema = Joi.object({
        
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),

    });
    console.log(req.body)
    
    const {error} = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});

    if (!user) return res.status(400).send("Invalid email or password");

    const isValid = await bcrypt.compare(req.body.password, user.password);
    console.log(isValid)

    if (!isValid) return res.status(400).send("Invalid email or password")

    console.log(user._id, user.name, user.email)
    let token = genAuthToken(user);
    console.log(token)

    //send to front
        res.send(token)
});

/*
function genAuthToken (user) {
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
        {
            _Id: user._id,
            name: user.name,
            email: user.email
        },
        secretKey
    );
};
*/

module.exports = router;