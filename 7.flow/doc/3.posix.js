const path = require('path');
//a\b\c
//a/b/c
console.log(path.join('a','b','c'));
console.log(path.posix.join('a','b','c'));
console.log(path.win32.join('a','b','c'));