# RECORD

## 1.[flow](http://www.zhufengpeixun.com/strong/html/109.1.webpack_usage.html#t234.%20webpack%E7%9A%84%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88?)

    初始化参数
    开始编译
    编译模块
    完成编译
    输出资源
    写入文件

## 调试 webpack

    logwebpack结果

## loader

    一个函数

## sourcemap

[devtool](https://webpack.docschina.org/configuration/devtool/): type | false

test，beta环境：
    1.使用 [SourceMapDevToolPlugin](https://webpack.docschina.org/plugins/source-map-dev-tool-plugin/) 可以细粒度配置sourcemap支持按需支持sourcemap
    2.devtool和SourceMapDevToolPlugin不能同时使用
    2.将sourcemap放到本地，然后本地启动一个服务，将sourcemap地址配置成本地地址就支持了远程sourcemap
生产环境：
    1.使用SourceMapDevToolPlugin将map文件打包到本地服务器中
    2.然后使用代理工具，将map文件代理到本地，从而对线上进行sourcemap

```js 
    new webpack.SourceMapDevToolPlugin({
        append: '\n//# sourceMappingURL=http://127.0.0.1:5501/dist/[url]',
        filename: '[file].map'
    })
```