/* eslint-disable prefer-regex-literals */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { ProvidePlugin } = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer,
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/templates/login.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'loginAdmin.html',
      template: path.resolve(__dirname, 'src/templates/loginAdmin.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'signUp.html',
      template: path.resolve(__dirname, 'src/templates/signUp.html'),
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
};
