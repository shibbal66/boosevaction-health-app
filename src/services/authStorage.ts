import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthState } from '../store/authSlice';

const AUTH_STORAGE_KEY = '@boosevacation/auth';

export const saveAuthState = async (state: AuthState) => {
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
};

export const loadAuthState = async (): Promise<AuthState | null> => {
  const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as AuthState;
  } catch {
    return null;
  }
};

export const clearAuthState = async () => {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
};

