import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  token: null,
  isLoading: false,
};

type SetTokenPayload = {
  token: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<SetTokenPayload>) {
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.token);

export default authSlice.reducer;
