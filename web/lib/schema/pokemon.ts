import { z } from 'zod';

export const POKEMON_ID_MIN = 1;
export const POKEMON_NAME_MIN = 1;
export const POKEMON_SEARCH_MIN = 2;

export const pokemonSummarySchema = z.object({
  id: z.number().int().min(POKEMON_ID_MIN),
  name: z.string().min(POKEMON_NAME_MIN),
});

export type PokemonSummary = z.infer<typeof pokemonSummarySchema>;

export const pokemonDetailsSchema = pokemonSummarySchema.extend({
  base_experience: z.number().int().nonnegative(),
  img: z.string().nullable(),
  types: z.array(z.string()),
});

export type PokemonDetails = z.infer<typeof pokemonDetailsSchema>;
