
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: "./src/main.ts",
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
            },
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                type: "asset",
                generator: {
                    filename: "images/[name]-[hash][ext]",
                },
            },
            {
                test: /\.(eot|svg|ttf|woff2?|)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name]-[hash][ext]",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack5-ts-vue",
            template: "./public/index.html",
        }),
        new VueLoaderPlugin()
    ],
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