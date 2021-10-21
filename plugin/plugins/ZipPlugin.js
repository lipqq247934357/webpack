const JSZip = require('jszip'); // https://github.com/Stuk/jszip
const path = require('path');
const RawSource = require('webpack-sources').RawSource;
const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        // 1. 注册事件
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            // 2.创建文件夹
            const folder = zip.folder(this.options.filename);

            // 3.写入文件
            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }

            // 4.生成文件
            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                // 5.保存到指定目录
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );

                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );
                // 6.设置资源
                compilation.assets[outputRelativePath] = new RawSource(content);
                // 7.完成
                callback();
            });
        });
    }
}