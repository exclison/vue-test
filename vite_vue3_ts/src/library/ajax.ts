import axios, { Axios, AxiosRequestConfig, Method, AxiosResponse } from "axios";

interface requestOption {
  url: string;
  method: Method;
  params?: Object;
  data?: Object;
  others: AxiosRequestConfig;
}

interface RequestConcel {
  url: string | undefined;
  controller: AbortController;
}

class HttpRequest {
  // 请求控制列表
  private requestList: Array<RequestConcel> = [];
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
        .then((res) => resolve(res.data))
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
      this.cancelRequest(config.url);

      const controller = this.createController(config.url);

      config.signal = controller.signal;

      return config;
    });
  }
  // 添加响应拦截
  addResponseInterceptors() {
    this.instance.interceptors.response.use((config) => {
      this.removeController(config.config.url);
      return config;
    });
  }
  // 判断是否在请求中
  hasRequested(url: string | undefined) {
    return this.requestList.find((item) => item.url === url);
  }
  // 取消请求
  cancelRequest(url: string | undefined) {
    const controllerInstance = this.hasRequested(url);
    if (controllerInstance) {
      controllerInstance.controller.abort();
      this.requestList = this.requestList.filter((item) => item.url !== url);
      console.warn("请求重复,已取消");
    }
  }
  // 添加请求控制器
  createController(url: string | undefined) {
    const controller = new AbortController();

    const requestCancel: RequestConcel = {
      url: url,
      controller,
    };

    this.requestList.push(requestCancel);

    return controller;
  }
  // 移除请求控制器
  removeController(url: string | undefined) {
    setTimeout(() => {
      this.requestList = this.requestList.filter((item) => item.url !== url);
    }, 1000);
  }
}

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
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
