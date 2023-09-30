const mongoose = require("mongoose");

const path = require("path"); // import path module becuause .env and db.js are not is same directory, so to give path of .env we are using path module
require("dotenv").config({
    path: path.join(__dirname,"..",".env")
});

const connectToDb = async ()=>{
    // you can also use await
    mongoose.connect(process.env.MONGO_URL)
    .then((connection)=>{
        console.log(`Connected to DB: ${connection.connection.host}`);
    })
    .catch((err)=>{
        console.log(err.message);
        process.exit(5)
    })
    
}
module.exports = connectToDb

