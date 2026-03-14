import apiClient from './client';
import { LOGIN_URL, SIGNUP_URL } from '../utils/apiUrls';

export type ApiResponseData<T> = {
  success: boolean;
  data: T;
};

export type ApiResponseMessage = {
  success: boolean;
  message: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    notificationEnabled: boolean;
    notificationTime: string | null;
    timezone: string | null;
    fcmToken: string | null;
  };
};

export const loginRequest = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiResponseData<LoginResponse>>(
    LOGIN_URL,
    { email, password },
  );
  return response.data.data;
};

export type SignupResponse = ApiResponseMessage;

export const signupRequest = async (
  name: string,
  email: string,
  password: string,
  timezone: string | null,
): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>(SIGNUP_URL, {
    name,
    email,
    password,
    timezone,
  });
  return response.data;
};
