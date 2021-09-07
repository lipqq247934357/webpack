const core = require('@babel/core');

/**
 * source: 从上个loader或者源码
 * 
 */

function loader(source, inputSourceMap, data) {

    const options = {
        presets: ['@babel/preset-env'],
        inputSourceMap: inputSourceMap,
        sourceMaps: true, //sourceMaps: true 是告诉 babel 要生成 sourcemap
        filename: this.request.split("!")[1].split("/").pop(),
    }
    // code:代码 ,map：sourcemap ,ast：抽象语法树
    let { code, map, ast } = core.transform(source, options);
    return this.callback(null, code, map, ast);
}

module.exports = loader;