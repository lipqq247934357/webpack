const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const express = require('express');
var opn = require('opn')

//mock数据
var appData = require('../mock/vip.json');
var apiRoutes = express.Router();
apiRoutes.get('/vipInfo', function (req, res) {
    res.json({
        errno: 0,
        seller: appData
    });
});
//const host = 'localhost';
const host = '192.168.1.242';
const port = '3000';

const config = require('./webpack.dev.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: host,
    proxy: {
        "/api": {
            target: "http://jxb.test.twotiger.net:248/",
            pathRewrite: {"^/api" : ""},
            changeOrigin: true
        }
    }
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.use(express.static('./static'));
server.use("/mock",apiRoutes);

server.listen(port, host, () => {
    opn('http://' + host + ':' + port);
});