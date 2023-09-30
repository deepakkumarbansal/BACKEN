const http = require('http');
const options = { // kisi site ko access karne ke liye host name (like " www.google.com"), path (like "/search") and method (like GET, POST, PUT, DELETE)
    hostname: 'fakestoreapi.com', 
    path: '/products/1',
    method:'GET'
}
const ServerReq = http.request(options,(res)=>{
    res.on("data",(data)=>{
        console.log(data.toString());
        console.log(JSON.stringify(data.toString()));
    })
})
ServerReq.on("error",()=>{
    console.log(e);
});
ServerReq.end();