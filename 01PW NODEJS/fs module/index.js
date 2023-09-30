const fs = require('fs');

// Asyschronous way to read file

// console.log("Read start");
// fs.readFile('input.txt',function(err,data){
//     if(err){
//         console.log("Error",err);
//         return;
//     }
//     console.log("data:",data.toString());
//     console.log("Read end");
// });
// console.log("other stuff");



// Synchronous way to read file
// console.log("Start file");
// let data = fs.readFileSync('input.txt');
// console.log(data.toString());
// console.log("File end");
// console.log("Other stuff");


// using low level api's
// const buf = new Buffer(1024);
// fs.open("input.txt",'r+',(err,fd)=>{
//     if (err) {
//         console.log("Error occured in opening file", err);
//         return;
//     }
//     console.log("File successfully opened");
//     fs.read(fd,buf,0,buf.length,0,function(er,bytes){
//         if (er) {
//             console.log("Error in reading file");
//             return;
//         }
//         console.log("Data:", bytes);
//         console.log("Data:",buf.slice(0,bytes).toString());
//     })
//     fs.close(fd,(err)=>{
//         if(err){
//             console.log("Error in closing file");
//         }
//         else{
//             console.log("Succes in closing file");
//         }
//     })
// })

//writting
// fs.writeFile('input.txt',"Hello my name is deepak",(err)=>{
//     if(err){
//         console.log("Error occured");
//     }
//     console.log("Writing to file is successfull");
// })


// appending
// fs.appendFile('input.txt'," --Deepak Bansal",'utf-8',(err)=>{
//     if(err){
//         console.log("Error Occured", err);
//         return;
//     }
//     console.log("appending Successfully");
// })


//deleting
fs.unlink("input.txt",(err)=>{
    if(err){
        console.log("Error in deleting file");
        return
    }
    console.log("Deleting file successfully");
})