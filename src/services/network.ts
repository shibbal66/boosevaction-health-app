import NetInfo from '@react-native-community/netinfo';
import type { AppDispatch } from '../store';
import { setIsOnline } from '../store/networkSlice';

export const initializeNetworkListener = (dispatch: AppDispatch) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    const isOnline =
      state.isConnected && state.isInternetReachable !== false;
    dispatch(setIsOnline(Boolean(isOnline)));
  });

  return unsubscribe;
};

