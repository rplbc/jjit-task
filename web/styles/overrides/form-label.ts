import type { Components, Theme } from '@mui/material/styles';

export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: {
      color: 'inherit',
      fontSize: 12,
      '&.Mui-focused': {
        color: 'inherit',
      },
      '&.Mui-error': {
        color: 'inherit',
      },
    },
  },
};
