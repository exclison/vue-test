const Vue = require("vue");
const express = require("express");
const server = require("express")();
const path = require("path");
// const createApp = require("./app");
// const createApp = require("/path/to/built-server-bundle.js");
// const renderer = require('vue-server-renderer').createRenderer()
const { createBundleRenderer } = require('vue-server-renderer')

const serverBundle = require(path.resolve(__dirname,'../dist/server/vue-ssr-server-bundle.json'))

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template:require("fs").readFileSync(path.resolve(__dirname, "./index.html"),"utf-8"), // （可选）页面模板
    clientManifest:require(path.resolve(__dirname,'../dist/client/vue-ssr-client-manifest.json')) // （可选）客户端构建 manifest
  })
// const renderer = require("vue-server-renderer").createRenderer({
//   template: require("fs").readFileSync(
//     path.resolve(__dirname, "./index.html"),
//     "utf-8"
//   ),
// });
//处理favicon
// const favicon = require("serve-favicon");

//处理favicon
// server.use(favicon(path.join(__dirname, "../public", "favicon.ico")));

//静态资源处理
server.use(express.static(path.resolve(__dirname,"../dist/client"), { index: false }));

server.get("*", (req, res) => {
  const context = { url: req.url };

// 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html)
  })

  //   const app = createApp(context);
//   createApp(context).then((app) => {
//     renderer.renderToString(app, (err, html) => {
//       if (err) {
//         if (err.code === 404) {
//           res.status(404).end("Page not found");
//         } else {
//           res.status(500).end("Internal Server Error");
//         }
//       } else {
//         res.end(html);
//       }
//     });
//   });

  //   const context = {
  //     title: 'hello',
  //     meta: `
  //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //     `
  //   }

  //   renderer.renderToString(app, context, (err, html) => {
  //     if (err) {
  //         console.error(err);
  //       res.status(500).end("Internal Server Error");
  //       return;
  //     }
  //     res.end(html);
  //   });
});

server.listen(8080);
