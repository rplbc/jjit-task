import type { Components, Theme } from '@mui/material/styles';

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
      height: 48,
      boxShadow: `0 0 0 0 ${theme.palette.primary.light}`,
      transition: 'box-shadow 150ms ease, border-color 150ms ease',
      '& .MuiOutlinedInput-input': {
        padding: '14px 10px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[400],
        transition: 'border-color 150ms ease, border-width 150ms ease',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline,&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline':
        {
          borderColor: theme.palette.primary.main,
          borderWidth: 1,
        },
      '&.Mui-focused': {
        boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[400],
      },
    }),
  },
  variants: [
    {
      props: { size: 'medium' },
      style: {
        '& .MuiOutlinedInput-input': {
          padding: '14px 10px',
        },
      },
    },
  ],
  defaultProps: {
    notched: false,
  },
};
