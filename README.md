# webpack

## simpleWebpack的实现

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

### module 里面的配置

解析的这些东西一般都被底层框架封装好了，可以看看资料，或者 chatGpt 问问，没有太多的复杂东西；
而且我配置内容学过了好多遍了，这些内容到时候再百度也是比较好的；
或者看官网文档或者看 github 包了解了解，不需要记忆，因为他会更新，而且记住也没啥用

1.解析 css，less， 2.解析 js，ts 3.图片处理 4.处理文件

### devServer

本地启动服务
不需赘述，面试也没人问，需要的时候看看别人的项目就会了；

### 导出模式（output）

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

### externals

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

### 给 webpack 传参

cross-env NODE-ENV=prod
在配置文件中读取这个值

### 对js增加babel-loader

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

### 配置sourceMap

  这块也懒得总结了，面试问的少，而且看看文档就知道；但是这块也是一个内容；

### 联邦模块

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

## 打包逻辑

### 我们打包出来的代码是怎么样的

  1.默认打包方式打包出来的代码是类似commonjs模块加载那样的方式
    通过output.libraryTarget打包成其他格式的，比如amd，es module等
  2.commonjs下的结构展示：
    2.1我们把所有的文件按照目录结构和内容组成一个`{目录结构：文件内容}`的对象；这样形成了前端的模块化代码；
    2.2然后有很多工具函数，用来处理对模块的加载，处理，返回值等的操作；

```js
(() => {
  "use strict";
  var __webpack_modules__ = ({
    "./src/1.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
          func: () => (func),
          name: () => (name)
        });
        let age = 28;
        let name = 'lipeng';
        function func() {
          console.log(age);
        }
        setTimeout(() => {
          age = 22;
          func = () => {
            console.log(age + 22);
          }
        }, 1000);
      })
  });
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();
  (() => {
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  })();
  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  var __webpack_exports__ = {};
  __webpack_require__.r(__webpack_exports__);
  var _1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/1.js");
  (0, _1_js__WEBPACK_IMPORTED_MODULE_0__.func)();
  console.log(_1_js__WEBPACK_IMPORTED_MODULE_0__.name);
  console.log('dd', dd);
})()
  ;
```

  有些具体的代码讲解了如何处理模块之间的交互
  在5.budle/source下有不同模块类型之间进行交互；

### 模块懒加载

  1.先设置一个promise回调
  2.然后将加载路径做我script标签的url写上，然后添加到head中
  3.等脚本加载完成，他执行某个回调，告诉promise他成功了，promise状态一变，后面就执行了；
  说明：
    代码分割：Webpack 识别 import() 语句并将对应的代码打包为独立的 chunk 文件。
    加载请求：当代码执行到 import() 语句时，Webpack runtime 调用 require.e() 触发 chunk 的加载。
    生成路径并插入脚本：Webpack runtime 生成 chunk 文件的路径，并创建 <script> 标签将其插入页面以启动异步加载。
    处理加载完成的 chunk：chunk 文件加载并执行后，将其中的模块注册到全局模块系统中，通知等待的 Promise 完成加载。
    执行异步模块：加载完成后，原始 import() 语句对应的模块会被执行，导出的内容可以被继续使用。
