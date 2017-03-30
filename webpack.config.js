var path = require('path');

module.exports = {
  context: __dirname + "/app",
  entry: {
	  javascript: "./index.jsx",
	},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
