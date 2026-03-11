import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { API_BASE_URL } from './config';
import { store } from '../store';
import { logout } from '../store/authSlice';
import { clearAuthState } from '../services/authStorage';

export const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 50000,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const token = state.auth.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(logout());
        try {
          await clearAuthState();
        } catch {
          // ignore storage errors on logout
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const apiClient = createApiClient();

export default apiClient;
