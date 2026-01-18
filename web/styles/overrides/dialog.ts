import type { Components, Theme } from '@mui/material/styles';

export const MuiDialog: Components<Theme>['MuiDialog'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: theme.appShadows.dialog,
    }),
  },
};
