import fs = require('fs');
import path = require('path');

import * as cleanWebpackPlugin from 'clean-webpack-plugin';
import { FaviconWebpackPlugionOptions } from 'favicons-webpack-plugin/src/options';
import FaviconsWebpackPlugin = require('favicons-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import ManifestPlugin = require('webpack-manifest-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import webpack = require('webpack');

import seed = require('./src/manifest.json');

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
const devtool = 'source-map';

const entry = fs.readdirSync(path.join(__dirname, 'src')).reduce(fn, {});

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
  devtool,
  entry,
  mode: 'development',
  module: { rules },
  optimization,
  output,
  plugins,
  resolve,
};

function fn(entry: webpack.Entry, s: string): webpack.Entry {
  if (/^[^.]+\.[jt]sx?$/.test(s)) {
    const key = path.basename(s, path.extname(s));
    entry[key] = path.join(srcPath, s);
  }

  return entry;
}

export = webpackConfiguration;
