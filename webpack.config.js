const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const projectPath = path.resolve(__dirname, './');
const plugins = [];
const postcssPlugins = [];
const dir = {
  project: projectPath,
  src: path.join(projectPath, 'src'),
  css: path.join(projectPath, 'src/css'),
  assets: path.join(projectPath, 'assets'),
  config: path.join(projectPath, 'config'),
  build: path.join(projectPath, 'build'),
  dist: path.join(projectPath, 'dist'),
  mocks: path.join(projectPath, 'src/__mocks__'),
};

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;
  const outputPath = dir.build;

  plugins.push(
    new webpack.EnvironmentPlugin({
      APP_ENV: process.env.NODE_ENV || 'development', // NODE_ENV will be production in js assets. So that keep NODE_ENV's value in APP_ENV
    }),
  );

  plugins.push(
    new HtmlWebpackPlugin({
      title: 'Admin Sample',
      template: `${dir.mocks}/index.ejs`,
      filename: 'index.html',
      chunks: ['app'],
    }),
  );

  // Copy extra assets into build directory
  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${dir.assets}/`,
          to: `${dir.build}/`,
        },
      ],
    }),
  );

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name]-[hash].css',
        chunkFilename: '[id].css',
      }),
    );
  }

  // browser list doc -> https://github.com/ai/browserslist#queries
  postcssPlugins.push(autoprefixer());

  const entry = {
    app: [`${dir.src}/App`],
    // login: [`${dir.src}/Login`],
    // customer: [`${dir.src}/Customer`],
  };

  const cssExtractConfig = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '/',
    },
  };

  return {
    mode: isDev ? 'development' : 'production',
    context: dir.project,
    entry,
    output: {
      filename: '[name]-[chunkhash].js',
      path: outputPath,
      publicPath: '/',
    },
    devtool: isDev ? 'eval-cheap-source-map' : false,
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true,
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
    },
    performance: {
      hints: false,
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.ts|tsx$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: !isProd,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [isProd ? cssExtractConfig : 'style-loader', 'css-loader'],
        },
        {
          test: /\.sass|scss$/,
          use: [
            isProd ? cssExtractConfig : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'global',
                  localIdentName: '[folder]-[name]-[hash:base64:6]',
                },
                localsConvention: 'camelCase',
                url: false,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: postcssPlugins,
              },
            },
            {
              loader: 'sass-loader',
              // options doc -> https://github.com/sass/node-sass
              options: {
                sassOptions: {
                  sourceMap: true,
                  includePaths: [dir.css],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.(ya?ml)$/i,
          use: [
            {
              loader: 'json-loader',
            },
            {
              loader: 'yaml-loader',
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
            },
          ],
        },
      ],
    },

    plugins: plugins,
    resolve: {
      extensions: ['.mjs', '.js', 'jsx', '.ts', '.tsx'],
      modules: ['node_modules', dir.project, dir.src],
      alias: {
        joi: 'joi-browser',
      },
    },
    devServer: {
      port: 8083,
      host: '0.0.0.0',
      hot: isDev,
      open: true,
      historyApiFallback: true,
    },
  };
};
