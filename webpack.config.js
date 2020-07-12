const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const RULES = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
    ],
  },
  {
    test: /\.jpeg$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 30000
        }
      }
    ]
  }
];

module.exports = [
  {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/pikachizer.js'),
    output: {
      filename: 'pikachizer.js',
      path: path.resolve(__dirname, 'docs'),
      libraryTarget: 'umd',
      library: 'Pikachizer'
    },
    module: { rules: RULES.slice(0, 1) },
    optimization: {
      minimize: true
    },
  },
  // docs
  {
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'index.js'
    },
    entry: path.resolve(__dirname, 'docs/source/index.js'),
    module: { rules: RULES },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Pikachizer',
        template: path.resolve(__dirname, 'docs/source/index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      })
    ]
  }
]
