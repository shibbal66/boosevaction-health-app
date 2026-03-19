import { getApp } from '@react-native-firebase/app';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  hasPermission,
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
 * Returns `{ enabled: false, token: null }` if the user denies permission or token fetch fails.
 */
export type NotificationPermissionResult = {
  enabled: boolean;
  token: string | null;
};

export const requestNotificationPermissionAndFcmToken =
  async (): Promise<NotificationPermissionResult> => {
    try {
      const msg = getFcmMessaging();
      const authStatus = await requestPermission(msg);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        return { enabled: false, token: null };
      }

      await registerDeviceForRemoteMessages(msg);
      const token = await getToken(msg);

      return { enabled: true, token: token ?? null };
    } catch (e) {
      console.error('Unable to get FCM token:', e);
      return { enabled: false, token: null };
    }
  };

/**
 * Check current notification authorization status without prompting the user.
 */
export const isNotificationPermissionEnabled = async (): Promise<boolean> => {
  try {
    const authStatus = await hasPermission(getFcmMessaging());
    return (
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL
    );
  } catch (e) {
    console.error('Unable to check notification permission:', e);
    return false;
  }
};

/**
 * Backwards-compatible helper used elsewhere: returns token only.
 */
export const ensureFcmToken = async (): Promise<string | null> => {
  const { token } = await requestNotificationPermissionAndFcmToken();
  return token;
};
