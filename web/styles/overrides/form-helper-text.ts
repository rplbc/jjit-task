import type { Components, Theme } from '@mui/material/styles';

export const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary,
      fontSize: 10,
      lineHeight: '16px',
      marginLeft: 0,
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    }),
  },
};
