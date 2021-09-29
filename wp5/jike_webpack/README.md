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
    - [使用观察者模式](#使用观察者模式)
    - [使用webpack-dev-server(WDS)](#使用webpack-dev-serverwds)
    - [使用webpack-dev-middleware(WDM)](#使用webpack-dev-middlewarewdm)
  - [文件hash](#文件hash)
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

### 使用文件监听

### 使用观察者模式

--watch 原理是监听文件变更的时间，如果晚于记录的事件重新打包，更新时间；

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

2.参考 server.js文件

## 文件hash

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

  1.library:指定库的全局变量
  2.libraryTarget:支持库引入的方式
  可以参考拼音项目
