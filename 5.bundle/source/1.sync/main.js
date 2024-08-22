(() => {
  /**
   * 模块：
   *  key是文件路径
   *  value是一个函数
   *    参数：
   *      1.module 模块对象
   *      2.exports module.exports对象
   *      3.require 加载模块的函数
   */
  var modules = {
    './src/title.js': (module,exports,require) => {
      // title的代码
        module.exports = 'title';
    }
  }

  // 存储所有的模块，模拟commonjs的单例模式
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
  
  // ./src/index.js 的代码 立即执行函数
  (() => {
    let title =  require('./src/title.js');
    console.log(title);
  })();

})();