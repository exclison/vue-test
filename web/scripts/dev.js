const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { getDevConfig } = require("./config");
const webpackConfig = getDevConfig();

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  historyApiFallback: true,
  open: true,
  hot: true,
  inline: true,
  stats: "errors-warnings",
  overlay: {
    // 浏览器全屏显示错误
    errors: true,
    warnings: false,
  },
  stats: {
    colors: true,
  },
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8087, "127.0.0.1", () => {
  console.log("Starting server on http://localhost:8087");
});
