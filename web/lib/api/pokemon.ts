import { apiClient } from '../api-client';
import type { PokemonDetails, PokemonSummary } from '../schema/pokemon';

export const pokemonApi = {
  searchByName: (q: string) =>
    apiClient<PokemonSummary[]>(`/api/search?q=${encodeURIComponent(q)}`),
  getDetails: (id: number) =>
    apiClient<PokemonDetails>(`/api/pokemon?id=${encodeURIComponent(id)}`),
};
