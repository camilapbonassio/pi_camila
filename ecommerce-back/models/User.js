const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'is required']
        
        
    },

    email:{
        type: String,
        required: [true, 'is required'],
        unique: true
        
        
        },

        password:{
            type: String,
            required: [true, 'is required']
            

        },

        isAdmin: { type: Boolean, default: false},
        
       
    }, {
        timestamps: true
    });

    

const User = mongoose.model('User', userSchema)

module.exports= User;