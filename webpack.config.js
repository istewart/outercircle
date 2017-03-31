var path = require('path');

module.exports = {
  context: __dirname + "/app",
  entry: {
	  javascript: "./js/index.jsx",
    html: "./html/feed.html"
	},
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.html$/, loader: "file-loader?name=[name].[ext]"},
    ]
  }
};
