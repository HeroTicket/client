import React, { useEffect } from 'react';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import theme from '@/styles/media';
import { GlobalStyle } from '@/styles/reset'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    // 리프레시 토큰을 보내는 함수
    const refreshAccessToken = async () => {
      try {
        // sessionStorage에서 jwtToken 정보 가져오기
        const jwtToken = sessionStorage.getItem('jwtToken');
        if (!jwtToken) {
          throw new Error("No JWT Token found in sessionStorage");
        }
    
        const tokenData = JSON.parse(jwtToken);
        const { refreshToken } = tokenData;

    // 서버로부터 새로운 토큰 쌍 받기
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/refresh`, {
      refreshToken: refreshToken
    }, {
      headers: {
        "Content-Type": 'application/json',
      },
    });
    
        // 새 accessToken으로 jwtToken 업데이트
        const updatedTokenData = response.data;
    
        // 업데이트된 jwtToken을 sessionStorage에 저장
        sessionStorage.setItem('jwtToken', JSON.stringify(updatedTokenData));
      } catch (error) {
        console.error('Error refreshing access token:', error);
        // 필요한 에러 처리
      }
    };

    // 10분(600000밀리초)마다 리프레시 토큰 요청
    // const intervalId = setInterval(refreshAccessToken, 10 * 60 * 1000);
    const intervalId = setInterval(refreshAccessToken, 10 * 1000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalId);
  }, []);

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
