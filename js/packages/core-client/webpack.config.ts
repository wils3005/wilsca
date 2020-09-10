import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import path from "path";
import seed from "./manifest";

const src = path.join(__dirname, "src");

const config = {
  entry: {
    index: path.join(src, "index.ts"),
    MyServiceWorker: path.join(src, "MyServiceWorker.ts"),
    MyWebSocket: path.join(src, "MyWebSocket.ts"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: path.join(__dirname, "tsconfig.build.json"),
        },
      },
      {
        test: /MyServiceWorker.js$/,
        loader: "worker-loader",
        options: {
          worker: "ServiceWorker",
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    filename: "[name].js",
    globalObject: "this",
    path: path.join(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(src, "index.html") }),
    new FaviconsWebpackPlugin(path.join(src, "logo.jpg")),
    new ManifestPlugin({ seed }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};

export default config;
