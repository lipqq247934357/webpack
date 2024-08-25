//webpack内部 是通过tapable实现的插件机制。
//events EventEmitter on emit
//jquery on trigger
//const {SyncHook} = require('tapable');
class SyncHook{
    taps=[]
    tap(name,cb){
        this.taps.push(cb);
    }
    call(){
        this.taps.forEach(cb=>cb());
    }
}
let hook  = new SyncHook();

//一般我会编写插件，在插件的apply方法里去订阅钩子
class SomePlugin{
    apply(){
        hook.tap('插件的名称',()=>{
            console.log('插件的名称');
        });
    }
}
const somePlugin = new SomePlugin();
somePlugin.apply();

//在webpack的工作流中，会去执行hook.call方法实现发布
hook.call();