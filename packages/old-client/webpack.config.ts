import { Configuration } from "webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join } from "path";
import { readFileSync } from "fs";
import webpackNodeExternals from "webpack-node-externals";

const srcPath = join(__dirname, "src");
const clientPath = join(srcPath, "client");
const serverPath = join(srcPath, "server");

const defaults: Configuration = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

const html = new HtmlWebpackPlugin({
  template: join(clientPath, "index.html"),
});

const favicons = new FaviconsWebpackPlugin({
  logo: join(clientPath, "logo.jpg"),
});

const manifest = new ManifestPlugin({
  seed: readFileSync(join(clientPath, "manifest.json")),
});

const miniCssExtract = new MiniCssExtractPlugin();

const clientConfig: Configuration = {
  ...defaults,
  entry: join(clientPath, "index.tsx"),
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
          configFile: join(clientPath, "tsconfig.json"),
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
    path: join(__dirname, "dist", "public"),
  },
  plugins: [html, favicons, manifest, miniCssExtract],
  target: "web",
};

const serverConfig: Configuration = {
  ...defaults,
  entry: join(serverPath, "index.ts"),
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: join(serverPath, "tsconfig.json"),
        },
      },
    ],
  },
  output: {
    globalObject: "this",
    path: join(__dirname, "dist"),
  },
  target: "node",
};

const config = [clientConfig, serverConfig];

export default config;
