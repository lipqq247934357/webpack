const path = require('path');
// const MyPlugin = require("./plugins/MyPlugin.js");
const ZipPlugin = require("./plugins/ZipPlugin.js");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  mode: 'production',
  plugins: [
    // new MyPlugin({
    //   name: 'my-plugin'
    // }),
    new ZipPlugin({
      filename: "offline"
    })
  ],
};