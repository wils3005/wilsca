import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import path from "path";
import webpackNodeExternals from "webpack-node-externals";

const src = path.join(__dirname, "src");

export default {
  entry: {
    client: path.join(src, "client.ts"),
    serviceWorker: path.join(src, "serviceWorker.ts"),
    server: path.join(src, "server.ts"),
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
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
        options: {
          transpileOnly: true,
          configFile: path.join(__dirname, "tsconfig.build.json"),
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
    path: path.join(__dirname, "public"),
    publicPath: "public/",
  },
  plugins: [
    new FaviconsWebpackPlugin(
      path.join(__dirname, "public", "heyyeyaaeyaaaeyaeyaa-196x196.jpg")
    ),
    new ManifestPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  target: "node",
};
