const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: [
    './src/app/index.ts'
  ],
  plugins: [
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../src/assets'), to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    })
  ],
  resolve: {
    modules: [Path.resolve('./node_modules'), Path.resolve('./src')],
    extensions: ['.tsx', '.ts', '.js']
  }
};