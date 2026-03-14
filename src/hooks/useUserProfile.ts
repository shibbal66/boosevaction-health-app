import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  getCurrentUserRequest,
  patchCurrentUserRequest,
  type PatchCurrentUserPayload,
} from '../api/user';
import { getErrorMessage } from '../api/errors';
import { updateUser } from '../store/authSlice';
import { showToast } from '../store/toastSlice';

type UseUserProfileOptions = {
  showToasts?: boolean;
};

const useUserProfile = (options: UseUserProfileOptions = {}) => {
  const { showToasts = true } = options;
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const getUserProfile = useCallback(
    async () => {
      try {
        setLoading(true);
        const freshUser = await getCurrentUserRequest();
        dispatch(updateUser(freshUser));
        return freshUser;
      } catch (error: unknown) {
        const message = getErrorMessage(
          error,
          'Unable to fetch user profile.',
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
        setLoading(false);
      }
    },
    [dispatch, showToasts],
  );

  const patchUser = useCallback(
    async (payload: PatchCurrentUserPayload) => {
      try {
        setUpdating(true);
        const updated = await patchCurrentUserRequest(payload);
        dispatch(updateUser(updated));
        if (showToasts) {
          dispatch(
            showToast({
              type: 'success',
              message: 'Profile updated successfully.',
            }),
          );
        }
        return updated;
      } catch (error: unknown) {
        const message = getErrorMessage(error, 'Unable to update profile.');
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
        setUpdating(false);
      }
    },
    [dispatch, showToasts],
  );

  return {
    user,
    loading,
    updating,
    getUserProfile,
    patchUser,
  };
};

export default useUserProfile;

