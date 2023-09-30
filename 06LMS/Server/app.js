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
    credentials:true, 
}))
app.use(cookieParser());
// to check server is up or not
app.use('/ping',(req,res)=>{
    res.send('pong')
});
app.use(morgan('dev')) // Morgan is a middleware for logging HTTP requests in an Express.js application. It provides a way to log various details about incoming HTTP requests, such as the HTTP method, URL, status code, response time, and more. Developers often use it for debugging and monitoring purposes.
//of requests and responses, helping developers identify issues and monitor the application's behavior.
//all other url

app.use('/api/v1/user',userRouter) 

app.all('*',(req,res)=>{
    res.status(404).send(`OOPS! 404 page not found`);
});

app.use(errorMiddleware) // common middleware for error it is here because if userRouter returns next and it will come here and execute it
// module.exports = app;
export default app; 