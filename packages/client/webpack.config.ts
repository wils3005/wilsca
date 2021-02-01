import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join } from "path";

const srcPath = join(__dirname, "src");

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
  entry: {
    main: join(srcPath, "main.ts"),
  },
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
          configFile: join(srcPath, "tsconfig.build.json"),
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
  plugins: [],
  target: "web",
};

export default config;
