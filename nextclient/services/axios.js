import axios from "axios";
import { isServer } from "../lib/isServer";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "Application/json",
    ...axios.defaults.headers,
  },
});

if (!isServer) {
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;

  instance.interceptors.request.use(
    (config) => {
      //const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  /*instance.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
      }

      Promise.reject(error);
    }
  );*/
}
