const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common,{
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'public')
    }
  }
});
