import axios, { Axios, AxiosRequestConfig, Method, AxiosResponse } from "axios";

interface requestOption {
  url: string;
  method: Method;
  params?: Object;
  data?: Object;
  others: AxiosRequestConfig;
}

// 控制请求,相同url每次请求前先取消上次请求(只有响应时长较长是起作用,原因是响应快来不及拦截)
// 用于解决因每次请求响应时间不同导致的前端竞态问题
interface RequestConcel {
  [key: string]: AbortController;
}

class HttpRequest {
  // 请求控制列表
  private requestMap: RequestConcel = {};
  private instance: Axios;

  constructor({ baseURL, timeout, headers, ...others }: AxiosRequestConfig) {
    const instance = axios.create({
      baseURL: baseURL,
      timeout: timeout,
      headers: Object.assign({}, headers),
      withCredentials: false, // 跨域请求时是否需要使用凭证
      ...others,
    });
    this.instance = instance;
  }

  request<T>({ url, method, params, data, others }: requestOption): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request({ url, method, params, data, ...others })
        .then((res) => {
          if(res.data.status === 1){
            resolve(res.data.data);
          }
          else {
            reject(res.data.msg)
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.config) {
            this.removeController(err.config.url);
          }
          if (err.message !== "canceled") {
            reject(err);
          } else {
            reject("请求取消");
          }
        });
    });
  }
  // 添加请求拦截
  addRequestInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const url: string = config.url ? config.url : "";
      this.cancelRequest(url);
      const controller = this.createController(url);
      config.signal = controller.signal;
      return config;
    });
  }
  // 添加响应拦截
  addResponseInterceptors() {
    this.instance.interceptors.response.use((config) => {
      const url: string = config.config.url ? config.config.url : "";
      this.removeController(url);
      return config;
    });
  }
  // 取消请求
  cancelRequest(url: string) {
    this.requestMap[url] && this.requestMap[url].abort();
    this.removeController(url);
  }
  // 添加请求控制器
  createController(url: string) {
    const controller = new AbortController();
    this.requestMap[url] = controller;
    return controller;
  }
  // 移除请求控制器
  removeController(url: string) {
    delete this.requestMap[url];
  }
}

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5,
  headers: {},
};

const instance = new HttpRequest(options);

instance.addRequestInterceptors();
instance.addResponseInterceptors();

/**
 * @name:$get
 * @description:get请求
 * @author: hanyuchen
 * @date 2022-03-08 14:02:15
 * @params {String} paramsName: url
 * @params { Object} paramsName: 参数
 * @params {AxiosRequestConfig} paramsName: 其他axios参数
 */
const $get = async (
  url: string,
  params: Object,
  others?: AxiosRequestConfig
) => {
  const options: requestOption = {
    url,
    method: "get",
    params,
    others: others ? others : {},
  };
  return await instance.request(options);
};
/**
 * @name:$post
 * @description:post请求
 * @author: hanyuchen
 * @date 2022-03-08 14:03:07
 * @params {String} paramsName: url
 * @params {Object} paramsName: 参数
 * @params {AxiosRequestConfig} paramsName: 其他axios参数
 */
const $post = async (
  url: string,
  data: Object,
  others?: AxiosRequestConfig
) => {
  const options: requestOption = {
    url,
    method: "post",
    data,
    others: others ? others : {},
  };

  return await instance.request(options);
};

export { $get, $post };
