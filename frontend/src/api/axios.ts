import axios from "axios";
import {toast} from "react-hot-toast";
const api = axios.create({
  baseURL: "http://127.0.0.1/api",
  headers: {
    Accept: "application/json",
  }, 
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;

    if (data?.message) {
      toast.error(data.message);
    } else {
      toast.error('Network error');
    }

    return Promise.reject(error);
  }
);
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default api;
