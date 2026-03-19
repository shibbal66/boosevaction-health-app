import { getApp } from '@react-native-firebase/app';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  onMessage,
  registerDeviceForRemoteMessages,
  requestPermission,
} from '@react-native-firebase/messaging';
import type { Store } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { showToast } from '../store/toastSlice';

function getFcmMessaging() {
  return getMessaging(getApp());
}

/**
 * Subscribe to foreground messages once per app lifetime.
 * When a message is received in foreground, shows it via the app toast.
 * Returns the unsubscribe function from `onMessage`.
 */
export const initFcmForegroundMessageHandler = (store: Store<RootState>) => {
  return onMessage(getFcmMessaging(), async remoteMessage => {
    const title = remoteMessage.notification?.title;
    const body = remoteMessage.notification?.body;
    const message =
      [title, body].filter(Boolean).join(' — ') || 'New notification';
    store.dispatch(showToast({ type: 'info', message }));
  });
};

/**
 * Request notification permission (iOS) and fetch the FCM token (if authorized).
 * Returns `null` if the user denies permission or token fetch fails.
 */
export const ensureFcmToken = async (): Promise<string | null> => {
  try {
    const msg = getFcmMessaging();
    const authStatus = await requestPermission(msg);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      return null;
    }

    await registerDeviceForRemoteMessages(msg);
    const token = await getToken(msg);
    return token;
  } catch (e) {
    console.error('Unable to get FCM token:', e);
    return null;
  }
};
