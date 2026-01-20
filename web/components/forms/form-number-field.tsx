'use client';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { OutlinedInput, type TextFieldProps } from '@mui/material';
import { useId } from 'react';

import { useFieldContext } from '@/hooks/form-context';
import { useFormErrorMessage } from '@/hooks/use-form-error-message';

import { FormField } from './form-field';

type FormNumberFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: TextFieldProps['helperText'];
};

export function FormNumberField({ label, placeholder, helperText }: FormNumberFieldProps) {
  const fieldId = useId();
  const field = useFieldContext<number | ''>();
  const errorMessage = useFormErrorMessage();

  const value =
    typeof field.state.value === 'number' && Number.isFinite(field.state.value)
      ? field.state.value
      : null;

  return (
    <BaseNumberField.Root
      value={value}
      onValueChange={(value) => {
        if (value === null || Number.isNaN(value)) {
          field.handleChange('');
          return;
        }

        field.handleChange(value);
      }}
      render={(props) => (
        <FormField
          ref={props.ref}
          label={label}
          error={Boolean(errorMessage)}
          helperText={errorMessage ?? helperText}
          htmlFor={fieldId}
        >
          {props.children}
        </FormField>
      )}
    >
      <BaseNumberField.Input
        id={fieldId}
        render={(props, state) => (
          <OutlinedInput
            inputRef={props.ref}
            name={field.name}
            value={state.inputValue}
            error={Boolean(errorMessage)}
            onBlur={(event) => {
              props.onBlur?.(event);
              field.handleBlur();
            }}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            placeholder={placeholder}
          />
        )}
      />
    </BaseNumberField.Root>
  );
}
