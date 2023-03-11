const mongoose = require('mongoose');
const User = require("../models/User")



const orderSchema = mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    orderItems:  [{
      item: {type:String, required: true},
      desc: {type: String, required: true},
      valor: {type: Number, required: true},
      categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required:true},
      img: {type: String},
      cartQuantity: { type: Number, required: true }
    }],
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
  
    totalPrice: {
      type: Number,
      required: true,
    },
    
    shippingAddress: {
      address: {type: String, required: true},
      city: {type: String, required: true},
      postalCode: { type: String, required: true},
      country: { type: String, required: true}
    },
    paymentMethod: {
      type: String,
      required: true,
      default:false
    },
    paymentResult: {
      id: { type: String},
      status: { type: String},
      update_time: { type: String },
      email_address: { type: String}
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt:{
      type: Date
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
  },
  deliveredAt:{
    type: Date
  },

},
  { 
    timestamps: true 
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order