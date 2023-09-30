// const express = require('express'); // after writing "type": "module" this will not work
// import express from "express"
// const app = express();
import app from './app.js' // above two lines not required
// const mongoose = require('mongoose');
import mongoose from 'mongoose';  // used after writing  "type": "module"  in package.json
const port = 3050;
//db connection (mongodb) using mongoose 
// mongoose.connect('mongodb://localhost/example') // correct but not used because no error handling and there is time required to connect db and here we not wait for it.
/*  Things to know (trick)
    1. Database connection may fail
    2. Database always in another continent (means mai india mai to vo ameriaca mai and vice versa)
*/
(async ()=>{                //()() // iffy: Immidiatly invoked function
    try {
        // db connection
        await mongoose.connect('mongodb://localhost/example');
        console.log("DB connected successfully");

        app.on("error",(err)=>{           // error event listner used because suppose if database is up (perfectly connected) but server is down.
            console.log("Error on server", err);
            throw err;
        })

        app.listen(port,()=>{       // if db is connected and no error in db connection and app then listen
            console.log(`listneing on port: ${port}`);
        })

    } catch (error) {
        console.log("ERror", error);
        throw error;
    }
})()
// app.listen(port,()=>{                        // not used because cant listen before db connection
//     console.log(`Example app l`);
// })