const {transformSync} = require('@babel/core');
const types = require('@babel/types');
const path = require('path');
const sourceCode = `
console.log("hello");
`;
const visitor = {
    CallExpression(nodePath,state){
        const {node} = nodePath;
        if(types.isMemberExpression(node.callee)){
            if(node.callee.object.name === 'console'){
                if(['log','warn','info','error','debug'].includes(node.callee.property.name)){
                    const {line,column} = node.loc.start;
                    const relativeFilename = path.relative(__dirname,state.file.opts.filename);
                    node.arguments.unshift(
                        types.stringLiteral(
                            `${relativeFilename} ${line} ${column}`
                        )
                    );
                }
            }
        }
    }
}

function logParamPlugin(){
    return {
        visitor
    }
}
const {code} = transformSync(sourceCode,{
    filename:'some.js',
    plugins:[logParamPlugin()]
});
console.log(code);
