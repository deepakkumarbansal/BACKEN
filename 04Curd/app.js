require('dotenv').config();/* 
require('dotenv').config(); is used to load environment variables from a .env file into the Node.js runtime environment.
require('dotenv'): This statement imports the dotenv module, used for managing environment variables.
.config(): This method is called on the dotenv module, it reads the contents of the .env file (located in the root directory of your project by default).
The purpose of using dotenv is to keep sensitive information like API keys, database URLs, and others. Instead, you store them in a .env file, 
which is not included in your VCS (e.g., Git).
*/
const express = require('express');
const app = express();
const connectToDb = require('./config/db.js') // connecting to db
const cors = require("cors") /*Cross orign request: CORS defines a way for client web applications that are loaded in one domain to interact with 
resources in a different domain.*/

// Express middlewares, write before db connection; 
app.use(express.json()); // allow json data
app.use(express.urlencoded({extended: true})); /* allow url encoded data for db; when we use get method and send the data using GET method,
 data will go through url and url will encode the data know as url encoded data and then we have to decode this data */
app.use(cors())

//init connection to db
connectToDb()

const userRouter = require("./routes/userroutes.js")
app.use('/',userRouter);/* 
We can also get all functions from controller.js to app.js directly but we usualy avoid it 
Instead of this we use controller.js --> routes.js --> app.js
*/

module.exports = app; // export default app; //not used because import syntax is not used to import express module
