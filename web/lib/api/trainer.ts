export const trainerApi = {
  register: (trainerData: { name: string; age: number; pokemon: string }) =>
    new Promise<{ ok: boolean; data: unknown }>(async (resolve) => {
      await new Promise((r) => setTimeout(r, 500));
      resolve({ ok: true, data: { id: 'trainer-1', ...trainerData } });
    }),
};
