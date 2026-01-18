import type { Components, Theme } from '@mui/material/styles';

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    elevation24: ({ theme }) => ({
      boxShadow: theme.appShadows.dialog,
    }),
  },
};
