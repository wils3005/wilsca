import Path from "path";
import TerserPlugin from "terser-webpack-plugin";

const config = {
  devtool: "source-map",
  entry: Path.join(__dirname, "src", "index.ts"),
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
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  output: {
    assetModuleFilename: "[name][ext]",
    globalObject: "this",
    path: Path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default config;
