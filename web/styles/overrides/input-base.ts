import type { Components, Theme } from '@mui/material/styles';

export const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  styleOverrides: {
    input: ({ theme }) => ({
      '&::placeholder': {
        color: theme.palette.text.secondary,
        opacity: 1,
      },
    }),
  },
};
