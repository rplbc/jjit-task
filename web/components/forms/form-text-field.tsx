'use client';

import { OutlinedInput, type TextFieldProps } from '@mui/material';
import { useId } from 'react';

import { useFieldContext } from '@/hooks/form-context';

import { FormField } from './form-field';

type FormTextFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: TextFieldProps['helperText'];
};

export function FormTextField({ label, placeholder, helperText }: FormTextFieldProps) {
  const fieldId = useId();
  const field = useFieldContext<string>();

  const errorMessage = field.state.meta.isTouched
    ? field.state.meta.errors?.[0]?.message
    : undefined;

  return (
    <FormField
      label={label}
      htmlFor={fieldId}
      error={Boolean(errorMessage)}
      helperText={errorMessage ?? helperText}
    >
      <OutlinedInput
        id={fieldId}
        name={field.name}
        value={field.state.value}
        onChange={(event) => {
          field.handleChange(event.target.value);
        }}
        onBlur={() => {
          field.handleBlur();
        }}
        placeholder={placeholder}
      />
    </FormField>
  );
}
