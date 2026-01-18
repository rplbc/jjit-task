import { useDebouncedValue } from '@tanstack/react-pacer/debouncer';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { pokemonApi } from '../lib/api/pokemon';

export function usePokemonSearchQuery(pokemonName: string | null | undefined) {
  const trimmedName = pokemonName?.trim() ?? '';

  return useQuery({
    queryKey: ['pokemon', trimmedName],
    queryFn: () => pokemonApi.searchByName(trimmedName),
    enabled: trimmedName.length > 0,
    placeholderData: keepPreviousData,
  });
}

export function useDebouncedPokemonSearchQuery(pokemonName: string | null | undefined) {
  const queryClient = useQueryClient();
  const trimmedName = pokemonName?.trim() ?? '';
  const cachedResult = queryClient.getQueryData(['pokemon', trimmedName]);
  const hasCache = Boolean(cachedResult);
  const [debouncedName, debouncer] = useDebouncedValue(trimmedName, { wait: 300 }, (state) => ({
    isPending: state.isPending,
  }));
  const effectiveName = hasCache ? trimmedName : debouncedName;

  const query = useQuery({
    queryKey: ['pokemon', effectiveName],
    queryFn: () => pokemonApi.searchByName(effectiveName),
    enabled: effectiveName.length > 2,
  });

  return {
    ...query,
    isDebouncing: !hasCache && debouncer.state.isPending,
  };
}
