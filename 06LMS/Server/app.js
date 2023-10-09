// const express = require('express');
import express from 'express';
const app = express();
// const {config} = require('dotenv');
import {config} from 'dotenv';
config();
import morgan from 'morgan' 
// const cors = require('cors');
import cors from 'cors'
// const cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js'; 
import errorMiddleware from './middlewares/error.middleware.js';
app.use(express.json()); 
app.use(cors({ 
    origin: [process.env.FRONTEND_URL],
    credentials:true, // means sensitive info and cookies can navigate from frontend to banckend
}))
app.use(cookieParser());
app.use(express.urlencoded({extended: true})); // used to parse the encoded url (bascally here we using to use req.params)

// to check server is up or not
app.use('/ping',(req,res)=>{
    res.send('pong')
});
app.use(morgan('dev'))// used to log information about incoming HTTP requests.

app.use('/api/v1/user',userRouter) 

app.all('*',(req,res)=>{ // all other urls are handeled here
    res.status(404).send(`OOPS! 404 page not found`);
});

app.use(errorMiddleware) // common middleware for error it is here because if userRouter returns next and it will come here and execute it
// module.exports = app;
export default app; 