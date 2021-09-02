const webpack = require('webpack');
const options = require('./webpack.config');

/**
 * compiler就是一个编译器
 */

const compiler = webpack(options);

compiler.run((err, status) => {
    console.log('err', err);
    console.log('status', status);
});