'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export function useSolana() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // For now, just set a mock balance
    // In production, fetch from connection
    if (connected) {
      setBalance(2.5); // Mock balance for now
    }
  }, [connected]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return {
    publicKey,
    connected,
    balance,
    formatAddress: publicKey ? formatAddress(publicKey.toBase58()) : '',
  };
}
