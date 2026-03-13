import axios from 'axios';

/**
 * Normalized API error for consistent handling.
 * Axios puts server message in response.data.message (or .error); we surface that.
 */
export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};

/**
 * Extract a user-facing message from an unknown error.
 * Handles Axios errors (response.data.message) and standard Error.
 */
export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong',
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data === 'object' && 'message' in data && typeof (data as { message: unknown }).message === 'string') {
      return (data as { message: string }).message;
    }
    if (error.message) {
      return error.message;
    }
    if (error.response?.status === 401) {
      return 'Session expired. Please log in again.';
    }
    if (error.response?.status && error.response.status >= 500) {
      return 'Server error. Please try again later.';
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
