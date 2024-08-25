
const path = require('path');
function toUnixSeq(filePath){
    return filePath.replace(/\\/g,'/');
}
let p = `C:/aproject/zhufengwebpack20230305/7.flow/doc/title.js`;
let cwd = toUnixSeq(process.cwd());
console.log(p);
console.log(cwd);
console.log("."+p.slice(cwd.length));
console.log("./"+path.posix.relative(cwd,p));
