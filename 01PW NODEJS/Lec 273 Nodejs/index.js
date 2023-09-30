const { log } = require('console');
const http = require('http');
let PORT = 3000;
let hostname = 'localhost';
const server = http.createServer((req,res)=>{
    res.statusCode = 200; //200 means request is fullfilled. Code sent from server in response 
    res.setHeader('Content-type','text/plain')
    res.end("Node js server created by Deepak Bansal")
    
    // res.setHeader('Content-type','text/html')
    // res.end('<h1>Hello Guys</h1>')
    
    // res.statusCode = 500; // internal server error
    // res.setHeader('content-Type','application/json');
    // res.end(JSON.stringify({error : "server error"})) 
    /*we use JSON serialization format because Data is always passed 
    from a server to a client in serialized form, typically as a string.Serialization is 
    the process of converting complex data structures, such as objects or data records, 
    into a format that can be easily stored, transmitted, or reconstructed.
    When data is serialized, it is typically converted into a string format so that it 
    can be easily transmitted or stored.
    */
});
server.listen(PORT,()=>{
    console.log(`sever running at ${hostname}:${PORT}`);
})