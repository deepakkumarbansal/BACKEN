const fs = require('fs');
const path = require('path');
let filePath = path.join(__dirname,"../Q 1 and 2/nodejs_architecture.txt");

fs.unlink(filePath,(err)=>{
    if(err){
        console.log("Error");
        return;
    }
    console.log("Deleted nodejs_architecture.txt");
})