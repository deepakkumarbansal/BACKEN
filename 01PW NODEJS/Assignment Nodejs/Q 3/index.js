const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../Q 1 and 2/nodejs_architecture.txt');
console.log(filePath);
// fs.readFile(filePath,(err,data)=>{
//     if(err){
//         console.log(`Error ocuured: ${err}`);
//         return;
//     }
//     console.log(data.toString());
// })

let data = fs.readFileSync(filePath);
console.log(data.toString());