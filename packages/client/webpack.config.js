// import { Configuration } from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { join } = require("path");

const srcPath = join(__dirname, "src");

const config = {
  devtool: "source-map",
  entry: join(srcPath, "main.ts"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: join(__dirname, "tsconfig.build.json"),
        },
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
    ],
  },
  output: {
    globalObject: "this",
    path: join(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      title: "@wilsjs/client",
    }),
    new WebpackManifestPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

module.exports = config;
