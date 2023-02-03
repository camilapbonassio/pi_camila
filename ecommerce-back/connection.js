require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_uri, {useNewUrlParser: true} )
.then(() => console.log('connected to mongod'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
    console.log(err)
})



  