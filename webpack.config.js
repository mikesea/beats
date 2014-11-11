module.exports = {
  entry: './js/app.js',
  output: {
    filename: './js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  }
};
