import { useQuery } from '@tanstack/react-query';

import { pokemonApi } from '../lib/api/pokemon';

export function usePokemonDetailsQuery(pokemonId: number | null | undefined) {
  return useQuery({
    queryKey: ['pokemon-details', pokemonId],
    queryFn: () => pokemonApi.getDetails(pokemonId!),
    enabled: typeof pokemonId === 'number' && pokemonId > 0,
  });
}
