<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [readMe](#readme)
  - [安装](#安装)
  - [起步](#起步)
  - [资源管理](#资源管理)
  - [管理输出](#管理输出)
    - [1.单入口](#1单入口)
    - [2.多入口，多出口](#2多入口多出口)
    - [使用html-webpack-plugin](#使用html-webpack-plugin)
    - [清理上次打包内容](#清理上次打包内容)
  - [使用source map](#使用source-map)
  - [使用文件监听](#使用文件监听)
    - [--watch](#--watch)
    - [使用webpack-dev-server(WDS)](#使用webpack-dev-serverwds)
    - [使用webpack-dev-middleware(WDM)](#使用webpack-dev-middlewarewdm)
    - [热更新原理](#热更新原理)
  - [代码分离](#代码分离)
  - [缓存&文件hash](#缓存文件hash)
  - [资源内联](#资源内联)
  - [多页面通用打包方案](#多页面通用打包方案)
  - [tree Shaking](#tree-shaking)
    - [DCE](#dce)
    - [tree Shaking原理](#tree-shaking原理)
  - [scope Hoisting](#scope-hoisting)
  - [dynamic import](#dynamic-import)
  - [支持 eslint](#支持-eslint)
    - [eslint+CI/CD](#eslintcicd)
  - [webpack打包组件和库](#webpack打包组件和库)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# readMe

## 安装

    mkdir webpack-demo && cd webpack-demo
    npm init -y
    npm install webpack webpack-cli --save-dev

## 起步

基本模块：

```js
const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    }
};
```

## 资源管理

1.加载js
npm i @babel/core @babel/preset-env babel-loader -D

增加.babelrc

```js
.babelrc >>
{
    "presets": ["@babel/preset-env"]
}
webpack.config.js  >>
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
```

2.加载react
npm i react react-dom @babel/preset-react -D

增加.babelrc

```js
.babelrc >>
"presets": ["@babel/preset-env","@babel/babel-preset"]
webpack.config.js  >>
{
    "presets": ["@babel/preset-env"]
}
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
```

1.加载css
    npm install --save-dev style-loader css-loader

```js
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
```

2.加载文件
    npm install --save-dev file-loader

```js
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
```

3.加载字体
    npm install --save-dev file-loader

```js
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
```

5.加载数据

## 管理输出

### 1.单入口

```js
  entry: './src/index.js',
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
```

### 2.多入口，多出口

```js
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  mode: "development",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
```

### 使用html-webpack-plugin

npm install --save-dev html-webpack-plugin

```js
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management'
     })
   ],
```

### 清理上次打包内容

npm install clean-webpack-plugin --save-dev

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
new CleanWebpackPlugin(),
```

webpack5:

```js
  output: {
    clean:true
  }
```

## 使用source map

不使用source map debugger只能看到转化之后的代码，看不到源码，调试体验及其不友好；

source-map关键字&含义:
  eval:使用eval包裹模块代码，使用sourceURL指定文件地址（指定的是源文件的内容，不产生sourcemap）
  source-map:产生.map文件
  cheap:不包含列信息
  inline:将.map作为DataURI嵌入，不单独生成.map文件
  module:包含loader的sourcemap,出错了，可以进一步定位到最原始的sourcemap

```js
devtool: 'inline-source-map',
```

## 使用文件监听

### --watch

原理是监听文件变更的时间，如果晚于记录的时间重新打包，更新时间；

 ```js
"watch": "webpack --watch",
```

### 使用webpack-dev-server(WDS)

webpack-dev-server是直接将内容放到内存中，不会去修改dist目录中的文件；
npm install --save-dev webpack-dev-server

```js
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true
  },
// 启动
"serve": "webpack serve"
```

### 使用webpack-dev-middleware(WDM)

```js
npm install --save-dev express webpack-dev-middleware
```

### 热更新原理

  1.webpack Compile: 将js编译成bundle
  2.HMR Server: 将热更新的文件输出给HMR Runtime
  3.Bundle Server: 提供文件在浏览器的访问
  4.HMR Runtime: 会被注入到浏览器，更新文件的变化
  5.bundle.js 打包输出的文件
  
2.参考 server.js文件

## 代码分离

  1.入口起点：使用 entry 配置手动地分离代码
  2.防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk
  3.动态导入：通过模块的内联函数调用来分离代码

## 缓存&文件hash

  1.hash:和整个项目的构建相关，只要有文件修改，hash值就会改变
  2.chunkHash:每个chunk上的内容发生变化，修改hash值
  3.contentHash:当前文件的内容发生变化，修改这个文件的hash值

## 资源内联

## 多页面通用打包方案

## tree Shaking

### DCE

  1.代码不会执行，不可到达
  2.代码执行的结果不会被用到
  3.代码只会影响死变量

### tree Shaking原理

    1.ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础；
    2.其他的模块,比如commonjs，amd等都是先加载，然后才导出模块；
    3.使用其他工具进行词法分析，然后去掉不用的代码；

## scope Hoisting

  将模块代码直接写入模块中，降低代码量和内存使用

## dynamic import

  commonjs: require.ensure
  es6: 动态import（需要babel支持）

## 支持 eslint

### eslint+CI/CD

  1.husky
  2.eslint-loader

## webpack打包组件和库

```js
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  clean: true,
  library: {
   name: 'PinYin',
   type: 'umd',
   export: 'default'
  }
 }
```
