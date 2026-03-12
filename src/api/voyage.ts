import apiClient from './client';

export type VoyageMood = 'TERRIBLE' | 'BAD' | 'OK' | 'GOOD' | 'GREAT';

export type VoyageDay = {
  id: string;
  voyageId: string;
  date: string;
  alcohol: boolean;
  caffeine: boolean;
  food: boolean;
  mood: VoyageMood | null;
  completed: boolean;
};

export type Voyage = {
  id: string;
  userId: string;
  startDate: string;
  days: VoyageDay[];
};

type VoyageResponse = {
  success: boolean;
  data: Voyage;
};

export type PatchVoyageLogPayload = {
  alcohol: boolean;
  caffeine: boolean;
  food: boolean;
  mood: VoyageMood;
};

type VoyageLogResponse = {
  success: boolean;
  data: VoyageDay;
};

export type VoyageAnalytics = {
  streak: number;
  checkedIn: number;
  alcoholFree: number;
  averageMood: number;
  totalDays: number;
};

type VoyageAnalyticsResponse = {
  success: boolean;
  data: VoyageAnalytics;
};

export const getVoyageRequest = async (): Promise<Voyage> => {
  const response = await apiClient.get<VoyageResponse>('/voyage');
  return response.data.data;
};

export const patchVoyageLogRequest = async (
  payload: PatchVoyageLogPayload,
): Promise<VoyageDay> => {
  const response = await apiClient.patch<VoyageLogResponse>(
    '/voyage/log',
    payload,
  );
  return response.data.data;
};

export const getVoyageAnalyticsRequest = async (): Promise<VoyageAnalytics> => {
  const response =
    await apiClient.get<VoyageAnalyticsResponse>('/voyage/analytics');
  return response.data.data;
};

