const os = require ('os');
console.log("CPU Archirecture:",os.arch());
console.log("Free memory:",os.freemem());
console.log("total memory:",os.totalmem());
console.log("Network interface:",JSON.stringify(os.networkInterfaces()));
console.log("Os default tempary directroy:",os.tmpdir());
console.log("Endianess:",os.endianness());
console.log("Hostname:",os.hostname());
console.log("OS type:",os.type());
console.log("OS Patform:", os.platform());
console.log("OS release:",os.release());