import type { Components, Theme } from '@mui/material/styles';

export const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: () => ({
      borderRadius: 16,
      padding: '4px 8px',
      height: 28,
    }),
    label: {
      padding: 0,
    },
  },
};
