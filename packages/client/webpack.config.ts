import { Configuration, Entry } from 'webpack';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';
import { basename, extname, join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

const srcPath = join(__dirname, 'src');

const webpackConfiguration: Configuration = {
  devtool: 'source-map',
  entry: readdirSync(join(__dirname, 'src')).reduce(
    (entry: Entry, s: string) => {
      if (/^[^.]+\.[jt]sx?$/.test(s)) {
        const key = basename(s, extname(s));
        entry[key] = join(srcPath, s);
      }

      return entry;
    },
    {}
  ),
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: join(__dirname, 'tsconfig.json'),
        },
      },
      {
        test: /\.css$/,
        use: [{ loader }, 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    globalObject: 'this',
    path: join(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(srcPath, 'index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: join(srcPath, 'logo.jpg'),
    }),
    new ManifestPlugin({
      seed: readFileSync('./src/manifest.json'),
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
};

export default webpackConfiguration;
