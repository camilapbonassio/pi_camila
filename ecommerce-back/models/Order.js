const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
    produtor: {type: String, required: true},
    item: {type: String, required: true},
    desc: {type: String, required: true},
    valor: {type: Number, required: true},
    categoria: {type: String},
    img: {type: String},
    //category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    cartQuantity: { type: Number, required: true }
    //producedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    //countInStock: { type: Number, required: true, min: 0, max: 255}
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);