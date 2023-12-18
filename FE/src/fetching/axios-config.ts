import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BE_BASE_URL}`,
  withCredentials: true,
});

export default axiosInstance;
