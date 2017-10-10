const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: './src/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'app.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,    
    compress: true,
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
}