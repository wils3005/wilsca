import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration } from "webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import { join } from "path";
import { readFileSync } from "fs";
import webpackNodeExternals from "webpack-node-externals";

const srcPath = join(__dirname, "src");
const clientPath = join(srcPath, "client");

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

const clean = new CleanWebpackPlugin({
  verbose: true,
});

const clientConfig: Configuration = {
  ...defaults,
  devtool: "inline-source-map",
  entry: join(clientPath, "index.tsx"),
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
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  output: {
    filename: "client.js",
    globalObject: "this",
    path: join(__dirname, "dist"),
  },
  plugins: [html, favicons, manifest, clean],
  target: "web",
};

const serverConfig: Configuration = {
  ...defaults,
  devtool: "source-map",
  entry: join(srcPath, "index.ts"),
  externals: [
    webpackNodeExternals({
      additionalModuleDirs: [join(__dirname, "..", "..", "node_modules")],
    }),
  ],
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
    ],
  },
  output: {
    filename: "server.js",
    globalObject: "this",
    path: join(__dirname, "dist"),
  },
  plugins: [html, favicons, manifest, clean],
  target: "node",
};

const config = [clientConfig, serverConfig];

export default config;
