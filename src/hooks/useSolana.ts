'use client';

import { useState, useEffect, useCallback } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, Token2022Program, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const RPC_ENDPOINT = 'https://api.devnet.solana.com';

export function useSolana() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const [connection] = useState(() => new Connection(RPC_ENDPOINT));
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Fetch balance
  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / 1e9);
    } catch (e) {
      console.error('Error fetching balance:', e);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Get USDC balance (假设使用 SPL Token)
  const getTokenBalance = useCallback(async (mintAddress: string) => {
    if (!publicKey) return 0;
    try {
      const mint = new PublicKey(mintAddress);
      const ata = await getAssociatedTokenAddress(
        mint,
        publicKey,
        false,
        Token2022Program.programId,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      const accountInfo = await connection.getParsedAccountInfo(ata);
      if (accountInfo.value?.data) {
        const data = accountInfo.value.data as any;
        return data.parsed?.info?.tokenAmount?.uiAmount || 0;
      }
      return 0;
    } catch (e) {
      return 0;
    }
  }, [publicKey, connection]);

  // Send SOL (for testing)
  const sendSOL = useCallback(async (to: string, amount: number) => {
    if (!publicKey || !sendTransaction) return null;
    
    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * 1e9,
        })
      );
      
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (e) {
      console.error('Error sending SOL:', e);
      return null;
    }
  }, [publicKey, sendTransaction, connection]);

  return {
    publicKey,
    connected,
    balance,
    connection,
    loading,
    fetchBalance,
    getTokenBalance,
    sendSOL,
  };
}

// Program IDs
export const PROGRAMS = {
  PERCOLATOR_CORE: '6Q7SfrrHQwFiLmBamxZbLtV3XEvtbyQDaqS1pGhnDHgd',
  PERCOLATOR_MATCH: 'GsYWDgqwcrMMtknxz6i7Q2ouZmsacKjPEwSafAf5RnVu',
};

// USDC Mint on Devnet (example)
export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGZFKjbA2P'; // Mainnet USDC
// For devnet you'd use a devnet USDC mint
export const DEVNET_USDC_MINT = '4zMMC9sctodY6BWq2mBaFc7RSvW2GzE8Zf5U5QU4i触G'; // Example devnet mint
