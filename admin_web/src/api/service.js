import axios from "axios";


//封装状态码错误处理函数
const errorHandle = status => {
    switch (status) {
      //登录不成功时跳转到登录页面
      case 401:
        console.log("认证失败,未登录或无权限");
        break;
      case 403:
        //token过期了,清除token存储
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
const proBaseURL = "在生产环境下接口的baseURL";

//创建axios实例
const service = axios.create({
  baseURL: devBaseURL,
  // 配置超时时间
  timeout: 2000
});


//ES6解构赋值，引入cancelToken和isCancel 
const { CancelToken, isCancel } = axios;

//定义一个全局的变量存储不同的url,避免同一页面有多个请求时拦截了正常的请求
  let pending = {};
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
    //成功则返回response里有用的data apiresult from backend
    return response.data
  },
  //失败则进行统一的错误处理
  error => {
    let { response } = error;
    //判断是否为重复请求而出错
    if (isCancel(error)) console.log("请求失败,原因是" + error.message);
    else if (response) {
      errorHandle(response.status);
    }
    //判断客户端有无联网
    if (!window.navigator.onLine) {
      //断网处理：跳转断网页面/提示网络错误等等
      alert("请检查网络是否连接");
    }
    //出错中断promise链
    return new Promise(() => {});
  }
);

//导出封装的aixos
export default service;