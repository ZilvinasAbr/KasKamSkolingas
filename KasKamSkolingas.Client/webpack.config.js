var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/../KasKamSkolingas.Server/wwwroot',
    publicPath: '/',
    filename: 'bundle.js'
  },
};