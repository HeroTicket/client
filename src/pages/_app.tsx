import type { AppProps } from 'next/app'
import { GlobalStyle } from '@/styles/reset'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <div id='root-modal'></div>
    </>
  )
}
