import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { GlobalStyle } from '@/styles/reset'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <GlobalStyle />
      <Component {...pageProps} />
      <div id='root-modal'></div>
    </Providers>
  )
}
