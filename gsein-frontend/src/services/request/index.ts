import axios from "axios";
import router from "@/router";

const instance = axios.create({
  timeout: 5000
});

instance.interceptors.request.use(
  (config) => {
    // 在每个请求头中加入token，如果有的话，token存储在localStorage中
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    return config;
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem("token");
          router.push({ path: "/auth/login" });
      }
    }
    return Promise.reject(error.response.data);
  });

export default instance;
