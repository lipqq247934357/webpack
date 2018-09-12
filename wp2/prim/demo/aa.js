let merge = require('webpack-merge');

let ext = {
    aa: {
        inject: true,
        // 增加模块名的注入
    },
    bb: {
        inject: true,
        // 增加模块名的注入
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency',
        chunks: ['manifest', 'vendor']
    }
}

let config = {
    channel1: {
        entry: './src/page/channel/channel1/main.js',
        title: '两只老虎',
        filename: 'channel1.html',
        template: 'sentry/index_touch.html'
    },
    login: {
        entry: './src/page/touch/user/login/main.js',
        title: '登录',
        filename: 'login.html',
        template: 'sentry/index_touch2.html'
    }
}

function getEntrys() {
    let entrys = {};
    for (item in config) {
        entrys[item] = config[item].entry;
    }
    return entrys;
}

function getDevHtml() {
    let entrys = {};
    for (item in config) {
        delete config[item].entry;
        entrys[item] = merge(config[item], ext.aa, {chunks: [item]})
    }
    return entrys;
}

function getProdHtml() {
    let entrys = {};
    for (item in config) {
        delete config[item].entry;
        entrys[item] = merge(config[item], ext.bb, {chunks: [item]})
    }
    return entrys;
}
