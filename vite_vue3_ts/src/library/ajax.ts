import axios, { Axios, AxiosRequestConfig, Method, AxiosResponse } from "axios";

interface requestOption {
  url: string;
  method: Method;
  params?: Object;
  data?: Object;
  others: AxiosRequestConfig;
}

class HttpRequest {
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

  request<T>({ url, method, params, data, others }: requestOption):Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request({ url, method, params, data, ...others })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: {},
};

const instance = new HttpRequest(options);

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
    others:others?others:{},
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
const $post = async (url: string, data: Object, others?: AxiosRequestConfig) => {
  const options: requestOption = {
    url,
    method: "post",
    data,
    others:others?others:{},
  };

  return await instance.request(options);
};

export { $get, $post };
