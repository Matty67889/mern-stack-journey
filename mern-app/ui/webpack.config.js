/**
 * Configuration file for babel loader used for webpack bundling.
 * 
 * Webpack requires loaders to combine the steps of manually
 * compiling the app files and bundling them.
 */

const path = require('path');

module.exports = {
  mode: 'development',
  entry: { app: './src/App.jsx' }, // starting point where all dependencies can be determined
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  }, // output file path
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex pattern for files to compile
        exclude: /node_modules/, // files to exclude
        use: 'babel-loader', // loader to use
      },
    ],
  },
  optimization: {
    splitChunks: { // for separating app and vendor module bundles
      name: 'vendor',
      chunks: 'all',
    },
  },
};
