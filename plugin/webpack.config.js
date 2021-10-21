const path = require('path');
const MyPlugin = require("./plugins/MyPlugin.js");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  plugins: [
    new MyPlugin({
      name: 'my-plugin'
    })
  ],
};