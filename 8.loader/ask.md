- loader
- tapable
- webpack源码
- webpack插件
- webpack优化
- HRM热更新



## 如何使用自定义的loader
- 使用绝对路径 `  loader:path.resolve('loaders','babel-loader.js'),`
- 配置resolveLoader.module
- 配置resolveLoader.alias



我只写一个名字,在Compiler里面也要找到文件绝对路径引进来,然后执行函数么?
肯定的 不管是模块也好，loader也好，最终都要找到硬盘上一个绝对路径进行加载
胡超
简介符
胡超
简洁符号
黑子
path.resolve(__dirname) 可以带替换path.resolve(loaders) 么?

path.resolve(__dirname)//模块所有的目录
path.resolve()//命令执行的目录


dirname是当前目录路径
__dirname当前的模块所在的目录。不管在哪里执行命令，它都是一样的

郭明
绝对路径和相对路径加载性能是一样的吗 还是说join好一点
肯定绝对路径性好。
相对
绝对性能最好
相对./也差不多，也很快能找到绝对路径
最差就是名字  lodash


21:09
杨澜
filename直接通过this就能拿到？
是的

黑子
this指向谁呀
loaderContext={}

小哈
为啥 this.resoursePath 能取到值啊？ 能debugger，执行的上下文

babel-loader只是提供一个转换函数，本身不知道要干啥
@babel/core来进行转换，core只能生成语法树，再把语法树转成代码，并不能转换代码
@babel/transform-arrow-functions插件是可以把箭头函数转成普通函数
语法太多，插件如果一个一个配太麻烦，所以把插个打包成presets.预设就是一个插件集合，插件包@babel/preset-env

为啥要区分Object.define和直接赋值的值呀
