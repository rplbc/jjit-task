'use client';

import { Autocomplete, CircularProgress, OutlinedInput, type TextFieldProps } from '@mui/material';
import { type SyntheticEvent, useId, useState } from 'react';

import { useFieldContext } from '@/hooks/form-context';
import { useDebouncedPokemonSearchQuery } from '@/hooks/use-pokemon-search-query';
import { POKEMON_SEARCH_MIN, type PokemonSummary } from '@/lib/schema/pokemon';

import { FormField } from './form-field';

type FormPokemonAutocompleteProps = {
  label: string;
  placeholder?: string;
  helperText?: TextFieldProps['helperText'];
};

function getFieldErrorMessage(meta: {
  errors?: Array<Record<string, unknown> | string>;
  isTouched?: boolean;
}) {
  if (!meta?.isTouched) {
    return undefined;
  }

  const firstError = meta.errors?.[0];
  if (typeof firstError === 'string') {
    return firstError;
  }

  const nestedErrors = [
    (firstError as { ['pokemon.id']?: string })?.['pokemon.id'],
    (firstError as { ['pokemon.name']?: string })?.['pokemon.name'],
    (firstError as { message?: string })?.message,
  ].filter(Boolean);

  return nestedErrors[0];
}

export function FormPokemonAutocomplete({
  label,
  placeholder,
  helperText,
}: FormPokemonAutocompleteProps) {
  const fieldId = useId();
  const field = useFieldContext<PokemonSummary | null>();

  const value = field.state.value;
  const [inputValue, setInputValue] = useState(value?.name ?? '');
  const [searchValue, setSearchValue] = useState(value?.name ?? '');
  const {
    query: { data: pokemonData, isFetching: pokemonLoading },
    isDebouncing,
  } = useDebouncedPokemonSearchQuery(searchValue);

  const options = pokemonData && pokemonData.ok ? pokemonData.data : [];
  const isLoading =
    pokemonLoading || (searchValue.length >= POKEMON_SEARCH_MIN && isDebouncing);
  const errorMessage = getFieldErrorMessage(field.state.meta);

  const handleChange = (_: SyntheticEvent, selectedValue: PokemonSummary | null) => {
    if (selectedValue) {
      field.handleChange(selectedValue);
      setInputValue(selectedValue.name);
      setSearchValue(selectedValue.name);
      return;
    }

    field.handleChange(null);
    setInputValue('');
    setSearchValue('');
  };

  const handleInputChange = (_: SyntheticEvent, nextValue: string, reason: string) => {
    setInputValue(nextValue);

    if (reason === 'input') {
      setSearchValue(nextValue);
      return;
    }

    if (reason === 'reset') {
      setSearchValue(nextValue);
      return;
    }

    if (reason === 'clear') {
      setSearchValue('');
      field.handleChange(null);
    }
  };

  return (
    <FormField
      label={label}
      htmlFor={fieldId}
      error={Boolean(errorMessage)}
      helperText={errorMessage ?? helperText}
    >
      <Autocomplete
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        getOptionLabel={(option) => {
          if (!option || typeof option === 'string' || Array.isArray(option)) {
            return typeof option === 'string' ? option : '';
          }

          return option.name ?? '';
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        filterOptions={(x) => x}
        loading={isLoading}
        noOptionsText={
          inputValue.length >= POKEMON_SEARCH_MIN
            ? 'No Pokemon found'
            : `Start typing to search (min ${POKEMON_SEARCH_MIN} letters)...`
        }
        fullWidth
        renderInput={(params) => {
          const { InputProps, inputProps } = params;
          const { endAdornment, ...rootInputProps } = InputProps;

          return (
            <OutlinedInput
              {...rootInputProps}
              id={fieldId}
              name={field.name}
              inputProps={{
                ...inputProps,
                onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
                  inputProps.onBlur?.(event);
                  field.handleBlur();
                },
              }}
              endAdornment={<Adornment isLoading={isLoading}>{endAdornment}</Adornment>}
              placeholder={placeholder}
              fullWidth
            />
          );
        }}
      />
    </FormField>
  );
}

function Adornment({ isLoading, children }: React.PropsWithChildren<{ isLoading: boolean }>) {
  return isLoading ? <CircularProgress color="inherit" size={20} sx={{ mr: '10px' }} /> : children;
}
