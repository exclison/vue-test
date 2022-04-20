
const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
        hot: true,
        port: 8900,
        open: true,
        client: {
            logging: 'error',//只打印报错，其实只要这个配置就好了
            overlay: {  //有报错发生，直接覆盖浏览器视窗，显示错误
                errors: true,
                warnings: false,
            },
        },
    },
    
})