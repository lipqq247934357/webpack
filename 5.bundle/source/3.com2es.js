var modules = {
    './src/title.js': (module, exports) => {
        //1.声明或者说表示当前的模块原来是一个es module
        require.r(exports);
        require.d(exports,{
            default:()=>DEFAULT_EXPORTS,//值是一个getter
            age:()=>age
        });
        //默认导出
        const DEFAULT_EXPORTS='title_name'
        //命名导出
        const age = 'title_age'
    }
}

function require(moduleId) {
    var module = {
        exports: {}
    };
    modules[moduleId](module, module.exports, require);
    return module.exports;
}
require.d = (exports,definition)=>{
    for(var key in definition){
        Object.defineProperty(exports,key,{
            get:definition[key]//get:()=>DEFAULT_EXPORTS
        });
    }
}
require.r = (exports)=>{
 Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'})
 Object.defineProperty(exports,'__esModule',{value:true})
}

let title = require('./src/title.js');
console.log(title);
console.log(title.default);
console.log(title.age);