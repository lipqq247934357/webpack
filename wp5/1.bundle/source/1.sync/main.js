(() => {
  var modules = { // 模块 模块id是文件路径
    './src/title.js': (module,exports,require) => { // require是引用别的模块使用的
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
      exports:{}
    }

    modules[moduleId](module,module.exports,require); // 执行模块
    return module.exports;
  }
  
  // ./src/index.js 的代码
  (() => {
    let title =  require('./src/title.js.js.js');
    console.log(title);
  })();

})();