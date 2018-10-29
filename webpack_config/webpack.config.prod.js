const Path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/library.bundle.js',
    chunkFilename: 'js/library.bundle.js',
    crossOriginLoading: false
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
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
  plugins: [
    new CleanWebpackPlugin(['build', 'documentaion'], { root: Path.resolve(__dirname, '..') }),
    // Extract imported CSS into own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/styles.min.css'
    }),
    new TypedocWebpackPlugin({
      out: Path.resolve(__dirname, '../documentaion'),
      name: 'JavaScript API',
      mode: 'file',
      target: 'es6',
      theme: 'default',
      includeDeclarations: false,
      ignoreCompilerErrors: true,
      excludePrivate: true
    },
      [Path.resolve(__dirname, '../src/app')])
  ],
});