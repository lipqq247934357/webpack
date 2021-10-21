let path = require('path');
let fs = require('fs');
let { runLoaders } = require('loader-runner');

/**
 * 打包txt的loader
 * 
 */

const rawLoaderDemo = () => {
    runLoaders({
        resource: path.join(__dirname, './src/demo.txt'),
        loaders: [
            {
                loader: path.join(__dirname, './loaders/raw-loader.js'),
                options: {
                    name: 'test'
                }
            }
        ],
        context: {
            emitFile: () => { }
        },
        readResource: fs.readFile.bind(fs)
    }, (err, result) => {
        err ? console.log(err) : console.log(result);
    });
}

/**
 * 
 * 多个打包loader
 */
const demo2 = () => {
    /**
     * 1.读取要加载的资源
     * 2.把资源传递给loader链条，一一处理，最后得到结果
     */

    runLoaders({
        // 要加载和转换资源，可以包含查询字符串
        resource: path.resolve(__dirname, 'src', 'index.js'),
        // loader的绝对路径数组
        loaders: [
            path.resolve(__dirname, 'loaders', 'post-loader1.js'),
            path.resolve(__dirname, 'loaders', 'post-loader2.js'),
            path.resolve(__dirname, 'loaders', 'inline-loader1.js'),
            path.resolve(__dirname, 'loaders', 'inline-loader2.js'),
            path.resolve(__dirname, 'loaders', 'normal-loader1.js'),
            path.resolve(__dirname, 'loaders', 'normal-loader2.js'),
            path.resolve(__dirname, 'loaders', 'pre-loader1.js'),
            path.resolve(__dirname, 'loaders', 'pre-loader2.js'),
        ],
        // 额外的loader上下文 loader组件内部的this值
        context: { minimize: true },
        // 读取文件的方法
        readResource: fs.readFile.bind(fs)
    }, function (err, result) {
        console.log(result);
    })
}

rawLoaderDemo();

// demo2();