const express= require("express");
const router = express.Router()
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const { Order } = require("../models/Order");


///front-end
router.post('/create-checkout-session', async (req, res) => {
  //console.log(req.body)

////create stripe matadata
const customer = await stripe.customers.create({
  
  metadata:{
    userId: req.body.userId,
    cart: JSON.stringify(req.body.cartItems)
  },

 
})




  //shipping options
  
  const line_items = req.body.cartItems.map((item) => {
    return{
     price_data:{
        currency: "usd",
        product_data: {
          name: item.item,
          images: [item.img],
          description: item.descrição,
          metadata: {
            id: item._id
          },
        },
        unit_amount: item.valor,

      },
      quantity: item.cartQuantity,
      
    }
  })
    
  
  const session = await stripe.checkout.sessions.create({

    //shipping options
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            }}}}],
          
    ///phone number
    phone_number_collection: {
      enabled: true
    },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });

  });

  ////createOrder function
  const createOrder = async(customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);

    const products = Items.map((b) => {
      return {
        productId: b.id,
        produto: b.item,
        quantidade: b.cartQuantity,
      };
    });

    console.log(products)



    const newOrder = new Order({
      userId: customer.metadata.userId,//id enviado do banco de dados
      customerId: data.customer, // id gerado pelo stripe 
      paymentIntentId: data.paymentIntent,
      products,
      subtotal: data.amount_subtotal, 
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status
    });

    try{

      console.log("Items:", Items)
      console.log("userId:", customer.metadata.userId)

      const savedOrder = await newOrder.save()
      console.log("Porcessed Order:", savedOrder)

    }catch(err){
      console.log(err)

    }
  }


 //webhook serving data

//let endpointSecret
// endpointSecret =  "whsec_33c706d46126550e04a7e0ab200af1ee4a046fdcec77d08477908479c46af966";
 
router.post('/webhook', express.raw({type: 'application/json'}), 
async (req, res) => {
  let data;
  let evenType;

  
  let webhookSecret //= process.env.STRIPE_WEB_HOOK
  
  //prevent from executing validation 
  if(webhookSecret){
    let event;
    let signature = req.headers=["stripe-signature"]

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      console.log("webhook verified")
    } catch (err) {
      console.log(`Webhook Error: ${err}`)
         return res.sendStatus(400);
    }

    data = event.data.object;
    evenType = event.type

 //expected action    
    }else{
      data = req.body.data.object;
      evenType = req.body.type

      //console.log( `data:${data}, type: ${evenType}`)
    }
  // Handle the event
  
    if(evenType === "checkout.session.completed"){
      stripe.customers.retrieve(data.customer).then(async(customer) =>{
        //console.log(customer);
        //console.log(data);
        createOrder(customer, data)
      }).catch((err) => console.log(err.message))
    }
  


  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end();

})


  module.exports = router;