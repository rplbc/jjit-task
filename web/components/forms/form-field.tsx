import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  htmlFor: string;
  helperText?: React.ReactNode;
  children: ReactNode;
} & React.ComponentProps<typeof FormControl>;

export function FormField({ label, htmlFor, children, helperText, ...props }: FormFieldProps) {
  return (
    <FormControl fullWidth {...props}>
      {label && (
        <FormLabel htmlFor={htmlFor} sx={{ mb: '2px' }}>
          {label}
        </FormLabel>
      )}
      {children}
      {helperText && <FormHelperText sx={{ mt: '2px' }}>{helperText}</FormHelperText>}
    </FormControl>
  );
}
