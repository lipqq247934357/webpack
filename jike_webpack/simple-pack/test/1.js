const { getAST, getDependencis, transform } = require("../lib/parser.js");
const path = require('path');
const ast = getAST(path.join(__dirname, '../src/index.js'));
console.log('result ', ast);
const dependencies = getDependencis(ast);
console.log('require', dependencies);
const srouce = transform(ast);
console.log('transform', srouce);
