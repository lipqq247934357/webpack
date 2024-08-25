
var modules = {
  "./src/title.js": module => {
    module.exports = {
      name: 'title_name',
      age: 'title_age'
    };
  }
};
var cache = {};
function require(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = cache[moduleId] = {
    exports: {}
  };
  modules[moduleId](module, module.exports, require);
  return module.exports;
}

require.n = module => {
  var getter = module && module.__esModule ? () => module['default'] : () => module;
  require.d(getter, {
    a: getter
  });
  return getter;
};


require.d = (exports, definition) => {
  for (var key in definition) {
    if (require.o(definition, key) && !require.o(exports, key)) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key]
      });
    }
  }
};


require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);


require.r = exports => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: 'Module'
    });
  }
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
};

var exports = {};
require.n = (exports) => {
  return exports.__esModule ? () => exports.default : () => exports;
}

require.r(exports);
var title = require("./src/title.js");
//传给n方法，返回一个函数
//如果原来title是es module,取default属性，如果原来title是common.js，那就取exports本身
var titleDefault = require.n(title);
//执行函数获取结果默认值
console.log(titleDefault());
//命名导出好办，直接到导出对象的age属性
console.log(title.age);