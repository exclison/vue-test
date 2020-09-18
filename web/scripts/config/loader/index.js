const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const eslintLoader = {
  loader: "eslint-loader",
  options: {
    fix: true,
  },
};
exports.getJSLoader = function (mode) {
  const use = [
    "thread-loader",
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];

  mode === "development" && use.push(eslintLoader);

  return {
    test: /\.js$/,
    use,
    exclude: /node_modules/,
  };
}

exports.getVueLoader = function (mode) {
  const use = ["vue-loader"];
  mode === "development" && use.push(eslintLoader);

  return {
    test: /\.vue$/,
    use,
  };
}

exports.getCSSLoader = function (mode) {
  const use = [
    mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
  ];

  return {
    test: /\.css$/i,
    use,
  };
}

exports.getLESSLoader = function (mode) {
  const use = [
    mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    "less-loader",
  ];

  return {
    test: /\.less$/i,
    use,
  };
}
exports.getSASSLoader = function (mode) {
  const use = [
    mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    "sass-loader",
  ];

  return {
    test: /\.less$/i,
    use,
  };
}
exports.getAssetsLoader = function (mode) {

    const name = mode === "development" ? "[name].[ext]" : "[name].[contenthash].[ext]"

    const imgReslove = {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: `assets/images/${name}`,
              limit: 3 * 1024,
            },
          },
        ],
      }

    const mediaReslove = {
        test: /\.(mp4|avi|mp3|rmvb|wmv|flv|webm)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `assets/media/${name}`,
            },
          },
        ],
      }

    const fontReslove = {
        test: /\.(woff2|woff|eot|ttf|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: `assets/font/${name}`,
            },
          },
        ],
      }


  return [imgReslove,mediaReslove,fontReslove];
}
