const { merge } = require('webpack-merge');
const base = require('./webpack.base');

// 不能使用覆盖操作符进行处理，因为有很多内容需要特殊处理，有些不是覆盖，是合并

module.exports = merge(base, {
    mode: 'production'
});