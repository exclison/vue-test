import Vue from "vue";
import axios from "axios";
import config from "../config/config";

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
        onUploadProgress: function(progressEvent) {
          //允许为上传处理进度事件
        },
        onDownloadProgress: function(progressEvent) {
          // 允许为下载处理进度事件
        },
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

  async request({ url, data, method, header, params }) {
    const headers = Object.assign({}, this.instance.headers, header);
    await this.instance
      .request({
        url: url,
        method: method,
        headers: headers,
        params: params,
        data: data,
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      });
  }
}
const instance = new Ajax();

const $get = async (url, data, header, params) => {
  await instance
    .request({ url, data, method: "get", header, params })
    .then((res) => res);
};
const $post = async (url, data, header) => {
  await instance
    .request({ url, data, method: "post", header })
    .then((res) => res);
};
export { $get, $post };
