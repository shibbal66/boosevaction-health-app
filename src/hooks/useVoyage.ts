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
import { useAppDispatch } from '../store';
import { showToast } from '../store/toastSlice';

type UseVoyageOptions = {
  showToasts?: boolean;
};

const useVoyage = (options: UseVoyageOptions = {}) => {
  const { showToasts = true } = options;
  const dispatch = useAppDispatch();

  const [voyage, setVoyage] = useState<Voyage | null>(null);
  const [analytics, setAnalytics] = useState<VoyageAnalytics | null>(null);
  const [loadingVoyage, setLoadingVoyage] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [logging, setLogging] = useState(false);

  const getVoyage = useCallback(
    async (params?: GetVoyageParams): Promise<Voyage | null> => {
      try {
        setLoadingVoyage(true);
        const data = await getVoyageRequest(params);
        setVoyage(data);
        return data;
      } catch (error: any) {
      const message = error?.message || 'Unable to fetch voyage.';
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
    [dispatch, showToasts],
  );

  const getVoyageAnalytics =
    useCallback(async (): Promise<VoyageAnalytics | null> => {
      try {
        setLoadingAnalytics(true);
        const data = await getVoyageAnalyticsRequest();
        setAnalytics(data);
        return data;
      } catch (error: any) {
        const message = error?.message || 'Unable to fetch voyage analytics.';
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
    async (payload: PatchVoyageLogPayload): Promise<VoyageDay> => {
      try {
        setLogging(true);
        console.log('payload', payload);
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
      } catch (error: any) {
        const message = error?.message || 'Unable to update voyage log.';
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
    [dispatch, showToasts],
  );

  return {
    voyage,
    analytics,
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
