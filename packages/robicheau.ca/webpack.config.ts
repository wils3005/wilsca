import Path from "path";
import TerserPlugin from "terser-webpack-plugin";
import WebpackNodeExternals from "webpack-node-externals";

const base = {
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(css|gif|html|jpe?g|ico|json|m4a|mp3|ogg|png|svg)$/i,
        type: "asset/resource",
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: Path.join(__dirname, "tsconfig.build.json"),
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

const server = {
  ...base,
  entry: {
    server: Path.join(__dirname, "src", "server.ts"),
  },
  externalsPresets: { node: true },
  externals: [WebpackNodeExternals()],
  output: {
    assetModuleFilename: "[name][ext]",
    globalObject: "this",
    path: Path.join(__dirname, "dist"),
  },
  target: "node",
};

const browser = {
  ...base,
  entry: {
    main: Path.join(__dirname, "src", "main.ts"),
  },
  output: {
    assetModuleFilename: "[name][ext]",
    globalObject: "this",
    path: Path.join(__dirname, "dist"),
  },
};

const config = [server, browser];

export default config;
