const path = require('path');

// console.log(path.sep) /* /(forward slash) in macbook  and \(backward slash) in windows*/

// console.log(process.env.path); /* ";" in windows and ":" in mac and lunix OS */
// console.log(path.delimiter);

const CurrentFilePath = __filename;
// console.log(CurrentFilePath);

// console.log(__dirname);

let baseName = path.basename(CurrentFilePath)
// console.log(baseName);

let baseNameWithoutEx = path.basename(CurrentFilePath,"x.js")
// console.log(baseNameWithoutEx);

let dirName = path.dirname(CurrentFilePath);
// console.log(dirName);

// console.log(path.extname(CurrentFilePath));

let pathOfFile = path.format({
    dir: 'd:\VsTutorial',
    base: 'index.html'
});
// console.log(pathOfFile);

// console.log(path.isAbsolute(CurrentFilePath));
// console.log(path.isAbsolute("/index.js"));
// console.log(path.isAbsolute("./index.js"));
// console.log(path.isAbsolute("../index.js"));

let pathToDirectory = path.join('d:','\home',"deepak",'index.html');
// console.log(pathToDirectory);

// console.log(path.parse(CurrentFilePath));

// console.log(path.relative("home/local","home/local/deepak/bin"));
// console.log(path.relative('home/local/deepak/old',"home/local/deepak/node"));


// console.log(path.resolve());

let path1 = 'd:/local/deepak';
let path2 = 'bin/hello';

let absolutePath = path.resolve(path1,path2);
// console.log(absolutePath);



const filePath = 'd://deepak/user//amit/..//node//bin'
console.log(path.normalize(filePath));