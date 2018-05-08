const path = require('path');

module.exports = {
  entry: './src/namespace.js.coffee',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'main.js'
  },

  resolve: {
    modules: ['./src'],
    extensions: ['.js.coffee']
  },

  module: {
    rules: [
      { test: /\.coffee$/, use: 'coffee-loader', exclude: /(node_modules|bower_components)/ },
    ]
  }
};
