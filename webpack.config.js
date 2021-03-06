const path = require('path');
const webpack = require('webpack');

const webpackBaseConfig = require('./webpack.base.config.js');
const packageJson = require('./package.json');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'source-map',
  output: Object.assign({}, webpackBaseConfig.output, {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
    sourceMapFilename: "[name].bundle.js.map",
    filename: '[name].bundle.js',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': { REPOSITORY_URL: JSON.stringify(packageJson.repository.url) },
    }),
    new webpack.DefinePlugin({
      'process.env': { APP_VERSION: JSON.stringify(packageJson.version) },
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,
      },
    }),
  ],
});
