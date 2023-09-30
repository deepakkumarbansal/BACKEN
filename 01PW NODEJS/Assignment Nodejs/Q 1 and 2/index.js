let fs = require('fs');
const nodejsArchitechtureInfo = `Node.js is built on the V8 JavaScript engine, which is an open-source JavaScript engine developed by Google. It uses an event-driven, non-blocking I/O model that makes it efficient and lightweight. Node.js uses a single-threaded event loop to handle asynchronous operations, allowing it to handle a large number of concurrent connections.

Node.js also includes a built-in module system, which allows you to create reusable modules for your applications. This modular architecture makes it easy to organize your code and manage dependencies.`
fs.writeFileSync('nodejs_architecture.txt',nodejsArchitechtureInfo, 'utf-8');