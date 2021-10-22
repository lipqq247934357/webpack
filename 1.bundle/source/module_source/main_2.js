
/**
 * 1.使用对象的方式封装模块代码
 * 2.__webpack_module_cache__ 缓存所有的变量
 * 3.自己实现一个commonjs规范加载机制
 * 4.定义了一些公共方法
 *  4.1 .r define __esModule on exports
 *  4.2 .o object have property handshort
 *  4.3 .d 给module.exports对象增加属性，通过get方法，引用原来的对象，从而模拟es6 module逻辑
 * 5.执行入口模块
 * 6.根据对应的模块加载对应的代码
 * 
 * 7.其他公共方法
 *  .m export module object 就是模块源码
 *  .f 一个对象
 *  .f.j jsonp加载chunk
 *  .e loading function for other chunks
 *  .u return module name
 *  .g Window对象
 *  .l load script via script tag
 *  .p 当前请求的js 脚本url
 *  
 *  */
(() => {
  "use strict";
  var __webpack_modules__ = ({

    "./src/1.js":

      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
          "name": () => (/* binding */ name),
          "func": () => (/* binding */ func)
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

        /***/
      })

  });
  /************************************************************************/
  // 模块
  var __webpack_module_cache__ = {};

  // require函数
  function __webpack_require__(moduleId) {
    // 是否缓存了当前模块
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // 创建一个模块（把它放到模块对象上）
    var module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };

    // 执行模块代码
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // 返回module.exports
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = __webpack_modules__;

  /************************************************************************/
  /* webpack/runtime/define property getters */
  (() => {
    // 给module.exports的参数定义get方法
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();

  /* webpack/runtime/ensure chunk */
  (() => {
    __webpack_require__.f = {};
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    // Object.keys(__webpack_require__.f) 这个对象只有一个方法，就是 .f.j
    // 不知道这个代码的目的是什么，目前.f就一个参数.j
    __webpack_require__.e = (chunkId) => {
      return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
        __webpack_require__.f[key](chunkId, promises);
        return promises;
      }, []));
    };
  })();

  /* webpack/runtime/get javascript chunk filename */
  (() => {
    // This function allow to reference async chunks
    __webpack_require__.u = (chunkId) => {
      // return url for filenames based on template
      return "" + chunkId + ".js";
    };
  })();

  /* webpack/runtime/global */
  (() => {
    __webpack_require__.g = (function () {
      if (typeof globalThis === 'object')
       return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if (typeof window === 'object') return window;
      }
    })();
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  })();

  /* webpack/runtime/load script */
  (() => {
    var inProgress = {};
    var dataWebpackPrefix = "5.webpack:";
    // loadScript function to load a script via script tag
    __webpack_require__.l = (url, done, key, chunkId) => {
      // 如果这个url已经有了,就存放一个回调
      if (inProgress[url]) { inProgress[url].push(done); return; }
      var script, needAttach;
      // 获取script标签
      if (key !== undefined) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i];
          if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
        }
      }
      // 如果没有，创建一个script标签
      if (!script) {
        needAttach = true;
        script = document.createElement('script');

        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        script.setAttribute("data-webpack", dataWebpackPrefix + key);
        script.src = url;
      }
      inProgress[url] = [done];
      var onScriptComplete = (prev, event) => {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var doneFns = inProgress[url];
        delete inProgress[url];
        script.parentNode && script.parentNode.removeChild(script);
        doneFns && doneFns.forEach((fn) => (fn(event)));
        if (prev) return prev(event);
      }
        ;
      var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
      script.onerror = onScriptComplete.bind(null, script.onerror);
      script.onload = onScriptComplete.bind(null, script.onload);
      needAttach && document.head.appendChild(script);
    };
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();

  /* webpack/runtime/publicPath */
  // 获取请求js的地址
  (() => {
    var scriptUrl;
    if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
    var document = __webpack_require__.g.document;
    if (!scriptUrl && document) {
      if (document.currentScript)
        scriptUrl = document.currentScript.src
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName("script");
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
      }
    }
    // When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
    // or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
    if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
    scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
    __webpack_require__.p = scriptUrl;
  })();

  /* webpack/runtime/jsonp chunk loading */
  (() => {
    // no baseURI

    // object to store loaded and loading chunks
    // undefined = chunk not loaded, null = chunk preloaded/prefetched
    // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    var installedChunks = {
      "main": 0
    };

    // chunkId, []
    __webpack_require__.f.j = (chunkId, promises) => {
      // JSONP chunk loading for javascript
      var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
      if (installedChunkData !== 0) { // 0 means "already installed". 当前依赖还没有下载好

        // a Promise means "currently loading". 正在加载代码
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if (true) { // all chunks have JS
            // setup Promise in chunk cache 将promise存储到对象上
            var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
            promises.push(installedChunkData[2] = promise);

            // start chunk loading 拼接js url
            var url = __webpack_require__.p + __webpack_require__.u(chunkId);
            // create error before stack unwound to get useful stacktrace later
            var error = new Error();
            var loadingEnded = (event) => {
              if (__webpack_require__.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                  var realSrc = event && event.target && event.target.src;
                  error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                  error.name = 'ChunkLoadError';
                  error.type = errorType;
                  error.request = realSrc;
                  installedChunkData[1](error);
                }
              }
            };
            __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
          } else installedChunks[chunkId] = 0;
        }
      }
    };

    // no prefetching

    // no preloaded

    // no HMR

    // no HMR manifest

    // no on chunks loaded

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId, chunkId, i = 0;
      if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
        for (moduleId in moreModules) {
          if (__webpack_require__.o(moreModules, moduleId)) {
            __webpack_require__.m[moduleId] = moreModules[moduleId];
          }
        }
        if (runtime) var result = runtime(__webpack_require__);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
          // 执行resolve
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkIds[i]] = 0;
      }

    }

    // 被引入的包中执行push方法，执行，回调函数
    var chunkLoadingGlobal = self["webpackChunk_5_webpack"] = self["webpackChunk_5_webpack"] || [];
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
  })();

  /************************************************************************/
  // 入口模块的module.exports
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!**********************!*\
      !*** ./src/index.js ***!
      \**********************/
    __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./1.js */ "./src/1.js");

    (0, _1_js__WEBPACK_IMPORTED_MODULE_0__.func)();
    console.log(_1_js__WEBPACK_IMPORTED_MODULE_0__.name);
    setTimeout(() => {
      (0, _1_js__WEBPACK_IMPORTED_MODULE_0__.func)();
      let a = __webpack_require__.e(/*! import() */ "src_2_js").then(__webpack_require__.bind(__webpack_require__, /*! ./2.js */ "./src/2.js"));
      console.log(a, 'a');
    }, 1900);
  })();

})()
  ;