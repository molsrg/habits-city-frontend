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
      timeout: 5000,
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

        // Check timeout server
        if (error.code === 'ECONNABORTED') {
          toast.add({ color: 'red', title: 'Request timed out. Please try again.' });
          return Promise.reject(error);
        }

        // Handling 401 errors
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;

          await tokenStore.updateToken();
          error.config.headers.Authorization = `Bearer ${tokenStore.getToken}`;

          return this.client(error.config);
        }

        // Handling other errors
        toast.add({ color: 'red', title: error.response?.data?.message || 'Unknown error' });
        return Promise.reject(error.response?.data || error);
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

  async patch<T>(url: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      headers,
    };
    return this.client.patch<T>(url, data, config);
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

const authService = new ApiService('https://91.108.246.191/auth-service');
const userService = new ApiService('https://91.108.246.191/user-service');
const friendService = new ApiService('https://91.108.246.191/user-service');

export { authService, friendService, userService };
