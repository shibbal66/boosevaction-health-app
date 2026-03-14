import { useCallback, useState } from 'react';
import {
  getVoyageAnalyticsRequest,
  getVoyageRequest,
  patchVoyageLogRequest,
  type GetVoyageParams,
  type PatchVoyageLogPayload,
  type Voyage,
  type VoyageAnalytics,
  type VoyageDay,
} from '../api/voyage';
import { getErrorMessage } from '../api/errors';
import { useAppDispatch, useAppSelector } from '../store';
import { showToast } from '../store/toastSlice';
import { fetchWithCache } from '../api/offline';
import { selectIsOnline } from '../store/networkSlice';
import {
  clearPendingLog,
  getPendingLog,
  setPendingLog,
} from '../services/offlineLogQueue';

type UseVoyageOptions = {
  showToasts?: boolean;
};

const voyageCacheKey = (params?: GetVoyageParams) =>
  params?.limit != null ? `voyage-${params.limit}` : 'voyage';
const VOYAGE_ANALYTICS_CACHE_KEY = 'voyage-analytics';

const useVoyage = (options: UseVoyageOptions = {}) => {
  const { showToasts = true } = options;
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector(selectIsOnline);

  const [voyage, setVoyage] = useState<Voyage | null>(null);
  const [analytics, setAnalytics] = useState<VoyageAnalytics | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [loadingVoyage, setLoadingVoyage] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [logging, setLogging] = useState(false);

  /** Flush pending log (saved while offline) when we're back online. */
  const flushPendingLogIfAny = useCallback(async (): Promise<boolean> => {
    const pending = await getPendingLog();
    if (!pending) return false;
    try {
      await patchVoyageLogRequest(pending);
      await clearPendingLog();
      return true;
    } catch {
      return false;
    }
  }, []);

  const getVoyage = useCallback(
    async (params?: GetVoyageParams): Promise<Voyage | null> => {
      try {
        setLoadingVoyage(true);
        if (isOnline) {
          const flushed = await flushPendingLogIfAny();
          if (flushed && showToasts) {
            dispatch(
              showToast({
                type: 'success',
                message: 'Your saved log was synced.',
              }),
            );
          }
        }
        const result = await fetchWithCache(voyageCacheKey(params), () =>
          getVoyageRequest(params),
        );
        setVoyage(result.data);
        setFromCache(result.fromCache);
        return result.data;
      } catch (error: unknown) {
        const message = getErrorMessage(error, 'Unable to fetch voyage.');
        if (showToasts) {
          dispatch(
            showToast({
              type: 'error',
              message,
            }),
          );
        }
        return null;
      } finally {
        setLoadingVoyage(false);
      }
    },
    [dispatch, isOnline, flushPendingLogIfAny, showToasts],
  );

  const getVoyageAnalytics =
    useCallback(async (): Promise<VoyageAnalytics | null> => {
      try {
        setLoadingAnalytics(true);
        const result = await fetchWithCache(VOYAGE_ANALYTICS_CACHE_KEY, () =>
          getVoyageAnalyticsRequest(),
        );
        setAnalytics(result.data);
        setFromCache(result.fromCache);
        return result.data;
      } catch (error: unknown) {
        const message = getErrorMessage(
          error,
          'Unable to fetch voyage analytics.',
        );
        if (showToasts) {
          dispatch(
            showToast({
              type: 'error',
              message,
            }),
          );
        }
        return null;
      } finally {
        setLoadingAnalytics(false);
      }
    }, [dispatch, showToasts]);

  const getVoyageAll = useCallback(async () => {
    try {
      const [voyageData, analyticsData] = await Promise.all([
        getVoyage(),
        getVoyageAnalytics(),
      ]);

      return { voyage: voyageData, analytics: analyticsData };
    } catch (error) {
      // individual refresh methods already handle toasts
      throw error;
    }
  }, [getVoyage, getVoyageAnalytics]);

  const logVoyage = useCallback(
    async (payload: PatchVoyageLogPayload): Promise<VoyageDay | null> => {
      try {
        setLogging(true);

        if (!isOnline) {
          await setPendingLog(payload);
          setVoyage(prev =>
            prev
              ? {
                  ...prev,
                  days: prev.days.map((day, i) =>
                    i === 0
                      ? {
                          ...day,
                          ...payload,
                          completed: true,
                        }
                      : day,
                  ),
                }
              : prev,
          );
          if (showToasts) {
            dispatch(
              showToast({
                type: 'success',
                message: 'Saved locally. Will sync when you’re back online.',
              }),
            );
          }
          const today = voyage?.days?.[0];
          return today ? { ...today, ...payload, completed: true } : null;
        }

        const loggedDay = await patchVoyageLogRequest(payload);

        setVoyage(prev =>
          prev
            ? {
                ...prev,
                days: prev.days.map(day =>
                  day.date === loggedDay.date ? loggedDay : day,
                ),
              }
            : prev,
        );

        if (showToasts) {
          dispatch(
            showToast({
              type: 'success',
              message: 'Voyage log updated.',
            }),
          );
        }

        return loggedDay;
      } catch (error: unknown) {
        const message = getErrorMessage(error, 'Unable to update voyage log.');
        if (showToasts) {
          dispatch(
            showToast({
              type: 'error',
              message,
            }),
          );
        }
        throw error;
      } finally {
        setLogging(false);
      }
    },
    [dispatch, isOnline, showToasts, voyage?.days],
  );

  return {
    voyage,
    analytics,
    fromCache,
    loadingVoyage,
    loadingAnalytics,
    logging,
    getVoyage,
    getVoyageAnalytics,
    getVoyageAll,
    logVoyage,
  };
};

export default useVoyage;
