import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';
import {  http } from 'wagmi';

export const config = getDefaultConfig({
    appName: import.meta.env.VITE_APP_NAME || 'HotelVest',
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!, // Ensure this is set in your .env file
    chains: [base, baseSepolia],
    transports: {
      [base.id]: http('https://mainnet.base.org'),
      [baseSepolia.id]: http('https://sepolia.base.org'),
    },
  });

