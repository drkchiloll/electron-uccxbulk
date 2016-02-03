const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'app/src'),
  build: path.join(__dirname, 'app/build')
};
const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET

module.exports = {
  // Entry accepts a path or an object of entries
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: PATHS.app
    }, {
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: PATHS.app
    }]
  }
};
