(() => {
  var modules = {
    './src/title.js': (module, exports, require) => {
      require.r(exports);
      const DEFAULT_EXPORT = 'title_name';
      const age = 'title_age';
      require.d(exports, {
        default: () => DEFAULT_EXPORT,
        age: () => age
      });
    }
  }

  var cache = {};

  function require(moduleId) {

    if (cache[moduleId]) {
      return cache[moduleId].exports;
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

  // 给exports的模块key改成函数式调用，这样保存的值不变
  require.d = (exports, definition) => {
    for (let key in definition) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key]
      });
    }
  }

  // ./src/index.js 的代码
  (() => {
    let title = require('./src/title.js');
    console.log(title);
  })();

})();