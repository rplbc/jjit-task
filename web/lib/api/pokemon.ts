import { apiClient, Result } from '../api-client';
import type { PokemonDetails } from '../types';

export const pokemonApi = {
  searchByName: (q: string) =>
    apiClient<string[]>(`/api/search?q=${encodeURIComponent(q)}`),
  getDetails: (id: string) =>
    new Promise<Result<PokemonDetails>>(async (resolve) => {
      await new Promise((r) => setTimeout(r, 500));
      resolve({
        ok: true,
        data: {
          id: Number(id),
          name: 'Pikachu',
          base_experience: 112,
          img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          types: ['electric'],
        },
      });
    }),
};
