var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'eval',
    entry: ['babel-polyfill',path.join(__dirname, './src/index.js')],

    output: {
      path: path.join(__dirname, '/client/dist/js'),
      filename: 'app.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders:[{
          test: /\.js$/,
          loaders: ['react-hot-loader', 'babel-loader'],
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader?sourceMap',
        },
        {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
      }
    ]
  }
}
