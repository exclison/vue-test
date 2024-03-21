/**
 * @name:HttpRequest
 * @description:使用axios发送请求的公共方法封装
 * @author: hanyuchen
 * @date 2022-09-01 10:58:34
 * @注意事项 如果项目中有mockjs,使用接口前一定全部关掉,否则timeout属性不会生效
 */
import axios, { Axios, AxiosRequestConfig, Method, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { getToken } from '@/library/util'
import MessageBox from "@/components/Message/index";
// import store from "@/store";
// import { useUserStore } from "@/store/user";
// const userStore = useUserStore(store);
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

  request<T, R>({
    url,
    method,
    params,
    data,
    others,
  }: requestOption): Promise<[T, R]> {
    return new Promise((resolve, reject) => {
      this.instance
        .request({ url, method, params, data, ...others })
        .then((res) => {
          if (res.data.status === 1) {
            resolve([res.data.data, res.data]);
          } else {
            // MessageBox({ message: res.data.msg });
            if (res.data.code === 200) {
              resolve([res.data.data, res.data]);
              return
            }
            if (res.data.code === 401) {
              ElMessage({
                message: '登录状态已过期,请重新登录',
                type: "warning",
                offset: 120,
              });
              reject(res.data.msg);
              return
            }
            if (res.data.status === 405) {
              // userStore.logout();
            }
            if (res.data.status === 9001) {
              resolve([res.data.data, res.data]);
              return
            }
            if (res.data.success) {
              resolve(res.data)
              return
            }
            ElMessage({
              message: res.data.msg,
              type: "error",
              offset: 120,
            });
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          if (err.config) {
            this.removeController(err.config.url);
          }
          if (err.message !== "canceled") {
            if (err.response) {
              // err.response.data &&
              //   MessageBox({ message: err.response.data.msg });
            } else {
              MessageBox({ message: err.message });
            }
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
      // const url: string = config.url ? config.url + "_" + params : "";
      const url: string = this.createMapKey(config);
      this.cancelRequest(url);
      const controller = this.createController(url);
      config.signal = controller.signal;
      return config;
    });
  }
  // 添加响应拦截
  addResponseInterceptors() {
    this.instance.interceptors.response.use((config) => {
      const url: string = this.createMapKey(config);
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

  createMapKey(config: AxiosRequestConfig | AxiosResponse["config"]) {
    const params = config.data
      ? JSON.stringify(config.data)
      : JSON.stringify(config.params);
    const url: string = config.url ? config.url + "_" + params : "";
    return url;
  }
}

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: getToken()
  },
};

const instance = new HttpRequest(options);

// instance.addRequestInterceptors();
// instance.addResponseInterceptors();

interface OtherOption extends AxiosRequestConfig {
  hasResData?: boolean; //是否返回响应原始数据
  hasFormData?: boolean; //是否自动转formdata
}

/**
 * @name:$get
 * @description:get请求
 * @author: hanyuchen
 * @date 2022-03-08 14:02:15
 * @params {String} paramsName: url
 * @params { Object} paramsName: 参数
 * @params {AxiosRequestConfig} paramsName: 其他axios参数
 */
const $get = async (url: string, params: Object, others?: OtherOption) => {
  const options: requestOption = {
    url,
    method: "get",
    params,
    others: Object.assign({
      headers: {
        Authorization: getToken()
      },
    }, others),
    // others: others ? others : {},
  };
  const result = await instance.request(options).catch((error: any) => {
    console.log(error);
    throw new Error(error);
  });
  if (others?.hasResData) {
    return result;
  }
  return result ? result[0] : {};
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
const $post = async (url: string, data: Object, others?: OtherOption) => {
  const options: requestOption = {
    url,
    method: "post",
    data,
    others: Object.assign({
      headers: {
        Authorization: getToken()
      },
    }, others),
    // others: others ? others : {},
  };

  if (others.hasFormData) {
    const type_list = ["[object Array]", "[object Object]"];
    const others_formdata: OtherOption = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    Object.assign(options.others, others_formdata);
    const form_data = new FormData();
    for (const [key, value] of Object.entries(options.data)) {
      let _value = value;
      const value_type = Object.prototype.toString.call(value);
      if (type_list.includes(value_type)) {
        _value = JSON.stringify(_value);
      }
      form_data.append(key, _value);
    }
    options.data = form_data;
  }

  const result = await instance.request(options).catch((error: any) => {
    console.log(error);
    throw new Error(error);
  });
  if (others?.hasResData) {
    return result;
  }
  return result ? result[0] : {};
};

export { $get, $post, instance };
