import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@solana/anchor-client';

// Devnet RPC
export const RPC_ENDPOINT = 'https://api.devnet.solana.com';

// Program IDs
export const PROGRAMS = {
  PERCOLATOR_CORE: new PublicKey('6Q7SfrrHQwFiLmBamxZbLtV3XEvtbyQDaqS1pGhnDHgd'),
  PERCOLATOR_MATCH: new PublicKey('GsYWDgqwcrMMtknxz6i7Q2ouZmsacKjPEwSafAf5RnVu'),
};

// Create connection
export function getConnection() {
  return new Connection(RPC_ENDPOINT, 'confirmed');
}

// Get program accounts (helper)
export async function getProgramAccounts(connection: Connection, programId: PublicKey) {
  return connection.getParsedProgramAccounts(programId);
}

// Format SOL amount
export function formatSOL(amount: number): string {
  return (amount / 1e9).toFixed(4);
}

// Format USDC amount (assuming 6 decimals)
export function formatUSDC(amount: number): string {
  return (amount / 1e6).toFixed(2);
}

// Example: Fetch market data from program
export async function getMarkets(connection: Connection) {
  // This would fetch from the program
  // For now returning example data
  return [
    { symbol: 'BTC', name: 'Bitcoin', price: 67000, address: null },
    { symbol: 'SOL', name: 'Solana', price: 142, address: null },
  ];
}

// Example: Fetch positions for wallet
export async function getPositions(connection: Connection, walletAddress: PublicKey) {
  // This would fetch from the program based on wallet
  // For now returning example
  return [];
}

// Build trade transaction (placeholder)
export async function buildTradeTransaction(
  connection: Connection,
  wallet: Wallet,
  marketAddress: PublicKey,
  side: 'long' | 'short',
  size: number,
  price: number
): Promise<Transaction> {
  // This would build the actual transaction
  // using the Percolator program instructions
  const transaction = new Transaction();
  
  // Add instructions here based on Percolator's IDL
  // - deposit collateral
  - open position
  - etc.
  
  return transaction;
}

// Send transaction with retry
export async function sendTransaction(
  connection: Connection,
  transaction: Transaction,
  wallet: Wallet
): Promise<string> {
  const latestBlockhash = await connection.getLatestBlockhash();
  transaction.feePayer = wallet.publicKey;
  transaction.recentBlockhash = latestBlockhash.blockhash;
  
  const signedTx = await wallet.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  
  await connection.confirmTransaction(signature);
  
  return signature;
}
