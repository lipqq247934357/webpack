const types = require('@babel/types');
const pathLib = require('path');
const importModuleHelper = require('@babel/helper-module-imports');
const template = require('@babel/template');

function autoLoggerPlugin(options){
    return {
        visitor:{
            Program:{
                //state 可以在遍历过程保存和传递状态
                enter(path,state){
                    let loggerId;
                    path.traverse({
                        ImportDeclaration(path){
                            debugger
                            //获取导入库的名称
                            //const libName = path.node.source.value;
                            //jquery.find 在path的下层属性中寻找属性名为source的路径path,
                            const libName = path.get('source').node.value;
                            //如果此导入语句导入的第三方模块和配置的日志第三方库名称一样
                            if(options.libName === libName){
                                const specifierPath = path.get('specifiers.0');
                                if(specifierPath.isImportDefaultSpecifier()
                                || specifierPath.isImportSpecifier()
                                ||specifierPath.isImportNamespaceSpecifier()){
                                    loggerId=specifierPath.node.local;
                                }
                                path.stop();//停止遍历查找
                            }
                        }
                    });
                    //如果遍历完Program，loggerId还是空的，那说明在源码中尚未导入logger模块
                    if(!loggerId){
                        //向Program这个节点添加一个默认导入子节点 import logger2 from 'logger'
                        //state.file.opts.filename是你正处理的或者说正在转换的文件绝对路径
                        //你想导入的绝对路径
                        const libName = pathLib.relative(state.file.opts.filename,options.libName).replace(/\\/g,'/');
                        loggerId = importModuleHelper.addDefault(path,libName,{
                            //在Program作用域内生成一个不会与当前作用域内变量重复的变量名
                            nameHint:path.scope.generateUid('logger')//logger=>_logger=>_logger2=>_logger3
                        });
                    }
                    // a.b.c.d()().f.g();
                    //使用template模块生成一个ast语法树节点,把一个字符串变成节点
                    state.loggerNode = template.statement(`LOGGER_PLACE(${options.params.join(',')});`)({
                        LOGGER_PLACE:loggerId.name
                    })
                    //state.loggerNode=template.statement(`a.b.c.d()().f.g();`)()
                    //state.loggerNode = types.expressionStatement(types.callExpression(loggerId,[]));
                }
            },
            "FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod"(path,state){
                const {node} = path;
                let fnName;
                if(node.type === 'FunctionDeclaration'){
                    fnName=node.id.name;
                }
                if(options.fnNames.includes(fnName)){
                    if(types.isBlockStatement(node.body)){
                        node.body.body.unshift(state.loggerNode);
                    }else {
                        const newNode = types.blockStatement([
                            state.loggerNode,
                            types.returnStatement(node.body)
                        ]);
                        path.get('body').replaceWith(newNode);
                    }
                }
            }
        }
    }
}
module.exports = autoLoggerPlugin;