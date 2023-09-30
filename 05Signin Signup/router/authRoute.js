const express = require('express');
const authRouter = express.Router() //instance of router
const {signup, signin, getUser, logout} = require('../controller/controller.js')
const jwtAuth = require('../middleware/jwtAuth.js')
authRouter.post('/signup',signup)  // /signup route par koi bhi post request marega tho signup controller chalega 
authRouter.post('/signin',signin)
authRouter.get('/getuser',jwtAuth,getUser)
authRouter.get('/logout',jwtAuth, logout)
module.exports = authRouter