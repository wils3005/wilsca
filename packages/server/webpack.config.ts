import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';

const src = path.join(__dirname, 'src');

const config = {
  entry: path.join(src, 'index.ts'),
  externals: [webpackNodeExternals()],
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
    ],
  },
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'build'),
  },
  plugins: [],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  target: 'node',
};

// eslint-disable-next-line import/no-default-export
export default config;
