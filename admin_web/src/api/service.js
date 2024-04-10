import axios from "axios";
import { message} from "antd"


const errorHandle = status => {
    switch (status) {
      case 401:
        console.log("认证失败,未登录或无权限");
        break;
      case 403:
        console.log("token校验失败");
        break;
      case 404:
        console.log("请求的资源不存在");
        break;
      default:
        console.log("请求出错,状态码为:" + status);
        break;
    }
  };


  
// axios二次封装
const devBaseURL = "https://localhost:7055/api";
const proBaseURL = 'https://www.luckydogadmin.com/api';
//在vue的config文件夹下可以看开发环境和生产环境的名称,通常为development和production
const baseURL = process.env.NODE_ENV =="development" ? devBaseURL : proBaseURL

//创建axios实例
const service = axios.create({
  baseURL: baseURL,
  // 配置超时时间
  timeout: 2000
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const url = config.url
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  })
//设置axios的响应拦截器
service.interceptors.response.use(
  response => {
     let {message:msg,data, success } = response 

     console.log(response)
     if((data=="401"||data=="403")&&success==false){
          message.error(msg)
     }
    return response.data
  },
  error => {
    let { response } = error;

      errorHandle(response.status);

    if (!window.navigator.onLine) {
  
    }
    return new Promise(() => {});
  }
);

//导出封装的aixos
export default service;