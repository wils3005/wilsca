import path = require('path');

import * as cleanWebpackPlugin from 'clean-webpack-plugin';
import webpack = require('webpack');
import webpackNodeExternals = require('webpack-node-externals');

const cleanWebpackPluginOptions: cleanWebpackPlugin.Options = {
  verbose: true,
};

const webpackConfiguration: webpack.Configuration = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  externals: [webpackNodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /(?<!test)\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: path.join(__dirname, 'tsconfig.build.json'),
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
  },
  plugins: [
    new cleanWebpackPlugin.CleanWebpackPlugin(cleanWebpackPluginOptions),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  target: 'node',
};

export = webpackConfiguration;
