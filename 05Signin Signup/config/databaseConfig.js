const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname,"..",".env")
})
const mongoDbURL = process.env.mongoDbURL   // right side after or,used for inside computer

const connectToDb = ()=>{
    mongoose.connect(mongoDbURL)
    .then((conn)=>console.log(`Connected to DB ${conn.connection.host}`))
    .catch((err)=>console.log(err.message))
}

module.exports = connectToDb;