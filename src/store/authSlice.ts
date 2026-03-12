import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  notificationEnabled: boolean;
  notificationTime: string | null;
  timezone: string | null;
  fcmToken: string | null;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

type SetCredentialsPayload = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<SetCredentialsPayload>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    updateUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.accessToken);

export default authSlice.reducer;
