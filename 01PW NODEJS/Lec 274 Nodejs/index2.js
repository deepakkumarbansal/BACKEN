const { error } = require('console');
const http = require('http');

const port = 3026;
const hostName = 'localhost';

const server = http.createServer((req,res)=>{
    //home
    if(req.url == '/'){
        res.statusCode= 200;
        res.setHeader('content-type','text/plain');
        res.end("Welcome to home");
    }
    // About page
    else if(req.url == '/about'){
        res.statusCode= 200;
        res.setHeader('content-type','text/plain');
        res.end("Welcome to about");
    }
    //contact us
    else if(req.url == '/contact'){
        res.statusCode= 200;
        res.setHeader('content-type','text/plain');
        res.end("Welcome to contact us");
    }
    //product
    else if(req.url == '/product'){
        res.statusCode= 200;
        res.setHeader('content-type','application/json');
        res.end(JSON.stringify({Product:"Product 1"}));
    }
    //rest-> error
    else{
        res.statusCode= 500;
        res.setHeader('content-type','text/plain');
        res.end("error!");
    }
})
server.listen(port,()=>{
    console.log(`Server started at ${hostName}:${port}`);
})