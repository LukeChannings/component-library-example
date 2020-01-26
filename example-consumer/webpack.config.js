/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env, argv) => {
  const { mode = 'development' } = argv;
  const isProduction = mode === 'production';

  return {
    mode,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, './dist')
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /.css$/,
          exclude: /\.module\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
      ]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: pkg.description,
        template: 'src/index.ejs',
      }),
      new CleanWebpackPlugin(),
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false,
        }),
      ] : [])
    ],
    optimization: {
      sideEffects: true,
      usedExports: true,
    }
  };
}