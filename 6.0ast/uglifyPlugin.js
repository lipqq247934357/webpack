function uglifyPlugin(options){
    return {
       visitor:{
        //捕获所有的作用域的节点
        Scopable(path){
            //遍历作用域内所有的绑定，也就是变量
            Object.entries(path.scope.bindings).forEach(([key,binding])=>{
               const newName =  path.scope.generateUid('_');
               binding.path.scope.rename(key,newName);
            });
        }
       }
    }
}
module.exports = uglifyPlugin;