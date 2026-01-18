import type { Components, Theme } from '@mui/material/styles';

export const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 16,
      padding: '4px 8px',
      height: 28,
      '&.MuiChip-variantSoftPrimary .MuiChip-label, &.MuiChip-variantSoftPrimary .MuiChip-labelSmall':
        {
          color: theme.palette.common.black,
        },
      '&.MuiChip-variantSoftPrimary .MuiChip-icon, &.MuiChip-variantSoftPrimary .MuiChip-deleteIcon':
        {
          color: theme.palette.common.black,
        },
    }),
    label: {
      padding: 0,
    },
  },
  variants: [
    {
      props: { variant: 'soft' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.grey[400],
        color: theme.palette.text.primary,
      }),
    },
    {
      props: { variant: 'softPrimary' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
      }),
    },
  ],
};
