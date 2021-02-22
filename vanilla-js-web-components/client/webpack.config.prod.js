const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: ['whatwg-fetch', './app/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['REACT_APP_API_ROOT']),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "images", to: "images" },
      ],
    }),
    new webpack.IgnorePlugin(/vertx/)
  ]
};
