require("dotenv/config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { object, string } = require("zod");
const { join } = require("path");

const { env } = process;
const { PORT } = object({ PORT: string() }).parse(env);
const srcPath = join(__dirname, "src");

module.exports = {
  devServer: {
    port: PORT,
    writeToDisk: true,
  },
  devtool: "source-map",
  entry: join(srcPath, "main.ts"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|json|m4a|mp3|ogg|png|)$/i,
        type: "asset/resource",
      },
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
    assetModuleFilename: "[name][ext]",
    globalObject: "this",
    path: join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: join(srcPath, "favicon.ico"),
      template: join(srcPath, "index.html"),
      title: "@wilsjs/client",
    }),
    new MiniCssExtractPlugin(),
    new WebpackManifestPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
