## 模块ID
    相对于根目录的相对路径
    index.js  ./src/index.js
    title.js  ./src/title.js
    jQuery    node_modules/jquery/dist/jquery.js

## 如果文件有import export是es module，需要进行处理

## 模块转换
    common+common 不需要处理
    common+es6 es6转化成common
    es6+es6  都转成common
    es6+common es6转成common

## 动态模块