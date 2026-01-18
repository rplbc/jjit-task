'use client';

import { Autocomplete, CircularProgress, OutlinedInput, type TextFieldProps } from '@mui/material';
import { useId, useState } from 'react';

import { useFieldContext } from '@/hooks/form-context';
import { useDebouncedPokemonSearchQuery } from '../../hooks/use-pokemon-search-query';
import { FormField } from './form-field';

type FormPokemonAutocompleteProps = {
  label: string;
  placeholder?: string;
  helperText?: TextFieldProps['helperText'];
};

export function FormPokemonAutocomplete({
  label,
  placeholder,
  helperText,
}: FormPokemonAutocompleteProps) {
  const fieldId = useId();
  const field = useFieldContext<string>();
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const {
    data: pokemonData,
    isLoading: pokemonLoading,
    isDebouncing,
  } = useDebouncedPokemonSearchQuery(searchValue);

  const errorMessage = field.state.meta.isTouched
    ? field.state.meta.errors?.[0]?.message
    : undefined;

  const options = pokemonData && pokemonData.ok ? pokemonData.data : [];
  const isLoading = pokemonLoading || isDebouncing;

  return (
    <FormField
      label={label}
      htmlFor={fieldId}
      error={Boolean(errorMessage)}
      helperText={errorMessage ?? helperText}
    >
      <Autocomplete
        value={field.state.value}
        onChange={(_, v) => {
          const nextValue = v ?? '';
          field.handleChange(nextValue);
        }}
        inputValue={inputValue}
        onInputChange={(_, v, reason) => {
          setInputValue(v);
          if (reason === 'input') {
            setSearchValue(v);
            return;
          }

          if (reason === 'clear') {
            setSearchValue('');
          }
        }}
        options={options}
        filterOptions={(x) => x}
        loading={isLoading}
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
              endAdornment={
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} sx={{ mr: '10px' }} />
                  ) : (
                    endAdornment
                  )}
                </>
              }
              placeholder={placeholder}
              fullWidth
            />
          );
        }}
        noOptionsText={inputValue ? 'No Pokemon found' : 'Start typing to search...'}
      />
    </FormField>
  );
}
