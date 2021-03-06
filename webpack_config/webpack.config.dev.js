const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Path = require('path');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
  },
  devServer: {
    inline: true,
    contentBase: 'src',
    port: '3001',
  },
  plugins: [
    // Extract imported CSS into own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        options: {
          configFile: Path.resolve(__dirname, "../src/tsconfig.app.json")
        },
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
    ],
  },
});