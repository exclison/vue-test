//nodejd代码
const express = require("express");
const path = require("path");
const fs = require("fs");
const Vue = require("vue");

//获取实例
const server = express();

//获取绝对路由函数
function resolveCustom(dir) {
  //把当前执行js文件绝对地址和传入dir做拼接
  return path.resolve(__dirname, dir);
}

//2.获取渲染器实例
const { createBundleRenderer } = require("vue-server-renderer");
//参数1是服务端Brundle

const bundle = require(resolveCustom("../dist/server/vue-ssr-server-bundle.json"));
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, //https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: fs.readFileSync(resolveCustom("../public/index.html"), "utf-8"), //宿主文件
  clientManifest: require(resolveCustom(
    "../dist/client/vue-ssr-client-manifest.json"
  )), //客户端清单
});

//处理favicon
const favicon = require("serve-favicon");
// const { log } = require("console");
// const { resolve } = require("path");

//处理favicon
server.use(favicon(path.join(__dirname, "../public", "favicon.ico")));

//静态资源处理
server.use(express.static(resolveCustom("../dist/client"), { index: false }));

// 编写路由处理不同请求
server.get("*", async (req, res) => {
  //构造上下文
  const context = {
    title: "ssr test",
    url: req.url, //首屏地址
  };
  try {
    //渲染输出
    // const html = await renderer.renderToString(context);
    renderer.renderToString(context,(err,html)=>{
      //响应给前端
      if(err){
        console.error(err);
      }
      console.log(html,'gh');
      res.send(html);

    });
    //相应给前端
    // res.send(html);
  } catch (error) {
    res.status(500).send("服务器渲染出错");
  }
});

//监听端口
server.listen(3000, () => {
  console.log("runing");
});
