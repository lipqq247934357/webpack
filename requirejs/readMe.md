requirejs
===============
我的学习路径主要是[requirejs的官网](http://www.requirejs.cn/)。这次主要总结的是他的基本用法。

关于requirejs主要的总结是：
1.requirejs是用来就进行模块化开发的js库。
2.他的主要配置流程是：引入js文件，再通过data-main属性设置他的配置文件（如果不设置可以通过引入配置文件进行配置）。在配置文件中配置插件，同时设置baseUrl。
3.模块的定义：就是符合amd规范就可以，简而言之，就是define(id?,dependencies?,factory);[官方文档](https://github.com/amdjs/amdjs-api/blob/master/AMD.md);
4.在定义模块方面主要的类型是：1.简单的键值对，2.在返回对象之前，执行一些操作3.存在依赖的定义4.返回一个函数等等。
