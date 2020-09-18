const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

exports.getVueLoaderPlugin =  function () {
  return new VueLoaderPlugin();
}

exports.getHtmlWebpackPlugin = function (options) {
  return new HtmlWebpackPlugin(Object.assign({}, options));
}

exports.getCleanWebpackPlugin = function (options) {
  return new CleanWebpackPlugin(Object.assign({}, options));
}
exports.getStylePlugin = function (options) {
  return new OptimizeCssAssetsPlugin(
    Object.assign(
      {
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      },
      options
    )
  );
}
exports.getMiniCssExtractPlugin = function (options) {
  return new MiniCssExtractPlugin(Object.assign({
    filename: 'assets/style/[name].[contenthash].css',
  }, options));
}
exports.getHotModuleReplacementPlugin = function () {
  return new HotModuleReplacementPlugin();
}
exports.getTerserPlugin = function (options) {
  return new TerserPlugin(
      Object.assign({
        cache: true, // 使用 cache，加快二次构建速度
        parallel: true, // 开启多线程
        extractComments: true,
        terserOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
          },
        },
      },options)
  );
}
