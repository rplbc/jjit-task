import { Result } from '../api-client';
import type { PokemonDetails } from '../types';

export const pokemonApi = {
  searchByName: (name: string) =>
    new Promise<Result<string[]>>(async (resolve) => {
      await new Promise((r) => setTimeout(r, 500));
      resolve({
        ok: true,
        data: ['Bulbasaur', 'Bulbasaur2', 'Bulbasaur3', 'Bulbasaur4'],
      });
    }),
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
