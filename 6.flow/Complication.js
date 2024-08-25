const path = require('path');
const fs = require('fs');
const types = require('babel-types');//生成和判断节点的工具库
const parser = require('@babel/parser');//把源代码转换AST的编译器
const traverse = require('@babel/traverse').default;//遍历语法树的工具
const generator = require('@babel/generator').default;//把转换后的语法树重新生成源代码的工具
function toUnixSeq(filePath){
    return filePath.replace(/\\/g,'/');
}
class Complication{
    constructor(options){
       this.options = options;
       this.options.context = this.options.context||toUnixSeq(process.cwd())
       this.fileDependencies = new Set();
       this.modules = [];//存放本次编译所有产生的模块
       this.chunks = [];//存放所有的代码块
       this.assets = {};//存放输出的文件，属性是文件名，值是文件的内容
    }
    build(onCompiled){
        //5.根据配置中的entry找出入口文件
        let entry = {};
        if(typeof this.options.entry === 'string'){
            entry.main = this.options.entry;
        }else{
            entry = this.options.entry;
        }
        for(let entryName in entry){
            //获取入口文件的绝对路径 
            let entryFilePath = path.posix.join(this.options.context,entry[entryName]);
            //把此文件添加到文件依赖列表中
            this.fileDependencies.add(entryFilePath);
            //从入口文件发出，开始编译模块
            let entryModule = this.buildModule(entryName,entryFilePath);
            //8.根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
            let chunk = {
                name:entryName,//入口的名称
                entryModule,//入口的模块 ./src/entry1.js
                modules:this.modules.filter(module=>module.names.includes(entryName))//此入口对应的模块
            }
            this.chunks.push(chunk);
        }
        //9.再把每个 Chunk 转换成一个单独的文件加入到输出列表
        this.chunks.forEach(chunk=>{
          let outputFilename = this.options.output.filename.replace('[name]',chunk.name);
          this.assets[outputFilename] = getSourceCode(chunk);
        });
        onCompiled(
            null,
            {
                modules:this.modules,
                chunks:this.chunks,
                assets:this.assets
            },
            this.fileDependencies
        );
    }
    /**
     * 
     * @param {*} name 入口的名称 main,entry1,entry2
     * @param {*} modulePath 入口模块的文件的绝对路径
     */
    buildModule(entryName,modulePath){
      //从入口文件出发,调用所有配置的Loader对模块进行转换
      let rawSourceCode = fs.readFileSync(modulePath,'utf8');  
      //获取loader的配置规则 
      let {rules} = this.options.module;
      //获取适用于此模块的loader
      let loaders = [];
      rules.forEach(rule=>{
        //用模块路径匹配正则表达式
        if(modulePath.match(rule.test)){
            loaders.push(...rule.use);
        }
      });
      let transformedSourceCode = loaders.reduceRight((sourceCode,loaderPath)=>{
        const loaderFn = require(loaderPath);
        return loaderFn(sourceCode)
      },rawSourceCode);
      //获取当前模块，也就是 ./src/entry1.js的模块ID
      let moduleId = './'+path.posix.relative(this.options.context,modulePath);
      let module = {id:moduleId,names:[entryName],dependencies:new Set()}
      this.modules.push(module);
      //经过loader转换，transformedSourceCode肯定是一个字符串了
      //7.再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
      let ast = parser.parse(transformedSourceCode,{sourceType:"module"});
      traverse(ast,{
        CallExpression:({node})=>{
            //如果调用的方法名是require的话，说明就要依赖一个其它模块
            if(node.callee.name === 'require'){
                // .代表当前的模块所有的目录，不是工作目录
                let depModuleName = node.arguments[0].value;// ./title
                //获取当前的模块所在的目录 C:\7.flow\src
                let dirName = path.posix.dirname(modulePath);
                // C:/7.flow/src/title
                let depModulePath = path.posix.join(dirName,depModuleName);
                let {extensions} = this.options.resolve;
                //尝试添加扩展名找到真正的模块路径
                depModulePath=tryExtensions(depModulePath,extensions);
                //把依赖的模块路径添加到文件依赖列表
                this.fileDependencies.add(depModulePath);
                //获取此模块的ID,也就相对于根目录的相对路径
                let depModuleId = "./"+path.posix.relative(this.options.context,depModulePath)
                //修改语法树，把引入模块路径改为模块的ID
                node.arguments[0]=types.stringLiteral(depModuleId)
                //node.arguments [ { type: 'StringLiteral', value: './src/title.js' } ]
                //给当前的entry1模块添加依赖信息
                module.dependencies.add({depModuleId,depModulePath});
            }
        }
      });
      const {code} = generator(ast);
      //转换源代码，把转换后的源码放在_source属性，用于后面写入文件
      module._source = code;
      [...module.dependencies].forEach(({depModuleId,depModulePath})=>{
        //判断此模块是否已经编译过了，如果编译过了，则不需要重复编译
        let existModule = this.modules.find(item=>item.id === depModuleId);
        if(existModule){//只需要把新的入口名称添回到模块的names数组里就可以
            existModule.names.push(entryName);
        }else{
            this.buildModule(entryName,depModulePath);
            //this.modules.push(depModule);
        }
      });
      return module;
    }
}

function tryExtensions(modulePath,extensions){
    //如果此绝对路径上的文件是真实存在的，直接返回
    if(fs.existsSync(modulePath)){
        return modulePath;
    }
    for(let i=0;i<extensions.length;i++){
        let filePath = modulePath+extensions[i];
        if(fs.existsSync(filePath)){
            return filePath;
        }
    }
    throw new Error(`模块${modulePath}未找到`);
}

function getSourceCode(chunk){
  return `
  (() => {
    var modules = {
      ${
        chunk.modules
        .filter(module=>module.id!==chunk.entryModule.id)
        .map(
            module=>`
            "${module.id}": module => {
               ${module._source}
              }
            `
        )
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
    var exports = {};
    (() => {
      ${chunk.entryModule._source}
    })();
  })();
  `;
}
module.exports = Complication;