module.exports = {
    configureWebpack: {
        devServer: {
            // proxy: { // 代理url
            //   '/api': 'http://localhost:3000'
            // },
            hot: true, // 热模块替换
            port:8090,
            open:true,
          },
    }
  }