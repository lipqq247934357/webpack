const {transformSync} = require('@babel/core');
const types = require('@babel/types');
const path = require('path');
const tscPlugin = require('./tscPlugin');
const sourceCode = `
var age:number = "aaa";
`;
const {code} = transformSync(sourceCode,{
    parserOpts:{plugins:["typescript"]},
    filename:'./some.js',
    plugins:[tscPlugin()]
});
console.log(code);
