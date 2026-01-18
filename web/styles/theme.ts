import { createTheme } from '@mui/material/styles';

import { MuiAutocomplete } from './overrides/autocomplete';
import { MuiButton } from './overrides/button';
import { MuiButtonBase } from './overrides/button-base';
import { MuiChip } from './overrides/chip';
import { MuiDialog } from './overrides/dialog';
import { MuiFormHelperText } from './overrides/form-helper-text';
import { MuiFormLabel } from './overrides/form-label';
import { MuiInputBase } from './overrides/input-base';
import { MuiModal } from './overrides/modal';
import { MuiOutlinedInput } from './overrides/outlined-input';
import { MuiPaper } from './overrides/paper';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
    softPrimary: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    appShadows: {
      dialog: string;
    };
  }

  interface ThemeOptions {
    appShadows?: {
      dialog?: string;
    };
  }
}

export const muiTheme = createTheme({
  cssVariables: true,
  appShadows: {
    dialog: '0px 4px 10px 2px #0000001A',
  },
  typography: {
    fontFamily: 'var(--font-web437)',
  },
  palette: {
    primary: {
      main: '#9747FF',
      dark: '#7135BF',
      light: '#9747FF40',
    },
    secondary: {
      main: '#7F7F7F',
      dark: '#2A2A2A',
      light: '#E4E4E4',
    },
    error: {
      main: '#FF4E4E',
    },
    grey: {
      100: '#2A2A2A',
      200: '#7F7F7F',
      300: '#E4E4E4',
      400: '#EEEEEE',
    },
    text: {
      primary: '#2A2A2A',
      secondary: '#7F7F7F',
    },
    divider: '#E4E4E4',
    action: {
      disabled: '#7F7F7F',
      disabledBackground: '#00000033',
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButtonBase,
    MuiButton,
    MuiChip,
    MuiFormLabel,
    MuiFormHelperText,
    MuiInputBase,
    MuiOutlinedInput,
    MuiAutocomplete,
    MuiDialog,
    MuiPaper,
    MuiModal,
  },
});
