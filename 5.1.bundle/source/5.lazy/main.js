(() => {
  var modules = { // 模块 模块id是文件路径
    './src/title.js': (module, exports, require) => { // require是引用别的模块使用的
      // title的代码
      module.exports = 'title';
    }
  }

  var cache = {};

  function require(moduleId) { // require函数

    if (cache[moduleId]) { // 先看缓存里有没有已经缓存的模块对象
      return cache[moduleId].exports; // 如果有就直接返回
    }

    // 默认空对象
    var module = cache[moduleId] = {
      exports: {}
    }

    modules[moduleId](module, module.exports, require); // 执行模块
    return module.exports;
  }

  // es module模块识别
  require.r = (exports) => {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    Object.defineProperty(exports, '__esModule', { value: true });
  }

  // 
  require.d = (exports, definition) => {
    for (let key in definition) {
      Object.defineProperty(exports, key, { 
        enumerable:true,
        get:definition[key]
       });
    }
  }


  // 如何异步加载额外的代码块
  require.e = (chunkId) => {
    let promises = [];
    require.f.j(chunkId,promises);
    return Promise.all(promises); // 所有promise都成功之后
  }

  require.p = ''; // p:publicPath 资源访问路径

  require.u = (chunkId) => { // 文件名字
    return chunkId + '.main.js';
  }
  let installedChunks = {
    main: 0,
  }

  require.f = {};

  // 异步加载
  require.f.j = (chunkId,promises) => {
    let promise = new Promise((resolve,reject) => {
      installedChunks[chunkId] = [resolve,reject];
    })
    promises.push(promise);
    var url = require.p + require.u(chunkId); // hello.main.js
    require.l(url);
  }

  require.l = url => {
    let script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
  }

  var webpackJsonpCallback = ([chunkIds,moreModules]) => { // 将moreModules合并到models里面
    const resolves = chunkIds.map(chunkId => installedChunks[chunkId][0]); // 获取所有的resolve
    for (let moduleId in moreModules) {
      modules[moduleId] = moreModules[moduleId];
    }
    resolves.forEach(resolve => resolve()); // promise resolve
  }

  var chunkLoadingGlobal = window['webpack5']=[]; // 通过全局变量
  chunkLoadingGlobal.push = webpackJsonpCallback;
  // 异步加载hello代码块，然后把hello代码块里的模块定义合并到主模块定义中去
  // 再去加载这个hello.js模块，拿到模块的导出结果
  (() => {
    require.e('hello').then(require.bind(require, './src/hello.js')).then(result => {
      console.log(result.default);
    });
  })();

})();