import MiniCssExtractPlugin, { loader } from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration } from "webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import { join } from "path";
import { readFileSync } from "fs";

const srcPath = join(__dirname, "src");

const defaults: Configuration = {
  devtool: "source-map",
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

const config: Configuration = {
  ...defaults,
  entry: join(srcPath, "index.tsx"),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: join(__dirname, "tsconfig.build.json"),
        },
      },
      {
        test: /\.css$/,
        use: [{ loader }, "css-loader"],
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
    }),
    new FaviconsWebpackPlugin({
      logo: join(srcPath, "logo.jpg"),
    }),
    new ManifestPlugin({
      seed: readFileSync(join(srcPath, "manifest.json")),
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
};

export default config;
