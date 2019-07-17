const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));

module.exports = function (env = {}) {
  return {
    mode: env.production ? 'production' : 'development',
    entry: './src/index',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'glsl-doodle.js',
      publicPath: '/js/',
      library: ['Doodle'],
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    resolve: {
      alias: {'gl-renderer': 'gl-renderer/src/index.js'},
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!gl-renderer).*/,
          use: {
            loader: 'babel-loader',
            options: babelrc,
            // options: {babelrc: true},
          },
        },
        {
          test: /\.(frag|vert|glsl)$/,
          use: {
            loader: 'glsl-shader-loader',
            options: {},
          },
        },
      ],

      /* Advanced module configuration (click to show) */
    },

    externals: {

    },
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: 'errors-only',
    // lets you precisely control what bundle information gets displayed

    devServer: {
      contentBase: path.join(__dirname, env.server || '.'),
      compress: true,
      port: 3000,
      hot: true,
      // ...
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      }),
    ],
    // list of additional plugins

    /* Advanced configuration (click to show) */
  };
};
