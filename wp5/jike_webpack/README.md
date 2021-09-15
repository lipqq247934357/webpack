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

2.加载css
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

3.加载图片
    npm install --save-dev file-loader

```js
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
```

4.加载字体
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
