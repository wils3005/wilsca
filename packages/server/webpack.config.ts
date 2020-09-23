import * as cleanWebpackPlugin from 'clean-webpack-plugin';
import path = require('path');
import webpack = require('webpack');
import webpackNodeExternals = require('webpack-node-externals');

const cleanWebpackPluginOptions: cleanWebpackPlugin.Options = {
  verbose: true,
};

const webpackConfiguration: webpack.Configuration = {
  entry: {
    index: path.join(__dirname, 'src', 'index.ts'),
  },
  externals: [webpackNodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: path.join(__dirname, 'tsconfig.build.json'),
        },
      },
      {
        loader: 'file-loader',
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
