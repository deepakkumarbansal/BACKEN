const http = require('http');

http.createServer((req,res)=>{
    if(req.url == '/'){
        res.write("<h1>I Am Happy To Learn Full Stack Web Development From PW Skills!<h1>")
    }
    res.end();
}).listen(5000);
console.log("Server Created");
