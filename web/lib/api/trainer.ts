import { apiClient } from '../api-client';
import type { Trainer } from '../schema/trainer';

type TrainerRegistrationResponse = Trainer & {
  id: string;
};

export const trainerApi = {
  register: (trainerData: Trainer) =>
    apiClient<TrainerRegistrationResponse>('/api/trainer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trainerData),
    }),
};
