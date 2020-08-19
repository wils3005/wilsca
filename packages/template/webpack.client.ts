import DotenvWebpackPlugin from "dotenv-webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import path from "path";

export default {
  entry: path.join(__dirname, "src", "client", "index.ts"),
  mode: "development",
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
        options: { configFile: path.join(__dirname, "tsconfig.json") },
      },
    ],
  },
  output: {
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
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  stats: "verbose",
};
