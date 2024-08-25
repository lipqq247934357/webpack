const path = require('path');
let pathA = 'c:/a/b/c';
let pathB = 'c:/a/b/c/d/f'
console.log("./"+path.relative(pathA,pathB));