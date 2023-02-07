
const express = require('express');
const cors = require('cors');
const Joi = require("joi");
//const cors_proxy = require('cors-anywhere');
const products = require('./products') //json
const app = express();
//const https = require('https')
require("./connection")
require('dotenv').config()
const register = require("./routes/register")
const User = require('./models/User');
const login = require("./routes/login");
require("dotenv").config();
const stripe = require("./routes/stripe")
const produtos = require("./routes/produtos");
const categorias = require('./routes/categorias');
const path = require("path");
const imagens = require("./routes/imagens")

const dirname = path.resolve();
//app.use( express.static(path.join(dirname, 'images')));

app.use(express.static('./public'))


//const server = https.createServer(app);
//const {Server} = require('socket.io');
//const io = new Server(server, {
//    cors: '*',
//    methods: '*'
//  })





////

app.options('*', cors()) // include before other routes

app.del('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.options('/products/:id', cors()) // enable pre-flight request for DELETE request]

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT","DELETE"]
}));

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: '50mb'}))

//app.use(bodyParser.json({limit: '200kb'}));

////



////
app.get("/products", (req, res)=>{
  res.send(products);
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/produtos", produtos)
app.use("/api/categories", categorias)
app.use("/api/imagens", imagens)









///
const port = process.env.PORT || 5000;
app.listen(port, console.log(`server running on ${port} `));




