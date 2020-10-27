import axios from "axios";

const services = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000
});
// 请求拦截器
services.interceptors.request.use(
  config => {
    // dosomething
    return config;
  },
  err => {
    // dosomething
    return Promise.reject(err);
  }
);
// 响应拦截器
services.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);
// 登陆
const login = params =>
  services
    .post("Login", params)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });

const user = {
  login
};

export default user;
