import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer, { AuthState } from './authSlice';
import networkReducer, { type NetworkState } from './networkSlice';
import toastReducer, { type ToastState } from './toastSlice';

export type RootState = {
  auth: AuthState;
  network: NetworkState;
  toast: ToastState;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    network: networkReducer,
    toast: toastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
