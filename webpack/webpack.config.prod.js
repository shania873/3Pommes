const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  module: {
    rules: [
     {
        test: /\.js$/,     
        use: [ {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
                ],
      },
      {
        test: /\.(png|jpg|gif|jpeg|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
             name:'[path][name].[ext]',

            }
          }
        ]
      },
      {
        test: /\.s?css/i,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});