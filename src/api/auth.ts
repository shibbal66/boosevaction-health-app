import apiClient from './client';
import { LOGIN_URL, SIGNUP_URL } from '../utils/apiUrls';

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

export const loginRequest = async (email: string, password: string) => {
  const response = await apiClient.post<{
    success: boolean;
    data: LoginResponse;
  }>(LOGIN_URL, { email, password });

  return response.data.data;
};

export const signupRequest = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await apiClient.post<{
    success: boolean;
    message: string;
  }>(SIGNUP_URL, {
    name,
    email,
    password,
  });

  return response.data;
};
