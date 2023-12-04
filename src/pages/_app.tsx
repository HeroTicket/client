import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import theme from '@/styles/media';
import { GlobalStyle } from '@/styles/reset';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
          <div id='root-modal'></div>
        </ThemeProvider>
      </QueryClientProvider>
    </Providers>
  )
}
