const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const express = require('express');
var opn = require('opn')

const host = 'localhost';
//const host = '192.168.1.242';
const port = '3000';

const config = require('./webpack.dev.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: host
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.use(express.static('./static'));

server.listen(port, host, () => {
    opn('http://' + host + ':' + port);
});