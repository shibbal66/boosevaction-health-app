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

function createToastId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: {
      prepare(payload: ShowToastPayload) {
        return { payload: { ...payload, id: createToastId() } };
      },
      reducer(state, action: PayloadAction<ToastValue>) {
        state.current = action.payload;
      },
    },
    clearToast(state) {
      state.current = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;

export const selectCurrentToast = (state: { toast: ToastState }) =>
  state.toast.current;

export default toastSlice.reducer;

