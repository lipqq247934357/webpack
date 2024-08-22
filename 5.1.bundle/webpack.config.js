const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode: 'development', // 
    devtool: 'source-map', // 映射方式
    output: {
        path: path.resolve(__dirname, 'dist'), // __dirname 表示文件的绝对路径,一个全局变量
        filename: '[name].js', // 文件名增加hash hash,chunkHash,contentHash
    },
}
