import type { Components, Theme } from '@mui/material/styles';

export const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    disableFocusRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: 'none',
      boxShadow: 'none',
      padding: '10px 24px',
      minHeight: 40,
      '&.Mui-focusVisible': {
        boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
      },
    }),
    containedPrimary: ({ theme }) => ({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: 'none',
      },
      '&.Mui-focusVisible': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
      },
    }),
  },
  variants: [
    {
      props: { variant: 'soft' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.grey[400],
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        minHeight: 40,
        padding: '10px 24px',
        '&:hover': {
          backgroundColor: theme.palette.grey[300],
        },
        '&.Mui-focusVisible': {
          boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
        },
      }),
    },
  ],
};
