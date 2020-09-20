import * as cleanWebpackPlugin from 'clean-webpack-plugin';
import { FaviconWebpackPlugionOptions } from 'favicons-webpack-plugin/src/options';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import seed from './src/manifest.json';
import webpack from 'webpack';

const srcPath = path.join(__dirname, 'src');

const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
  template: path.join(srcPath, 'index.html'),
};

const faviconWebpackPluginOptions: FaviconWebpackPlugionOptions = {
  logo: path.join(srcPath, 'logo.jpg'),
};

const manifestPluginOptions: ManifestPlugin.Options = {
  seed,
};

const miniCssExtractPluginOptions: MiniCssExtractPlugin.PluginOptions = {};

const cleanWebpackPluginOptions: cleanWebpackPlugin.Options = {
  verbose: true,
};

const rules: webpack.RuleSetRule[] = [
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader',
  },
  {
    test: /\.css$/,
    use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
  },
  {
    test: /\.svg$/,
    loader: 'svg-inline-loader',
  },
  {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      configFile: path.join(__dirname, 'tsconfig.build.json'),
    },
  },
];

////////////////////////////////////////////////////////////////////////////////
const entry: webpack.Entry = {
  App: path.join(srcPath, 'App.tsx'),
  MyWebSocket: path.join(srcPath, 'MyWebSocket.ts'),
  index: path.join(srcPath, 'index.ts'),
  log: path.join(srcPath, 'log.ts'),
  sw: path.join(srcPath, 'sw.ts'),
};

const optimization: webpack.Options.Optimization = {
  splitChunks: {
    chunks: 'all',
  },
};

const output: webpack.Output = {
  globalObject: 'this',
  path: path.join(__dirname, 'build'),
};

const plugins: webpack.Plugin[] = [
  new HtmlWebpackPlugin(htmlWebpackPluginOptions),
  new FaviconsWebpackPlugin(faviconWebpackPluginOptions),
  new ManifestPlugin(manifestPluginOptions),
  new MiniCssExtractPlugin(miniCssExtractPluginOptions),
  new cleanWebpackPlugin.CleanWebpackPlugin(cleanWebpackPluginOptions),
];

const resolve: webpack.Resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
};

////////////////////////////////////////////////////////////////////////////////
const webpackConfiguration: webpack.Configuration = {
  devtool: 'source-map',
  entry,
  mode: 'development',
  module: { rules },
  optimization,
  output,
  plugins,
  resolve,
};

export default webpackConfiguration;
