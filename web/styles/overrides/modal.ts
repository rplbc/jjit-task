import type { Components, Theme } from '@mui/material/styles';

export const MuiModal: Components<Theme>['MuiModal'] = {
  styleOverrides: {
    backdrop: ({ theme }) => ({
      backgroundColor: theme.palette.action.disabledBackground,
    }),
  },
};
