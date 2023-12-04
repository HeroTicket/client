'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, useAccount, WagmiConfig } from 'wagmi';
import {
  polygonMumbai,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import axios from 'axios';


export const authContext = React.createContext({
  isLoggedIn: false,
  login: (tokenPair: any) => { },
  logout: () => { },
  getAccessToken: () => { },
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [refreshIntervalId, setRefreshIntervalId] = React.useState<NodeJS.Timeout>();

  const login = (tokenPair: any) => {
    sessionStorage.setItem('heroticket.jwtToken', JSON.stringify(tokenPair));
    setIsLoggedIn(true);
  }

  const logout = () => {
    sessionStorage.removeItem('heroticket.jwtToken');
    setIsLoggedIn(false);
    clearInterval(refreshIntervalId);
  };

  const refreshAccessToken = async () => {
    try {
      const jwtToken = sessionStorage.getItem('heroticket.jwtToken');
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

      if (response.status !== 200) {
        throw new Error("Failed to refresh access token");
      }

      // 새 accessToken으로 jwtToken 업데이트
      const updatedTokenData = response.data.data;

      console.log("Successfully refreshed access token");

      // 업데이트된 jwtToken을 sessionStorage에 저장
      sessionStorage.setItem('heroticket.jwtToken', JSON.stringify(updatedTokenData));
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  }

  const getAccessToken = (): string | undefined => {
    try {
      const jwtToken = sessionStorage.getItem('heroticket.jwtToken');
      if (!jwtToken) {
        throw new Error("No JWT Token found in sessionStorage");
      }

      const tokenData = JSON.parse(jwtToken);
      const { accessToken } = tokenData;

      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  }

  React.useEffect(() => {
    if (isConnected) {
      const intervalId = setInterval(refreshAccessToken, 10 * 60 * 1000);

      setRefreshIntervalId(intervalId);

      return () => clearInterval(intervalId);
    } else {
      setIsLoggedIn(false);
      clearInterval(refreshIntervalId);
    }
  }, [isConnected]);

  return (
    <authContext.Provider value={{ isLoggedIn, login, logout, getAccessToken }}>
      {children}
    </authContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);


  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  );

  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || '';

  const { wallets } = getDefaultWallets({
    appName: 'Hero Ticket Demo',
    projectId,
    chains,
  });

  const demoAppInfo = {
    appName: 'Hero Ticket Demo',
  };

  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'Other',
      wallets: [
        argentWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && (
          <AuthProvider>
            {children}
          </AuthProvider>
        )}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}