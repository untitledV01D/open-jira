import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundColor: grey[800],
        },
      }
    },
  }
});
