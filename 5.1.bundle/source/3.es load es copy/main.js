(() => {
  var modules = { // 模块 模块id是文件路径
    "./src/index.js":  (module, exports, require) => {
      require.r(exports); // 声明为 es 模块
      let title = require('./src/title.js.js');
      console.log(title);
    },
    './src/title.js': (module, exports, require) => { // require是引用别的模块使用的
      // title的代码
      // 不管是common.js还是es modules最后都会编译成common.js 如果原来是es module的话用
      // r方法处理下，标识这个模块是es module
      require.r(exports);
      const DEFAULT_EXPORT = 'title_name';
      const age = 'title_age';
      require.d(exports, {
        default:() => DEFAULT_EXPORT,
        age: () => age
      });
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

  // ./src/index.js 的代码
  (() => {
    require('./src/index.js.js');
  })();

})();