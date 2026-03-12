import apiClient from './client';
import type { AuthUser } from '../store/authSlice';

type UserResponse = {
  success: boolean;
  data: AuthUser;
};

export type PatchCurrentUserPayload = Partial<{
  name: string;
  notificationEnabled: boolean;
  notificationTime: string | null;
  timezone: string | null;
  fcmToken: string | null;
}>;

export const getCurrentUserRequest = async (): Promise<AuthUser> => {
  const response = await apiClient.get<UserResponse>('/user/me');
  return response.data.data;
};

export const patchCurrentUserRequest = async (
  payload: PatchCurrentUserPayload,
): Promise<AuthUser> => {
  const response = await apiClient.patch<UserResponse>('/user/me', payload);
  return response.data.data;
};

