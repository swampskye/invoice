import axios from "axios";
import { getToken, removeToken } from "../../utils/token";
import router from "../../router";

// axios

// 1. root domain configuration
// 2. timeout
// 3. interceptor

const request = axios.create({
  baseURL: "http://localhost:9999",
  timeout: 5000,
});

request.interceptors.request.use(
  (config: any) => {
    // inject token
    const token = getToken();

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: any) => {
    // console.log("errorrrrrrrr");
    // console.dir(error);

    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { request };