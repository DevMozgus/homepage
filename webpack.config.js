const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.[contentHash].js",
    path: path.resolve(__dirname, "build")
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), 
      new TerserPlugin({
        extractComments: true,
        sourceMap: true, 
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        favicon: "./src/favicon/favicon.ico",
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      }),
    ]
  },
  plugins: [
  new MiniCssExtractPlugin({ filename: "[name].[contentHash].css"}),
  new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|otf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets',
              limit: 10 * 1024
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre'
      },

    ]
  },

}

