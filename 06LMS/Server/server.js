// const app = require('./app.js');

import app from './app.js'; //because type:"module" is used in package.json
import connectionToDB from './config/dbConnection.js';
const PORT = process.env.PORT || 6000;

// import cloudinary from 'cloudinary'
// v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

import {v2 as cloudinary} from 'cloudinary';
// used to configure cloudnary because before upload file we have to set where we want to upload        
cloudinary.config({ 
  cloud_name: 'dzj1jgg2q', 
  api_key: '369457754561541', 
  api_secret: '8uBiJfHeCdVxJtQdlCIz2Y-z7BY' 
});


app.listen(PORT, async ()=>{
    await connectionToDB();
    console.log(`Server up at port ${PORT}`);
})  