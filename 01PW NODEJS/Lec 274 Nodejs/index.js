const http = require('http');
const { json } = require('stream/consumers');

const PORT = 3072;
const hostNAme = "localhost";

const server = http.createServer((req,res)=>{

    //home
    if(req.url == '/'){
        res.statusCode = 200;
        res.setHeader('content-type','text/plain');
        res.end("Welcome to Node js server by Deepak");
    }
    //about
    else if(req.url == '/about'){
        res.statusCode= 200;
        res.setHeader('content-type','text/plain');
        res.end("About Page");
    }
    //contact us
    else if(req.url == '/contact'){
        res.statusCode= 200;
        res.setHeader('content-type','text/plain');
        res.end("Contact US");
    }
    //product
    else if(req.url == '/product'){
        
        const options = { // kisi site ko access karne ke liye host name (like www.google), path (like /search)
            hostname: 'fakestoreapi.com', 
            path: '/products/1',
            method:'GET'
        }
        const serverRequest = http.request(options,(apiRes)=>{
            apiRes.on("data",(data)=>{
                res.statusCode= 200;
                res.setHeader('content-type','application/json');
                // res.write(JSON.stringify(data.toString()));
                res.end(data.toString());
            })
        });
        serverRequest.on("error",()=>{
            console.log(e);
        });
        serverRequest.end();
    }
    //rest-> error
    else{
        res.statusCode= 500;
        res.setHeader('content-type','text/plain');
        res.end("Error");
    }
});
server.listen(PORT,()=>{console.log(`Server started at ${hostNAme}:${PORT}`);})