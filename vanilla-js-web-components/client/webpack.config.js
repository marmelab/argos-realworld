const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './app/index.js',
  plugins: [
    new webpack.EnvironmentPlugin(['REACT_APP_API_ROOT']),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ],
  devServer: {
    hot: true,
    contentBase: './',
    historyApiFallback: true
  }
};
