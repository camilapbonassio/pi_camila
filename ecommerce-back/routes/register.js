const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const User = require("../models/User");
const genAuthToken = require("../utils/genAuthToken");
const router = require('express').Router();
//const User = require('../models/User');



router.post('/', async(req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),

    });
    //console.log(req.body)
    const {error} = schema.validate(req.body)
//if error
    if(error) return res.status(400).send(error.details[0].message);
//else, find user
    let user = await User.findOne({email: req.body.email});
/// if user is registered
    if (user) return res.status(400).send("User already exist..");
///else, user not registered
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

//hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

//save to database
    await user.save();

//generate token
    const token = genAuthToken(user);

//send to front
    res.send(token)

});

module.exports = router

