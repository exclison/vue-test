// vue.config.js
const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("svg")
      .exclude.add(path.resolve(__dirname, "./src/assets/icons"));

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
};
