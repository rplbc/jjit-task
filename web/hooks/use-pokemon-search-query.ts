import { useDebouncedValue } from '@tanstack/react-pacer/debouncer';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { pokemonApi } from '@/lib/api/pokemon';
import { POKEMON_SEARCH_MIN } from '@/lib/schema/pokemon';

const DEBOUNCE_MS = 300;
const schema = z.string().trim().min(POKEMON_SEARCH_MIN);

export function usePokemonSearchQuery(pokemonName: string | null | undefined) {
  const [debouncedName, debouncer] = useDebouncedValue(
    pokemonName,
    { wait: DEBOUNCE_MS },
    (state) => ({
      isPending: state.isPending,
    }),
  );
  const { success: enabled, data: name } = schema.safeParse(debouncedName);

  // consider persistent query client for caching across the app
  const query = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => pokemonApi.searchByName(name as string),
    enabled,
  });

  return {
    query,
    isDebouncing: enabled && debouncer.state.isPending,
    isLoading: query.isFetching,
    correctName: enabled,
  };
}
