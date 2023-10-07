const path = require('path');

module.exports = {
  target: 'browserslist', 
  entry: './src', 
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
},
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }]
},
  output: {
    filename: 'susX.min.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  // Additional configuration goes here
};