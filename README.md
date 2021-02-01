# webpack
webpack

# 安装依赖：
    1.cnpm install webpack webpack-cli --save-dev  增加依赖
# 配置：
    2.在package.json中配置执行命令，可以执行命令
    3.使用rawLoader处理.txt文件
    4.使用html-webpack-plugin的插件
    5.mode 区分生产环境和开发环境
    6.devServer
# 二：资源管理
    1.css loader，less,sass loader
    'style-loader'，'css-loader'
    2.file-loader，url-loader
    3.babel


# 获取图片的方式
1.使用static目录
2.通过import使用
3.css 引入，css-loader来处理

# url-loader和file-loader的区别：
url是对file-loader的增强，如果文件大于指定的大小交给file-loader处理，
否则自己转换成base64

# babel-loader,babel-core,babel-preset-env
babel-loader 转换器，调用babel-core
babel-core 将源代码转化成新代码，但是只是提供过程管理,将es6,es5转化成AST语法树
babel-preset-env  将es6语法树转化成es5语法树

# 预设和插件的关系
预设包含多个插件

