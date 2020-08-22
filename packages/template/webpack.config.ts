import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import path from "path";
import webpackNodeExternals from "webpack-node-externals";

const tsRule = {
  exclude: /node_modules/,
  test: /\.tsx?$/,
  loader: "ts-loader",
  options: {
    transpileOnly: true,
    configFile: path.join(__dirname, "tsconfig.build.json"),
  },
};

const resolve = {
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
};

const client = {
  entry: path.join(__dirname, "src", "client", "index.ts"),
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
      tsRule,
    ],
  },
  output: {
    filename: "client.js",
    path: path.join(__dirname, "build"),
  },
  plugins: [
    new FaviconsWebpackPlugin(
      path.join(__dirname, "src", "heyyeyaaeyaaaeyaeyaa-196x196.jpg")
    ),
    new HtmlWebpackPlugin({
      template: path.join("src", "index.html"),
      title: "client",
    }),
    new ManifestPlugin(),
  ],
  resolve,
};

const server = {
  entry: path.join(__dirname, "src", "server", "index.ts"),
  externals: [webpackNodeExternals()],
  module: {
    rules: [tsRule],
  },
  output: {
    filename: "server.js",
    path: path.join(__dirname, "build"),
  },
  resolve,
  target: "node",
};

export default [client, server];
