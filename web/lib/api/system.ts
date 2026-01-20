import { apiClient } from '@/lib/api-client';

export const systemApi = {
  getTime: () => apiClient<{ time: string }>('/api/time'),
};
