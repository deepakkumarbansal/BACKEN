import express from "express"
const app = express();


// routes
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.get('/instagram',(req,res)=>{
    res.send("You visited instagram")
})


export default app;
