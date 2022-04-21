
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { getDevOptions } = require('./options')


const devServer = {
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
}

const compiler = Webpack({ ...getDevOptions(), stats: 'errors-warnings' });

const server = new WebpackDevServer(devServer, compiler);

server.start();