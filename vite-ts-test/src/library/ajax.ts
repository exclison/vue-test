import axios, { Axios, AxiosRequestConfig, Method } from "axios";

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

  request({ url, method, params, data, others }: requestOption) {
    return new Promise((resolve, reject) => {
      this.instance
        .request({ url, method, params, data, ...others })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const options: AxiosRequestConfig = {
  baseURL: "",
  timeout: 30000,
  headers: {},
};

const instance = new HttpRequest(options);


const $get = async (
  url: string,
  params: Object,
  others: AxiosRequestConfig
) => {
  const options: requestOption = {
    url,
    method: "get",
    params,
    others,
  };
  return await instance.request(options);
};

const $post = async (url: string, data: Object, others: AxiosRequestConfig) => {
  const options: requestOption = {
    url,
    method: "post",
    data,
    others,
  };

  return await instance.request(options);
};
// const { $get, $post } = instance;

export { $get, $post };
