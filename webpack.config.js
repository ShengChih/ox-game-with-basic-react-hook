const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: [/*MiniCssExtractPlugin.loader, */"style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [/*MiniCssExtractPlugin.loader, */"style-loader", 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: ["ts-loader", "react-docgen-typescript-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      Components: path.resolve(__dirname, 'src/components/')
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 8080,
    publicPath: "http://localhost:8080/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin()]
};