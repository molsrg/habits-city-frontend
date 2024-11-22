import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import { useLocaleStore } from '@/store/locale.store';
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
      const localeStore = useLocaleStore();

      config.headers['X-Locale-Language'] = localeStore.locale;
      if (tokenStore.getToken) {
        config.headers.Authorization = `Bearer ${tokenStore.getToken}`;
      }

      return config;
    });

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.config.method === 'post') {
          const toast = useToast();
          toast.add({ color: 'green', title: response.data.message });
        }
        return response.data;
      },
      async (error) => {
        const toast = useToast();
        const tokenStore = useTokenStore();

        if (error.response && error.response.status === 401) {
          await tokenStore.updateToken();
          const newToken = tokenStore.getToken();
          if (newToken) {
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
          }
          console.log(newToken);
          return this.client.request(error.config);
        } else {
          toast.add({ color: 'red', title: error.response.data.message });
          return Promise.reject(error.response.data);
        }
      },
    );
  }

  async get<T>(url: string, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      params,
      withCredentials: true,
    };
    return this.client.get<T>(url, config);
  }

  async post<T>(url: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      headers,
      withCredentials: true,
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
const friendService = new ApiService('http://localhost:5001');

export { authService, friendService, userService };
