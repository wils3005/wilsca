import { Configuration } from "webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackManifestPlugin from "webpack-manifest-plugin";
import { join } from "path";
import { readFileSync } from "fs";

const srcPath = join(__dirname, "src");

const html = new HtmlWebpackPlugin({
  template: join(srcPath, "index.html"),
});

const favicons = new FaviconsWebpackPlugin({
  logo: join(srcPath, "logo.jpg"),
});

const manifest = new WebpackManifestPlugin({
  seed: readFileSync(join(srcPath, "manifest.json")),
});

const miniCssExtract = new MiniCssExtractPlugin();

const config: Configuration = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: join(srcPath, "index.tsx"),
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
          configFile: join(srcPath, "tsconfig.json"),
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
    path: join(__dirname, "build", "public"),
  },
  plugins: [html, favicons, manifest, miniCssExtract],
  target: "web",
};

export default config;
