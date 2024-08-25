const {transformSync} = require('@babel/core');
const uglifyPlugin = require('./uglifyPlugin');
const sourceCode = `
var age = 12;
console.log(age);
var name = 'zhufeng';
console.log(name)
`;
const {code} = transformSync(sourceCode,{
    filename:'./some.js',
    plugins:[uglifyPlugin()]
});
console.log(code);
