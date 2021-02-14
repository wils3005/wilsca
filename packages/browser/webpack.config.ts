import Path from "path";

const srcPath = Path.join(__dirname, "src");

const config = {
  devServer: {
    writeToDisk: true,
  },
  devtool: "source-map",
  entry: {
    app: Path.join(srcPath, "window-application.ts"),
    sw: Path.join(srcPath, "service-worker-application.ts"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|json|m4a|mp3|ogg|png|)$/i,
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
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  output: {
    assetModuleFilename: "[name][ext]",
    globalObject: "this",
    path: Path.join(__dirname, "public", "js"),
  },
  plugins: [],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default config;
