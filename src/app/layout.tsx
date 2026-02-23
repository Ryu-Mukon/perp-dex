'use client';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

const WALLET_ADAPTERS = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const endpoint = useMemo(() => 'https://api.devnet.solana.com', []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>Mukon Perps</title>
      </head>
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', backgroundColor: '#0a0a0b', color: '#fafafa' }}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={WALLET_ADAPTERS} autoConnect>
            <WalletModalProvider>
              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
