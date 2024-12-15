import axios from "axios";
import Qs from "qs";
//qs.stringify 将对象转化为url字符串模式    {name: zs, age: 18} ==> ?name=zs&age=18
// qs.parse 将url字符串转化成对象

// 导入data
import { transParams } from './data'

// 引入弹框
import { MessageBox } from "element-ui";
import store from "@/store";

console.log(process.env.VUE_APP_BASE_API, "开发环境")

let BASE_URL = process.env.VUE_APP_BASE_API;

// 弹窗标识符
let flag = true

// 创建一个axios实例

const service = axios.create({
  // 配置接口前缀
  baseURL: BASE_URL,
  // 设置超时时间
  timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log(config, "================")
    // 设置请求头
    let token = "Bearer " + localStorage.getItem("token");
    // 不是登录的时候
    if (token && config.url != "/login" && config.url != "/captchaImage") {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: token
      };
    }

    // get请求参数默认放params里  post默认放data里
    if (config.method == "get") {
      // 序列化参数 通常情况下
      // config.paramsSerializer = function(params) {
      //   return Qs.stringify(params);
      // };

      // 变态情况下用
      // dateRange[0]: 2024-11-11 12:00:00
      // dateRange[1]: 2024-12-25 12:00:00
      // params[beginTime]: 2024-11-11 12:00:00
      // params[endTime]: 2024-12-25 12:00:00
      if (config.params) {
        // /clue/list?name=zs&params[beginTime]=2024&
        let url = config.url + "?" + transParams(config.params)
        // 去掉最后一个 &
        url = url.slice(0, -1)
        // 清除params里的参数
        config.params = {}
        config.url = url

      
      }
      // [xxx,xxx]
      // startTime: xxx
      // endTime: xxx

    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截器
service.interceptors.response.use(res => {
  if (res.status == 200 && res.data.code == 200) {
    flag = true
    return res.data;
    // 如果报401
  } else if (res.data.code == 401) {
    if (flag) {
        MessageBox({
            title: "提示",
            message: "您的登录已过期，请重新登录",
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false
          }).then(() => {
            // 送去登录
            store.dispatch('user/outLogin')
          });
          flag = false
    }
    
    return res.data;
  }else if (res.request.responseType == "blob") {
    return res.data
  }else {
    return Promise.reject(res.data);
  }
  // console.log(res)
});

export default service;
