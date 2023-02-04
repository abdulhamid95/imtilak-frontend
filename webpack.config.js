const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  devServer: {
    hot: false,
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9002,
    devMiddleware: {
        writeToDisk: true,
    }
    },
  module: {
    rules: [
        {
            test: require.resolve('jquery'),
            use: [
              {
                loader: "expose-loader",
                options: {
                  exposes: ["$", "jQuery"]
                }
              }
            ]
        },
        {
            test: /\.html$/,
            loader: "html-loader",
            options: {
                // minimize: true,
            }
        },
        {
            test: /\.(sa|sc|c)ss$/,
            exclude: /custom\.scss$/i,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                },
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
                filename: "./images/[name][ext]",
            },
        },
        {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            type: 'asset/resource',
            generator: {
                filename: "./fonts/[name][ext]",
            },
        },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
        filename: "css/style.css"
    }),
    new CssMinimizerWebpackPlugin({}),
  ],
};