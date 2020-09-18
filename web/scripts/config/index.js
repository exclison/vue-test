const {
  getJSLoader,
  getVueLoader,
  getCSSLoader,
  getLESSLoader,
  getSASSLoader,
  getAssetsLoader,
} = require("./loader");

const { 
  getVueLoaderPlugin,
  getHtmlWebpackPlugin,
  getStylePlugin,
  getMiniCssExtractPlugin,
  getTerserPlugin,
  getHotModuleReplacementPlugin,
 } = require("./plugin");

const { reslove } = require("./util");

function getCommonConfig () {
  return {
    entry: reslove("./src/main.js"), // 入口文件
    resolve: {
      // 解析模块请求的选项
      // （不适用于对 loader 解析）

      extensions: [".js", ".json", ".jsx", ".css"],
      // 使用的扩展名

      alias: {
        // 模块别名列表
        "@": reslove("./src"),
      },
    },
  };
}

exports.getDevConfig = function () {
  const mode = "development";

  const common = getCommonConfig();

  return Object.assign(common, {
    output: {
      path: reslove("./dist"), //打包后的文件存放的地方
      filename: "[name].[hash].js", //打包后输出文件的文件名
    },
    mode,
    module: {
      // 关于模块配置
      rules: [
        // 模块规则（配置 loader、解析器等选项）
        getJSLoader(mode),
        getVueLoader(mode),
        getCSSLoader(mode),
        getLESSLoader(mode),
        getSASSLoader(mode),
        ...getAssetsLoader(mode),
      ],
    },
    plugins: [
      getVueLoaderPlugin(),
      getHtmlWebpackPlugin({
        template:reslove('./public/index.html'),
        filename:'index.html',
        minify: {
          caseSensitive: false, // 是否大小写敏感
          collapseWhitespace: true, // 是否去除空格
          removeAttributeQuotes: true, // 去掉属性引用
          removeComments: true, // 去注释
        },
      }),
      getHotModuleReplacementPlugin(),
    ],
  });
}

exports.getProdConfig = function () {
  const mode = "production";

  const common = getCommonConfig();

  return Object.assign(common, {
    output: {
      path: reslove("./dist"), //打包后的文件存放的地方
      filename: "[name].[chunkhash].js", //打包后输出文件的文件名
    },
    mode,
    module: {
      // 关于模块配置
      rules: [
        // 模块规则（配置 loader、解析器等选项）
        getJSLoader(mode),
        getVueLoader(mode),
        getCSSLoader(mode),
        getLESSLoader(mode),
        getSASSLoader(mode),
        ...getAssetsLoader(mode),
      ],
    },
    plugins: [
      getVueLoaderPlugin(),
      getHtmlWebpackPlugin({
        template:reslove('./public/index.html'),
        filename:'index.html',
        minify: {
          caseSensitive: false, // 是否大小写敏感
          collapseWhitespace: true, // 是否去除空格
          removeAttributeQuotes: true, // 去掉属性引用
          removeComments: true, // 去注释
        },
      }),
      getMiniCssExtractPlugin(),
      getStylePlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [new getTerserPlugin()],
    },
  });
}
