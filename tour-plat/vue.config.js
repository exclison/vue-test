/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-05-17 15:07:21
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-09-20 18:37:19
 * @FilePath: \vue-test\tour-plat\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: 
 */
const { name } = require('./package.json');
module.exports = {
  configureWebpack: {
    devServer: {
      // proxy: { // 代理url
      //   '/api': 'http://localhost:3000'
      // },
      hot: true, // 热模块替换
      port: 8090,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  }
}