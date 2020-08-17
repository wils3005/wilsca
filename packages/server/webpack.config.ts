import "dotenv/config";
import path from "path";
import webpackNodeExternals from "webpack-node-externals";

export default {
  entry: path.join(__dirname, "src", "index.ts"),
  externals: [webpackNodeExternals()],
  mode: "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { configFile: path.join(__dirname, "tsconfig.build.json") },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "build"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  stats: "verbose",
  target: "node",
};
