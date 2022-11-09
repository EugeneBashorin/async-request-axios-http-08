const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
        library: "[name]"
        //filename: '[name].bundle.js',
      },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: false,
        hot: true,
        port: 8080,
    },
    
    plugins: [
        new HtmlWebpackPlugin({
        title: 'index.html',
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html', // output file     
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
      ],
      module: {
        rules: [
        //Java-Script
           {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
        //Images
        {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: 'asset/resource',
        },
        //fonts ang SVGs
        {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
        },
          // CSS, PostCSS, and Sass
          {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        ],
    },
  }