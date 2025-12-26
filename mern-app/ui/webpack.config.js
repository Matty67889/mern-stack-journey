/**
 * Configuration file for babel loader used for webpack bundling.
 * 
 * Webpack requires loaders to combine the steps of manually
 * compiling the app files and bundling them.
 */

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/App.jsx', // starting point where all dependencies can be determined
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public'),
  }, // output file path
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex pattern for files to compile
        use: 'babel-loader', // loader to use
      },
    ],
  },
};
