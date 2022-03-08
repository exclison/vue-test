import axios, { Axios, AxiosRequestConfig, Method } from "axios";

interface requestOption {
  url: string;
  method: Method;
  params?: Object;
  data?: Object;
  others: AxiosRequestConfig;
}

class HTTPREQUEST {
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

  private request({ url, method, params, data, others }: requestOption) {
    return new Promise((resolve, reject) => {
      this.instance
        .request({ url, method, params, data, ...others })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async $get(url: string, params: Object, others: AxiosRequestConfig) {
    const options: requestOption = {
      url,
      method: "get",
      params,
      others,
    };

    return await this.request(options);
  }
  

  public async $post(url: string, data: Object, others: AxiosRequestConfig) {
    const options: requestOption = {
      url,
      method: "post",
      data,
      others,
    };

    return await this.request(options);
  }
}

const options: AxiosRequestConfig = {
  baseURL: "",
  timeout: 30000,
  headers: {},
};

const instance = new HTTPREQUEST(options);

const {$get,$post} = instance

export {$get,$post}
