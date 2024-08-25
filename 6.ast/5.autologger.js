const {transformSync} = require('@babel/core');
const types = require('@babel/types');
const path = require('path');
const autoLoggerPlugin = require('./autoLoggerPlugin');
const sourceCode = `
let _logger2 = 'xxx';
function sum(a,b){
    return a+b;
}
const multiply = function(a,b){
    return a*b;
}
const minis = (a,b)=>a-b;
class Math{
    divide(a,b){
        return a/b;
    }
}
`;
const {code} = transformSync(sourceCode,{
    filename:'some.js',
    plugins:[autoLoggerPlugin({
        fnNames:['sum'],
        libName:'logger',//把获取业务数据的逻辑写在logger里
        params:['a','b','c']
    })]
});
console.log(code);
