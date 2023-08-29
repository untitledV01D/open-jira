import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: grey[300],
    }
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      }
    }
  }
});
