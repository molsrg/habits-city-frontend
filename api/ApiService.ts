import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import { useTokenStore } from '@/store/token.store';

class ApiService {
  private client: AxiosInstance;

  constructor(private baseURL: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((config: AxiosRequestConfig) => {
      const tokenStore = useTokenStore();
      if (tokenStore.getToken) {
        config.headers.Authorization = `Bearer ${tokenStore.getToken}`;
      }
      return config;
    });
  }

  async get<T>(url: string, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      params,
    };
    return this.client.get<T>(url, config);
  }

  async post<T>(url: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      headers,
    };
    return this.client.post<T>(url, data, config);
  }

  async postFormData<T>(url: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    headers['Content-Type'] = 'multipart/form-data';
    return this.client.post<T>(url, data, { headers });
  }

  async put<T>(url: string, data: Record<string, any> = {}): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data);
  }

  async delete<T>(url: string, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      data: params,
    };
    return this.client.delete<T>(url, config);
  }
}

const authService = new ApiService('http://localhost:5000');
const userService = new ApiService('http://localhost:5001');

export { authService, userService };
