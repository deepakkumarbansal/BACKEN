const fs = require('fs');
const path = require('path');
let buf = new Buffer(1024);
let pathFile = path.join(__dirname,'../Q 1 and 2/nodejs_architecture.txt');
let dataToBeAppend = 'Its asynchronous model and non-blocking operation improve scalability and erformance of web-application. Node.js  can easily handel multiple client requests witout requering multiple threads, cussuming less memory and resources.'
// fs.appendFile(pathFile,dataToBeAppend,(err)=>{
//     if(err){
//         console.log(`Error Occured: ${err}`);
//         return;
//     }
//     console.log("Data appended");
// })
fs.appendFileSync(pathFile,dataToBeAppend);
// fs.open(pathFile,'r+',(err,fd)=>{
//     if(err){
//         console.log("Error:",err);
//         return;
//     }
//     console.log("File opened");
//     fs.read(fd,buf,0,buf.length,null,(err,bytes,buf)=>{
//         if(err){
//             console.log("Error");
//             return;
//         }
//         console.log(buf.toString());
//     })
//     fs.close(fd,(err)=>{
//         if(err){
//             console.log("error occured");
//         }
//         else{
//             console.log("File successfully closed");
//         }
//     })
// })
let data = fs.readFileSync(pathFile);
console.log(data.toString());