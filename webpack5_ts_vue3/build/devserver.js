
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.dev.js');
const { devServer } = webpackConfig

const compiler = Webpack({ ...webpackConfig, stats: 'errors-warnings' });

const server = new WebpackDevServer(devServer, compiler);

server.start();