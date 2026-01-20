'use client';

import { Autocomplete, CircularProgress, OutlinedInput, type TextFieldProps } from '@mui/material';
import React, { useId, useState } from 'react';

import { useFieldContext } from '@/hooks/form-context';
import { useFormErrorMessage } from '@/hooks/use-form-error-message';
import { usePokemonSearchQuery } from '@/hooks/use-pokemon-search-query';
import { type PokemonSummary } from '@/lib/schema/pokemon';

import { FormField } from './form-field';

type FormPokemonAutocompleteProps = {
  label: string;
  placeholder?: string;
  helperText?: TextFieldProps['helperText'];
};

type Value = PokemonSummary | null;
type TAutocomplete = React.ComponentProps<typeof Autocomplete<Value>>;

export function FormPokemonAutocomplete({
  label,
  placeholder,
  helperText,
}: FormPokemonAutocompleteProps) {
  const fieldId = useId();
  const field = useFieldContext<Value>();
  const errorMessage = useFormErrorMessage();

  const value = field.state.value;
  const [inputValue, setInputValue] = useState(value?.name ?? '');
  const [searchValue, setSearchValue] = useState(value?.name ?? '');
  const {
    query: { data },
    isLoading,
    correctName,
  } = usePokemonSearchQuery(searchValue);

  const options = data?.ok ? data.data : [];

  const handleChange: TAutocomplete['onChange'] = (_, selected) => {
    field.handleChange(selected);
    setInputValue(selected?.name ?? '');
  };

  const handleInputChange: TAutocomplete['onInputChange'] = (_, nextValue, reason) => {
    setInputValue(nextValue);

    // to keep the previous search results
    // don't set search on reset, clear or selectOption
    if (reason === 'input') {
      setSearchValue(nextValue);
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
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, v) => option.id === v.id}
        filterOptions={(x) => x}
        loading={isLoading}
        noOptionsText={
          correctName ? 'No Pokemon found' : `Start typing to search (min 2 letters)...`
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
