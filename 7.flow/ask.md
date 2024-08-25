

- compiler 代表整个webpack.

loader 把非js模块转成js模块
.less less-loader => css  css=>js 
 此过程会用到css AST
es6  ast es5   babel-loader功能


let options1 = {
    module:{
        rules:[
            rule1
        ]
    }
}
let options2 = {
    module:{
        rules:[
            rule2
        ]
    }
}

let options = {
    module:{
        rules:[
            rule1,
            rule2
        ]
    }
}


鱼饵
Compilation 就是负责某一次的编译 能这么理解吗
是的

刘佳欣
oncomplied的参数从哪里来的

为啥需要循环监控文件变化呢，不是发生变化后编译一次就好了吗？
1.js
2.js
3.js

1.js
2.js
3.js
4.js

Complication 这个文件的内容才算核心把



陈瑶
公共的文件提要怎么搞呀？
后面讲
SplitChunkPlugin

綠ぃ嗏
编译过程中 plugins 的执行顺序有个关系嘛？





除了require 应该有 import

红
多层 require 呢？
初心
entry1,entry2的dependencies为什么是空的 
JSON.stringify无法打印set内容
andy
模块和chunk有啥区别
模块是一个人
chunk是一家人
有同一个祖先的
祖先就是入口模块
黑子
这个没有
andy
编译时和运行时怎么理解
编译就是代码的转换
运行就是代码的执行
黑子
没有
刘佳欣
没有把  都是类 
鱼饵
看里面的hook吧
刘佳欣
里面有hook调用
Tony
同一个钩子有关系,不是的就没关系







鱼饵
fs.watch(fileDependency, () => this.compile(onCompiled)) 这行算热更新吗
不算

AZHENG
getsource的内容是不是暂时写的，其实应该单独处理？
后面讲源码会讲


黑子
不算热更新
小哈
那人家写的第三方plugin 怎么注册钩子进去的啊？
apply(compiler)
是不想给系统对象添加额外的钩子
compiler.hooks.newHook = new SyncHook()
黑子
plugin.apply 是一个函数,接受参数了就是钩子


刘佳欣
loader的执行时机应该是最开始的把？


鱼饵
会手写tapable这个库吗 会的
小哈
为啥都是run 和 done钩子啊？
侧耳倾听
都有那些钩子啊
红
试试 title.js 又去 require 其它文件



run 这个hook和loader执行时机呢
初心
loader在run后面执行吧
web
也不一定吧
