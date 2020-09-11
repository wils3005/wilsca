import * as cleanWebpackPlugin from "clean-webpack-plugin";
import { FaviconWebpackPlugionOptions } from "favicons-webpack-plugin/src/options";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import seed from "./manifest";
import webpack from "webpack";

const srcPath = path.join(__dirname, "src");
const myServiceWorkerPath = path.join(srcPath, "MyServiceWorker");

const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
  template: path.join(srcPath, "index.html"),
};

const faviconWebpackPluginOptions: FaviconWebpackPlugionOptions = {
  logo: path.join(srcPath, "logo.jpg"),
};

const manifestPluginOptions: ManifestPlugin.Options = {
  seed,
};

const miniCssExtractPluginOptions: MiniCssExtractPlugin.PluginOptions = {
  filename: "[contenthash].css",
};

const cleanWebpackPluginOptions: cleanWebpackPlugin.Options = {
  verbose: true,
};

const webpackSourceMapDevToolPluginOptions: webpack.SourceMapDevToolPlugin.Options = {
  filename: "[contenthash].js.map",
};

const rules: webpack.RuleSetRule[] = [
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: "file-loader",
  },
  {
    test: /\.css$/,
    use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
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
];

////////////////////////////////////////////////////////////////////////////////
const entry: webpack.Entry = {
  App: path.join(srcPath, "App.tsx"),
  MyServiceWorker: path.join(myServiceWorkerPath, "index.ts"),
  MyWebSocket: path.join(myServiceWorkerPath, "MyWebSocket.ts"),
  index: path.join(srcPath, "index.ts"),
};

const webpackModule: webpack.Module = { rules };

const optimization: webpack.Options.Optimization = {
  splitChunks: {
    chunks: "all",
  },
};

const output: webpack.Output = {
  filename: "[contenthash].js",
  globalObject: "this",
  path: path.join(__dirname, "build"),
};

const plugins: webpack.Plugin[] = [
  new HtmlWebpackPlugin(htmlWebpackPluginOptions),
  new FaviconsWebpackPlugin(faviconWebpackPluginOptions),
  new ManifestPlugin(manifestPluginOptions),
  new MiniCssExtractPlugin(miniCssExtractPluginOptions),
  new cleanWebpackPlugin.CleanWebpackPlugin(cleanWebpackPluginOptions),
  new webpack.SourceMapDevToolPlugin(webpackSourceMapDevToolPluginOptions),
];

const resolve: webpack.Resolve = {
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
};

////////////////////////////////////////////////////////////////////////////////
const webpackConfiguration: webpack.Configuration = {
  devtool: "source-map",
  entry,
  module: webpackModule,
  optimization,
  output,
  plugins,
  resolve,
};

export default webpackConfiguration;
