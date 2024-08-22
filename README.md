# webpack

## webpack 执行流程图

[流程图]<https://www.processon.com/diagraming/616ce0a01e085306d7445e68>

## 基本使用

1.安装，搭建，webpack.config.js 基本使用 2.现在直接安装的需求少了，面试也不问，直接一搜都有方案，官方也有 demo 3.安装好之后执行命令，主要是执行 webpack-cli 的一堆操作，然后最终调 webpack 这个包；
具体细节我记不清了，这个大概逻辑没毛病； 4.其他的配置：

```js
  module.exports = {
    entry: '', // 入口
    mode: '', // 模式
    devtool: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
      rules: []
    },
    plugin: {
      new HtmlWebpackPlugin({
        template: './src/entry.html',
        filename: 'entry.html'
      })
    },
    devServer: {

    }
  }
```

## module 里面的配置

解析的这些东西一般都被底层框架封装好了，可以看看资料，或者 chatGpt 问问，没有太多的复杂东西；
而且我配置内容学过了好多遍了，这些内容到时候再百度也是比较好的；
或者看官网文档或者看 github 包了解了解，不需要记忆，因为他会更新，而且记住也没啥用

1.解析 css，less， 2.解析 js，ts 3.图片处理 4.处理文件

## devServer

本地启动服务
不需赘述，面试也没人问，需要的时候看看别人的项目就会了；

## 导出模式（output）

```js
module.exports2 = [
  merge(baseConfig, {
    output: {
      filename: "[name]-window.js",
      libraryTarget: "window",
    },
  }),
  merge(baseConfig, {
    output: {
      filename: "[name]-commonjs.js",
      libraryTarget: "commonjs2",
    },
  }),
  merge(baseConfig, {
    output: {
      filename: "[name]-umd.js",
      libraryTarget: "umd",
    },
  }),
  merge(baseConfig, {
    output: {
      filename: "[name]-amd.js",
      libraryTarget: "amd",
    },
  }),
];
```

1.commonjs2 模式： 导出为一个 commonjs2 模块，在 node 下也可用
2.umd：umd 在浏览器和 node 下都可用
3.amd：amd 模块
4.window：导出为一个 window 下的全局变量

## externals

这个可以 chatGpt 一下，意思是这个模块不应该被打包到输出的模块里；会通过 cdn 等其他方式引入；
比如：我的 react 项目组件库，不用打包 react 这个库，因为我的组件被使用的地方他们肯定会引入组件库；

```js
externals: [
  jquery: {
    commonjs: 'jquery',
    amd: 'jquery',
    root: '$',
    amd: 'jquery'
  }
];
```

## 给 webpack 传参

cross-env NODE-ENV=prod
在配置文件中读取这个值

## 对js增加babel-loader

```js
{
  test:/\.js$/,
  use:[
    {
      loader:'babel-loader',
      options:{
        targets:{
          "browsers":[">0.1%"]
        },
        presets:[
          ["@babel/preset-env",{
              useBuiltIns:false,//如果开发的是类库，不要使用污染全局环境的polyfill
          }]
        ],
        plugins:[
          [
            "@babel/plugin-transform-runtime",
            {
              corejs:3,//使用此插件提供的polyfill,此插件不会污染全局环境
              helpers:true,//使用此插件,复用帮助 方法，减少文件体积
              regenerator:false
            }
          ]
        ]
      }
    }
  ]
}
```

  这块主要是熟悉具体内容，具体使用需要看视频或者看文档，或者chatGpt问问

## 配置sourceMap

  这块也懒得总结了，面试问的少，而且看看文档就知道；但是这块也是一个内容；

## 联邦模块

```js
new ModuleFederationPlugin({
  filename:'hostRemoteEntry.js',//远程的文件名
  name:'hostYYY',//远程的名称  
  exposes:{//要向外暴露哪些组件
      './Sliders':'./src/Sliders', // remote/Sliders
  },
  remotes:{
      remoteZZZ:'remoteKKK@http://localhost:3000/remoteRemoteEntry.js'
  },
    shared:{
      react: {
          singleton: true,
          eager: false,
          requiredVersion: "18.2.0",
        },
      'react-dom': {
          singleton: true,
          eager: false,
          requiredVersion: "18.2.0",
        }
  }
}) 
```

  主要是可以提供一个模块作为另一个项目组件：
    [配置细节](http://www.zhufengpeixun.com/front/html/1.5.webpack.mf.html)

  在搭建业务组件库感觉特别方便；组件库也方便，可以单独引入；

  在联邦模块的基本使用章节有； /Users/lipeng/资料/视频/webpack核心课/8.模块联邦的基本使用.mp4

  shared允许多个应用之间共享依赖，减少冗余；

  他指向的是一个服务的路径，不是一个npm包或者其他的包之类的；

##
