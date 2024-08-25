var modules = {

};
function require(moduleId) {
  var module = {
    exports: {}
  };
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
require.f={}
//各个状态下的代码块
var installedChunks = {
  main:0 //代码块名称为main的代码块已经加载完成
  //src_title_js:[resolve]
}
require.l = (url)=>{
  const script = document.createElement('script');
  script.src = url;//src_title_js.main.js
  document.head.appendChild(script);
}
require.p = '';
//返回此代码块chunk的文件名
require.u  = (chunkId)=>`${chunkId}.main.js`
require.f.j = (chunkId)=>{
  //当前已经安装好的代码块
  let installedChunkData = installedChunks[chunkId];
  if(installedChunkData === 0){
    return Promise.resolve();
  }
  let promise = new Promise((resolve)=>{
    installedChunkData = installedChunks[chunkId] = [resolve]
  });
  //获取异步代码块的路径 http://localhost:8080/src_titile_js.main.js
  const url = require.p + require.u(chunkId);
  require.l(url);
  return promise;
}
require.e = function(chunkId){
  let promise = require.f.j(chunkId);
  return promise
}
require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
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
function webpackJsonpCallback([chunkIds,moreModules]){
  const resolves = [];
  for(let i=0;i<chunkIds.length;i++){
    const chunkId = chunkIds[i];//src_title_js
    const resolve = installedChunks[chunkId][0]
    resolves.push(resolve);
    //到这里此代码块就已经加载成功了，可以把chunkId的值设置为0
    installedChunks[chunkId]=0;
  }
  for(const moduleId in moreModules){
    modules[moduleId]= moreModules[moduleId]
  }
  while(resolves.length){
    //取出所有的resolve方法，让它执行，让它对应的promise变成成功态
    resolves.shift()();
  }
}
window["someName"] = [];
window["someName"].webpackJsonpCallback = webpackJsonpCallback;
require.e("src_title_js").then(()=>{
  return require('./src/title.js');
}).then(exports=>{
  console.log(exports);
});

require.e("src_title_js").then(require.bind(require,'./src/title.js')).then(exports=>{
  console.log(exports);
});

//.then()

