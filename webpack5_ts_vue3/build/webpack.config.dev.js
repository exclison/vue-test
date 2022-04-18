
const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig,{
    mode: "development",
    devServer:{
        hot:true,
        port:8900,
        open:true
    }
})