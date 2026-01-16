import { apiClient } from './api-client';

export const systemApi = {
  getTime: () =>
    apiClient<{ time: string }>('/api/time', {
      cache: 'no-store',
    }),
};
