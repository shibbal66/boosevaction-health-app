import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PatchVoyageLogPayload } from '../api/voyage';

const PENDING_LOG_KEY = '@boosevacation/pending-log';

export async function getPendingLog(): Promise<PatchVoyageLogPayload | null> {
  const raw = await AsyncStorage.getItem(PENDING_LOG_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PatchVoyageLogPayload;
  } catch {
    return null;
  }
}

export async function setPendingLog(
  payload: PatchVoyageLogPayload,
): Promise<void> {
  await AsyncStorage.setItem(PENDING_LOG_KEY, JSON.stringify(payload));
}

export async function clearPendingLog(): Promise<void> {
  await AsyncStorage.removeItem(PENDING_LOG_KEY);
}
