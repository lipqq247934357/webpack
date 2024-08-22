const webpack = require('webpack');
const options = require('./webpack.config');

/**
 * compiler就是一个编译器
 */

const compiler = webpack(options);

compiler.run((err, status) => {
    let result = status.toJson({
        entries: true, // 入口
        chunks: true, // 代码块
        module: true, // 模块
        assets: true, // 资产
        files: true // 文件
    });
    console.log('err', err);
    console.log('status', status);
});