var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
      loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
             plugins: [ "transform-es2015-destructuring", "babel-plugin-transform-decorators-legacy", "syntax-object-rest-spread"],
             presets: ['es2015', 'stage-0', 'react'],
            }
        }
      ]
    }
};
