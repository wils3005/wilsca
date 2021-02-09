import * as Zod from "zod";
import Path from "path";

// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const { env } = process;
const { PORT } = Zod.object({ PORT: Zod.string() }).parse(env);

const config = {
  devServer: {
    port: PORT,
    writeToDisk: true,
  },
  devtool: "source-map",
  entry: Path.join(__dirname, "src", "index.ts"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|json|m4a|mp3|ogg|png|)$/i,
        type: "asset/resource",
      },
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: Path.join(__dirname, "tsconfig.build.json"),
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
    path: Path.join(__dirname, "public", "js"),
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   favicon: join(srcPath, "favicon.ico"),
    //   template: join(srcPath, "index.html"),
    //   title: "@wilsjs/client",
    // }),
    // new MiniCssExtractPlugin(),
    // new WebpackManifestPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default config;
