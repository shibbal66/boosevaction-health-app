import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export type CachedResult<T> = {
  data: T;
  fromCache: boolean;
};

const buildCacheKey = (key: string) => `@boosevacation/cache/${key}`;

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<CachedResult<T>> {
  const cacheKey = buildCacheKey(key);
  const netState = await NetInfo.fetch();
  const isOnline = netState.isConnected && netState.isInternetReachable !== false;

  if (!isOnline) {
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached) as T;
      return { data: parsed, fromCache: true };
    }

    throw new Error('Offline and no cached data available');
  }

  try {
    const data = await fetcher();
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    return { data, fromCache: false };
  } catch (error) {
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached) as T;
      return { data: parsed, fromCache: true };
    }

    throw error;
  }
}

