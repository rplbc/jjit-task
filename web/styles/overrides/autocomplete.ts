import * as React from 'react';
import type { Components, Theme } from '@mui/material/styles';
import { ChevronDownIcon } from '../../components/icons/chevron-down';

export const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  defaultProps: {
    disableClearable: true,
    popupIcon: React.createElement(ChevronDownIcon, {
      width: 20,
      height: 20,
      style: { color: 'inherit' },
    }),
  },
  styleOverrides: {
    inputRoot: {
      '&.MuiOutlinedInput-root': {
        padding: 0,
        '& .MuiAutocomplete-input': {
          padding: '14px 10px',
        },
        '& .MuiAutocomplete-endAdornment': {
          right: 10,
        },
      },
    },
    popupIndicatorOpen: {
      transform: 'rotate(180deg)',
    },
    popupIndicator: ({ theme }) => ({
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }),
    listbox: ({ theme }) => ({
      paddingTop: 0,
      paddingBottom: 0,
      color: '#000000',
      maxHeight: 180,
      overflow: 'auto',
      '& .MuiAutocomplete-option[data-focus="true"]': {
        backgroundColor: theme.palette.primary.light,
      },
      '& .MuiAutocomplete-option.Mui-focused': {
        backgroundColor: theme.palette.primary.light,
      },
      '& .MuiAutocomplete-option[aria-selected="true"]': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
      },
    }),
    option: {
      padding: '4px 10px',
      minHeight: 36,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'inherit',
    },
    paper: ({ theme }) => ({
      boxShadow: theme.appShadows.dialog,
      borderRadius: theme.shape.borderRadius,
    }),
  },
};
