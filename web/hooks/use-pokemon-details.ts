import { useQuery } from '@tanstack/react-query';

import { pokemonApi } from '../lib/api/pokemon';

export function usePokemonDetailsQuery(pokemonName: string | null | undefined) {
  return useQuery({
    queryKey: ['pokemon-details', pokemonName],
    queryFn: () => pokemonApi.getDetails(pokemonName!),
    enabled: !!pokemonName,
  });
}
