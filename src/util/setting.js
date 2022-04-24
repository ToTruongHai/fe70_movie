//Cấu hình các hằng số hệ thống

import axios from "axios";
import { createBrowserHistory } from "history";

//Domain backend
export const DOMAIN = "https://movienew.cybersoft.edu.vn";
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU";

export const USER_LOGIN = "userLogin";
export const ACCESSTOKEN = "Authorization";
export const GP = "GP01";

//Giúp chuyển hướng trang
export const history = createBrowserHistory();

//Config axios
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ["Authorization"]: "Bearer " + localStorage.getItem(ACCESSTOKEN),
      ["TokenCybersoft"]: TOKEN_CYBERSOFT,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
