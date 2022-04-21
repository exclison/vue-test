const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getCSSLoaders = (mode) => {
    const loader = {
        test: /\.(le|c)ss$/,
        use: [
            mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "less-loader",
        ],
    };
    return loader
};

const getJSLoader = (mode) => {
    return {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
            },
        },
    }
}

const getVueLoader = (mode) => {
    return {
        test: /\.vue$/,
        loader: 'vue-loader',
    }
}

const getAssetsLoader = (mode) => {
    return [
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
    ]
}

module.exports = {
    getCSSLoaders,
    getJSLoader,
    getVueLoader,
    getAssetsLoader
}