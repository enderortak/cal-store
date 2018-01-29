const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

// const audioPath = path.join(__dirname, "./src/assets/audio/");

module.exports = {
  entry: {
    app: [
      "react-hot-loader/patch",
      "./src/js/index.js",
    ],
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin("style.css"),
    new CopyWebpackPlugin([{ from: "assets/scientific-papers", to: path.resolve(__dirname, "dist/assets/scientificPapers") }]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "index.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9001,
    hot: true,
    historyApiFallback: true, // fixes react router subpage hmr problem
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract(["css-loader", "sass-loader"]),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
};
