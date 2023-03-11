
const express = require("express")
const router = express.Router()
const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
const User = require("../models/User")


///post request
router.post("/", asyncHandler(async (req, res) => {
    const {
        userId, 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        cartTotalAmount, 
        taxPrice, 
        shippingPrice,
        totalPrice 
        } = req.body


if(orderItems && orderItems.lenght === 0) {
    res.status(400)
    throw new Error('No order items')
} else{
    const order = new Order({
        userId,
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        cartTotalAmount, 
        taxPrice, 
        shippingPrice,
        totalPrice 
        
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)

}

}))


///get by id request
router.get("/find/:id", asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id).populate( 'userId')

    if(order) {
        res.json(order)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }
}))

module.exports = router;