const http = require('http');

let server = http.createServer((req,res)=>{
    if(req.url == '/'){
        res.write('<h1>Hello, Node.js!</h1>');
    }
    else if (req.url == '/about') {
        res.write("<h1>This is about page!")
    }
    res.end();
});

server.listen(5000);
console.log("The HTTP server is running on port 5000");