# readMe

## 安装

    mkdir webpack-demo && cd webpack-demo
    npm init -y
    npm install webpack webpack-cli --save-dev

## 起步

基本模块：

```js
const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    }
};
```

## 资源管理

1.加载js
npm i @babel/core @babel/preset-env babel-loader -D

增加.babelrc

```js
{
    "presets": ["@babel/preset-env"]
}
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
```

2.加载react
npm i react react-dom @babel/preset-react -D

增加.babelrc

```js
"presets": ["@babel/preset-env","@babel/babel-preset"]
{
    "presets": ["@babel/preset-env"]
}
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
```

1.加载css
    npm install --save-dev style-loader css-loader

```js
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
```

2.加载文件
    npm install --save-dev file-loader

```js
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
```

3.加载字体
    npm install --save-dev file-loader

```js
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
```

5.加载数据

## 管理输出

### 多入口，多出口

```js
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  mode: "development",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
```

### 单入口

```js
  entry: './src/index.js',
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
```

#### 使用html-webpack-plugin

npm install --save-dev html-webpack-plugin

```js
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management'
     })
   ],
```

### 清理上次打包内容

npm install clean-webpack-plugin --save-dev

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
new CleanWebpackPlugin(),
```

## 使用source map

```js
devtool: 'inline-source-map',
```

### 使用观察者模式

--watch 的原理是监听文件变更的时间，如果晚于记录的事件重新打包，更新时间；

 ```js
"watch": "webpack --watch",
```

### 使用webpack-dev-server(WDS)

webpack-dev-server是直接将内容放到内存中，不会去修改dist目录中的文件；
npm install --save-dev webpack-dev-server

```js
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true
  },
// 启动
"serve": "webpack serve"
```

### 使用webpack-dev-middleware(WDM)

```js
npm install --save-dev express webpack-dev-middleware
```

2.参考 server.js文件

## 文件hash
