import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'info';

export type ToastValue = {
  id: number;
  type: ToastType;
  message: string;
};

export type ToastState = {
  current: ToastValue | null;
};

const initialState: ToastState = {
  current: null,
};

type ShowToastPayload = {
  type: ToastType;
  message: string;
};

let toastIdCounter = 0;

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<ShowToastPayload>) {
      toastIdCounter += 1;
      state.current = {
        id: toastIdCounter,
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    clearToast(state) {
      state.current = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;

