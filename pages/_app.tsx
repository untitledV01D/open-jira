import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { UIProvier } from '../context/ui';
import { EntriesProvier } from '../context/entries';
import { darkTheme } from '../themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvier>
      <UIProvier>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvier>
    </EntriesProvier>
  );
}
