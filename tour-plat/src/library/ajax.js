import Vue from "vue";
import axios from "axios";
import config from "../config/config";
import apiList from "../config/api";

//ajax类
class Ajax {
  constructor() {
    this.instance =
      this.instance ||
      axios.create({
        baseURL: config.base_url,
        headers: { "Content-Type": "application/json" },
        timeout: 3000,
        withCredentials: false, // 跨域请求时是否需要使用凭证
        responseType: "json", // 响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        // onUploadProgress: function(progressEvent) {
        //   //允许为上传处理进度事件
        // },
        // onDownloadProgress: function(progressEvent) {
        //   // 允许为下载处理进度事件
        // },
        // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
        transformResponse: [
          function(data) {
            // 对 data 进行任意转换处理
            return data;
          },
        ],
        // proxy: {
        //   host: "127.0.0.1",
        //   port: 9000,
        // },
      });
  }
  //暴露request方法用于发送请求
  request({ url, data, method, header, params }) {
    const apiUrl = apiList[url];
    console.log(apiUrl, url, apiList, "dddsss");
    const userInfo = JSON.parse(
      window.localStorage.getItem(config.base_name + "userInfo")
    );
    const ticket = userInfo ? userInfo.ticket || "" : "";
    const headers = Object.assign({}, this.instance.headers, header, {
      ticket,
    });
    return new Promise((resolve, reject) => {
      this.instance
        .request({
          url: apiUrl,
          method: method,
          headers: headers,
          params: params,
          data: data,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((error) => {
          if(error.response.data.code===400){
            Vue.prototype.$alertError(error.response.data.msg)
          }
          reject(error);
        });
    });
  }
}
const instance = new Ajax();
/*
 *@name:$get
 *@description:发送get请求的公共方法(基于Ajax类)
 *@author: hanyuchen
 *@date: 2020-12-21 14:19:06
 *@params {String} url: 请求url
 *@params {Object} data: 参数
 *@params {Object} Object: 其他自定义参数header等
 */
const $get = async (url, data, { header = {}, params = {} } = {}) => {
  return await instance
    .request({ url, data, method: "get", header, params })
    .then((res) => res);
};
/*
 *@name:$post
 *@description:发送post请求的公共方法(基于Ajax类)
 *@author: hanyuchen
 *@date: 2020-12-21 14:20:56
 *@params {String} url: 请求url
 *@params {Object} data: 参数
 *@params {Object} Object: 其他自定义参数header等
 */
const $post = async (url, data, { header = {} } = {}) => {
  return await instance
    .request({ url, data, method: "post", header })
    .then((res) => res);
};
export { $get, $post };
