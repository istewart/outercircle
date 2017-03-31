var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: {
	  javascript: './js/index.jsx',
	},
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'feed.html',
    inject: 'body',
    title:  'OuterCircle',
    template: path.join(__dirname, '/app/html/feed.html'),
  })]
};
