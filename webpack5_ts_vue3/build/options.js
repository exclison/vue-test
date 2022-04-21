
const path = require('path')
const {
    getHtmlWebpackPluginInstance,
    getVueLoaderPluginInstance,
    getMiniCssExtractPluginInstance
} = require("./plugins");
const {
    getCSSLoaders,
    getJSLoader,
    getVueLoader,
    getAssetsLoader,
} = require("./loaders");




const baseOptions = {
    entry: "./src/main.ts",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src"),
            "@assets": path.resolve(__dirname, "../src/assets"),
            "@images": path.resolve(__dirname, "../src/assets/images"),
            "@styles": path.resolve(__dirname, "../src/assets/styles"),
        },
    },
    cache: {
        type: "filesystem",
    },
};

const getDevOptions = () => {

    const mode = 'development'
    const options = {
        ...baseOptions,
        mode,
        module: {
            rules: [
                getCSSLoaders(mode),
                getJSLoader(mode),
                getVueLoader(mode),
                ...getAssetsLoader(mode),
            ],
        },
        plugins: [getHtmlWebpackPluginInstance(), getVueLoaderPluginInstance()],
    }

    return options
}
const getProdOptions = () => {

    const mode = 'production'
    const options = {
        ...baseOptions,
        mode,
        output: {
            clean: true,
        },
        module: {
            rules: [
                getCSSLoaders(mode),
                getJSLoader(mode),
                getVueLoader(mode),
                ...getAssetsLoader(mode),
            ],
        },
        plugins: [getHtmlWebpackPluginInstance(), getVueLoaderPluginInstance(), getMiniCssExtractPluginInstance()],
        optimization: {
            splitChunks: {
                // 选择对哪些文件进行拆分，默认是async，即只对动态导入的文件进行拆分
                chunks: "all",
                // 提取chunk的最小体积
                minSize: 20000,
                // 要提取的chunk最少被引用次数
                minChunks: 1,
                // 对要提取的trunk进行分组
                cacheGroups: {
                    // 匹配node_modules中的三方库，将其打包成一个trunk
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        priority: -10,
                    },
                    default: {
                        // 将至少被两个trunk引入的模块提取出来打包成单独trunk
                        minChunks: 2,
                        name: "default",
                        priority: -20,
                    },
                },
            },
        },
    }

    return options
}

module.exports = {
    getDevOptions,
    getProdOptions
}
