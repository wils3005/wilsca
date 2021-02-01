// import { Configuration } from "webpack";
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { join } = require("path");

const srcPath = join(__dirname, "src");

const config = {
  devServer: {
    writeToDisk: true,
  },
  devtool: "source-map",
  entry: join(srcPath, "main.ts"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
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
    ],
  },
  output: {
    globalObject: "this",
    path: join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(srcPath, "index.html"),
      title: "@wilsjs/client",
    }),
    new FaviconsWebpackPlugin({
      logo: join(srcPath, "favicon.ico"),
      prefix: "assets/",
    }),
    new MiniCssExtractPlugin(),
    new WebpackManifestPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

module.exports = config;
