import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createInstance = (baseURL: string, config?: AxiosRequestConfig): AxiosInstance =>
  axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    ...config,
  });
