const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')


const getHtmlWebpackPluginInstance = () => {
    return new HtmlWebpackPlugin({
        title: "webpack5-ts-vue",
        template: path.resolve('./public/index.html'),
    })
}

const getVueLoaderPluginInstance = () => new VueLoaderPlugin()
const getMiniCssExtractPluginInstance = () => new MiniCssExtractPlugin()

module.exports = {
    getHtmlWebpackPluginInstance,
    getVueLoaderPluginInstance,
    getMiniCssExtractPluginInstance,
}