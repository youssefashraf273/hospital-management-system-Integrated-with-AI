import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const authAxios = axios.create({
  baseURL: baseUrl,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});
