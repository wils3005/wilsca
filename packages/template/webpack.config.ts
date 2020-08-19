import DotenvWebpackPlugin from "dotenv-webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import path from "path";
import webpackNodeExternals from "webpack-node-externals";

const configFile = path.join(__dirname, "tsconfig.build.json");
const mode = "development";

const resolve = {
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
};

const client = {
  entry: path.join(__dirname, "src", "client", "index.ts"),
  mode,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { configFile },
      },
    ],
  },
  output: {
    filename: "client.js",
    path: path.join(__dirname, "build"),
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join("src", "index.html"),
      title: "client",
    }),
    new FaviconsWebpackPlugin(
      path.join(__dirname, "src", "heyyeyaaeyaaaeyaeyaa-large.jpg")
    ),
    new ManifestPlugin(),
  ],
  resolve,
};

const server = {
  entry: path.join(__dirname, "src", "server", "index.ts"),
  externals: [webpackNodeExternals()],
  mode,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { configFile },
      },
    ],
  },
  output: {
    filename: "server.js",
    path: path.join(__dirname, "build"),
  },
  resolve,
  target: "node",
};

export default [client, server];
