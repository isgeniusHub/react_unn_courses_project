const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
    },
    module: {
       rules: [
           {
               //test:/\.(sc|c)ss$/,
               test: /\.css$/,
               use: [
                   {
                       loader: MiniCssExtractPlugin.loader,
                       options: {
                           publicPath: '../',
                           hmr: process.env.NODE_ENV === 'development',
                       },
                   },
                   'css-loader',
                   //'sass-loader',
                  // 'postcss-loader',
               ],
           },
           {
               test: /\.(png|jpe?g|gif|svg)$/,
               use: [
                   {
                       loader: 'file-loader',
                       options: {
                           outputPath: 'images',
                           name: '[name].[ext]',
                       }
                   }
               ]
           },
           {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               query: {
                   presets: [
                       '@babel/preset-env',
                       '@babel/preset-react'
                   ]
               }
           }
       ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist')
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            favicon: "./src/img/favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new BrowserSyncWebpackPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./dist']},
        }),
    ],
    resolve: {
        //extensions: ['.js', '.jsx', '.scss']
        extensions: ['.js', '.jsx', '.css']
    }
};
