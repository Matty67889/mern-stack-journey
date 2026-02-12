/**
 * Configuration file for babel loader used for webpack bundling.
 *
 * Webpack requires loaders to combine the steps of manually
 * compiling the app files and bundling them.
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
  mode: 'development',
  entry: { app: ['./browser/App.jsx'] }, // starting point where all
  // dependencies can be determined
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  }, // output file path
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex pattern for files to compile
        exclude: /node_modules/, // files to exclude
        use: {
          loader: 'babel-loader', // loader to use
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  edge: '144',
                  safari: '18.6',
                  firefox: '147',
                  chrome: '144',
                },
              }],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: { // for separating app and vendor module bundles
      name: 'vendor',
      chunks: 'all',
    },
  },
  devtool: 'source-map',
};

const serverConfig = {
  mode: 'development',
  entry: { server: ['./server/uiserver.js'] },
  target: 'node',
  externals: [nodeExternals()], // to exclude node_modules
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  }, // output file path
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex pattern for files to compile
        exclude: /node_modules/, // files to exclude
        use: {
          loader: 'babel-loader', // loader to use
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  node: '10',
                },
              }],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: { // for separating app and vendor module bundles
      name: 'vendor',
      chunks: 'all',
    },
  },
  devtool: 'source-map',
};

module.exports = [browserConfig, serverConfig];
