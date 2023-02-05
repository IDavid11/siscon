import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "Application/json",
    ...axios.defaults.headers,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
    config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {    
    Promise.reject(error)
  }
);

instance.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {  
    if (error.response.status === 401) {
      localStorage.removeItem('token')
    }
    
    Promise.reject(error)
  }
  );