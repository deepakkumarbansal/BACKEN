const express = require('express'); // import express library/ module
const app = express(); // create instance of express application by calling express()

const port = 4010;
const hostname = 'localhost';
//home page
app.get('/',(req,res)=>{ //create route with response "Hello World"
    res.send("Hello World");
})
//about page
app.get('/about',(req,res)=>{
    res.send("About page");
})
// contact us page
app.get('contact',(req,res)=>{
    res.send("Contact us");
})

app.listen(port,()=>{
    console.log(`Server running at ${hostname}:${port}`);
})