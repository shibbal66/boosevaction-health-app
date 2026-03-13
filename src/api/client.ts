import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { API_BASE_URL } from './config';
import { REFRESH_URL } from '../utils/apiUrls';
import type { LoginResponse } from './auth';
import { store } from '../store';
import { setCredentials, logout } from '../store/authSlice';
import { clearAuthState, saveAuthState } from '../services/authStorage';

/** Call refresh endpoint without going through apiClient (avoids 401 loop). */
async function refreshAuth(
  refreshToken: string,
): Promise<LoginResponse | null> {
  try {
    const baseURL = API_BASE_URL;
    const { data } = await axios.post<{
      success: boolean;
      data: LoginResponse;
    }>(`${baseURL}${REFRESH_URL}`, { refreshToken }, { timeout: 15000 });
    if (data?.success && data?.data) {
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

let refreshPromise: Promise<LoginResponse | null> | null = null;

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
      const status = error.response?.status;
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (status !== 401 || !originalRequest || originalRequest._retry) {
        return Promise.reject(error);
      }

      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        store.dispatch(logout());
        try {
          await clearAuthState();
        } catch {
          // ignore storage errors on logout
        }
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAuth(refreshToken);
      }

      const newAuth = await refreshPromise;
      refreshPromise = null;

      if (!newAuth) {
        store.dispatch(logout());
        try {
          await clearAuthState();
        } catch {
          // ignore
        }
        return Promise.reject(error);
      }

      store.dispatch(
        setCredentials({
          accessToken: newAuth.accessToken,
          refreshToken: newAuth.refreshToken,
          user: newAuth.user,
        }),
      );
      try {
        await saveAuthState({
          accessToken: newAuth.accessToken,
          refreshToken: newAuth.refreshToken,
          user: newAuth.user,
        });
      } catch {
        // non-fatal; store is updated
      }

      originalRequest.headers.Authorization = `Bearer ${newAuth.accessToken}`;
      return instance(originalRequest);
    },
  );

  return instance;
};

const apiClient = createApiClient();

export default apiClient;
