// modules imported here
require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express(); // create instanse of server
const authRouter = require('./router/authRoute.js');
const connectToDb = require('./config/databaseConfig.js');
const cors = require('cors');
connectToDb()
app.use(express.json())
app.use(cookieParser()); // used make sure that cookie will be parsed because serialised data is pased 
app.use(cors({
    origin:[process.env.ClientUrl],
    credenctials: true
}))
app.use('/api/auth/',authRouter);


app.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data:'JWTauth server'
    })
})




module.exports = app;
