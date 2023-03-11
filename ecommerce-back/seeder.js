const mongoose = require('mongoose');
require('dotenv').config()
//import colors from 'colors'
const users = require("./users")
const products = require("./products")
const categoria = require("./categoria")
const User = require("./models/User");
const Produto = require("./models/Produto");
const Order = require("./models/Order");
const Categoria = require("./models/Categoria")
require("./connection")


const importData = async() => {
    try {
        await Order.deleteMany()
        await Produto.deleteMany()
        await User.deleteMany()
        await Categoria.deleteMany()

        const createdUsers = await User.insertMany(users)
        const createdCategories = await Categoria.insertMany(categoria)

        const AdminUser = createdUsers[0]._id
        const CatFirst = createdCategories[0]._id

        const sampleProducts = products.map(product => {
            return {...product, user: AdminUser, categoria:CatFirst}
        })

        await Produto.insertMany(sampleProducts)

        console.log("Data Imported")

        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
        
    }
}

const destroyData = async() => {
    try {
        await Order.deleteMany()
        await Produto.deleteMany()
        await User.deleteMany()

        console.log("Data detroyed".red.inverse)

        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
        
    }
}

if (process.argv[2] === "-d"){
    destroyData()
} else {
    importData()
}