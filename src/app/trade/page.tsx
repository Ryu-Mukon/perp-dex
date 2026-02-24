'use client';

import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TrendingUp, Settings, Zap, Bell, Search, ChevronDown, Wallet } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSolana } from '@/hooks/useSolana';

const Chart = dynamic(() => import('@/components/Chart'), { 
  ssr: false,
  loading: () => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#71717a' }}>Loading chart...</div>
});

const orderBook = {
  bids: [
    { price: '67,234', size: '2.45', total: '2.45' },
    { price: '67,233', size: '1.82', total: '4.27' },
    { price: '67,232', size: '5.12', total: '9.39' },
    { price: '67,231', size: '3.21', total: '12.60' },
    { price: '67,230', size: '8.45', total: '21.05' },
    { price: '67,229', size: '2.11', total: '23.16' },
    { price: '67,228', size: '4.56', total: '27.72' },
    { price: '67,227', size: '1.99', total: '29.71' },
    { price: '67,226', size: '6.32', total: '36.03' },
    { price: '67,225', size: '3.78', total: '39.81' },
  ],
  asks: [
    { price: '67,235', size: '1.23', total: '1.23' },
    { price: '67,236', size: '4.56', total: '5.79' },
    { price: '67,237', size: '2.89', total: '8.68' },
    { price: '67,238', size: '7.12', total: '15.80' },
    { price: '67,239', size: '3.45', total: '19.25' },
    { price: '67,240', size: '5.67', total: '24.92' },
    { price: '67,241', size: '2.34', total: '27.26' },
    { price: '67,242', size: '8.90', total: '36.16' },
    { price: '67,243', size: '4.12', total: '40.28' },
    { price: '67,244', size: '6.78', total: '47.06' },
  ],
};

const positions = [
  // Will be fetched from chain
];

const trades = [
  { price: '67,235', size: '0.12', time: '10:42:35', side: 'sell' },
  { price: '67,234', size: '0.45', time: '10:42:18', side: 'buy' },
  { price: '67,236', size: '0.23', time: '10:42:02', side: 'sell' },
  { price: '67,233', size: '1.02', time: '10:41:45', side: 'buy' },
  { price: '67,235', size: '0.34', time: '10:41:28', side: 'sell' },
  { price: '67,232', size: '0.67', time: '10:41:12', side: 'buy' },
  { price: '67,234', size: '0.89', time: '10:40:55', side: 'sell' },
  { price: '67,231', size: '0.21', time: '10:40:38', side: 'buy' },
];

const markets = [
  { symbol: 'BTC', name: 'Bitcoin', price: '67,234', change: '+2.34%' },
  { symbol: 'SOL', name: 'Solana', price: '142.56', change: '+5.67%' },
  { symbol: 'ETH', name: 'Ethereum', price: '3,456', change: '-1.23%' },
  { symbol: 'HYPE', name: 'Hyperliquid', price: '28.45', change: '+8.90%' },
  { symbol: 'SUI', name: 'Sui', price: '0.94', change: '+12.34%' },
];

export default function TradePage() {
  const [leverage, setLeverage] = useState('2');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [showMarketDropdown, setShowMarketDropdown] = useState(false);
  
  const { publicKey, connected, balance, fetchBalance } = useSolana();

  useEffect(() => {
    if (connected) {
      fetchBalance();
    }
  }, [connected, fetchBalance]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0b', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Market Selector */}
      <header style={{ height: '56px', borderBottom: '1px solid #1f1f23', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Market Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowMarketDropdown(!showMarketDropdown)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: '#18181b',
                border: '1px solid #1f1f23',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '16px', color: 'white' }}>{selectedMarket.symbol}</span>
              <span style={{ color: '#a855f7', fontSize: '12px', padding: '2px 6px', backgroundColor: 'rgba(168,85,247,0.1)', borderRadius: '4px' }}>PERP</span>
              <ChevronDown size={14} color="#71717a" />
            </button>
            
            {showMarketDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '4px',
                backgroundColor: '#18181b',
                border: '1px solid #1f1f23',
                borderRadius: '8px',
                minWidth: '200px',
                zIndex: 100,
                overflow: 'hidden',
              }}>
                {markets.map((market) => (
                  <button
                    key={market.symbol}
                    onClick={() => { setSelectedMarket(market); setShowMarketDropdown(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '12px',
                      border: 'none',
                      backgroundColor: selectedMarket.symbol === market.symbol ? 'rgba(168,85,247,0.1)' : 'transparent',
                      cursor: 'pointer',
                      borderBottom: '1px solid #1f1f23',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 500, color: 'white' }}>{market.symbol}</span>
                      <span style={{ marginLeft: '8px', color: '#71717a', fontSize: '12px' }}>{market.name}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'white' }}>${market.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ fontFamily: 'monospace', color: '#22c55e' }}>$67,234</span>
            <TrendingUp size={16} color="#22c55e" />
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Wallet Info */}
          {connected && publicKey && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: '#18181b',
              borderRadius: '8px',
              border: '1px solid #1f1f23',
            }}>
              <Wallet size={14} color="#a855f7" />
              <span style={{ fontSize: '12px', color: '#a1a1aa', fontFamily: 'monospace' }}>
                {formatAddress(publicKey.toBase58())}
              </span>
              <span style={{ fontSize: '12px', color: '#a855f7', fontFamily: 'monospace' }}>
                {balance.toFixed(3)} SOL
              </span>
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #1f1f23' }}>
            <Zap size={16} color="#a855f7" />
            <span style={{ fontSize: '14px' }}>Funding: <span style={{ color: '#a855f7' }}>0.01%</span></span>
          </div>
          <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Bell size={16} color="#71717a" /></button>
          <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Settings size={16} color="#71717a" /></button>
          <WalletMultiButton style={{ backgroundColor: '#a855f7', color: 'white', fontWeight: 600, borderRadius: '8px', border: 'none', padding: '6px 16px', cursor: 'pointer', fontSize: '14px', height: '36px' }} />
        </div>
      </header>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Chart */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #1f1f23' }}>
          <div style={{ flex: 1 }}>
            <Chart />
          </div>
          {/* Trades */}
          <div style={{ height: '160px', borderTop: '1px solid #1f1f23' }}>
            <div style={{ height: '32px', borderBottom: '1px solid #1f1f23', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <span style={{ fontSize: '12px', color: '#71717a' }}>Recent Trades</span>
            </div>
            <div style={{ overflowY: 'auto', height: '128px' }}>
              <table style={{ width: '100%', fontSize: '12px' }}>
                <thead style={{ color: '#71717a' }}>
                  <tr><th style={{ textAlign: 'left', padding: '4px 16px' }}>Price</th><th style={{ textAlign: 'right', padding: '4px 16px' }}>Size</th><th style={{ textAlign: 'right', padding: '4px 16px' }}>Time</th></tr>
                </thead>
                <tbody>
                  {trades.map((trade, i) => (
                    <tr key={i} style={{ cursor: 'pointer' }}>
                      <td style={{ padding: '2px 16px', fontFamily: 'monospace', color: trade.side === 'buy' ? '#22c55e' : '#ef4444' }}>{trade.price}</td>
                      <td style={{ textAlign: 'right', padding: '2px 16px', fontFamily: 'monospace' }}>{trade.size}</td>
                      <td style={{ textAlign: 'right', padding: '2px 16px', color: '#71717a' }}>{trade.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Book */}
        <div style={{ width: '260px', borderRight: '1px solid #1f1f23', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '40px', borderBottom: '1px solid #1f1f23', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <span style={{ fontSize: '12px', color: '#71717a' }}>Order Book</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse' }}>
            {[...orderBook.asks].reverse().map((ask, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '11px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(239,68,68,0.15)', width: `${(parseFloat(ask.total) / 47.06) * 100}%` }} />
                <span style={{ flex: 1, padding: '2px 16px', color: '#ef4444', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{ask.price}</span>
                <span style={{ width: '70px', textAlign: 'right', padding: '2px 16px', color: '#71717a', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{ask.size}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '8px', borderTop: '1px solid #1f1f23', borderBottom: '1px solid #1f1f23', textAlign: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 600, color: 'white' }}>67,234</span>
            <span style={{ color: '#71717a', fontSize: '11px', marginLeft: '8px' }}>Spread: 0.01%</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {orderBook.bids.map((bid, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '11px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(34,197,94,0.15)', width: `${(parseFloat(bid.total) / 39.81) * 100}%` }} />
                <span style={{ flex: 1, padding: '2px 16px', color: '#22c55e', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{bid.price}</span>
                <span style={{ width: '70px', textAlign: 'right', padding: '2px 16px', color: '#71717a', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{bid.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          {/* Order Form */}
          <div style={{ padding: '16px', borderBottom: '1px solid #1f1f23' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button onClick={() => setSide('buy')} style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: side === 'buy' ? '#22c55e' : '#18181b', color: side === 'buy' ? 'black' : '#71717a' }}>Buy / Long</button>
              <button onClick={() => setSide('sell')} style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: side === 'sell' ? '#ef4444' : '#18181b', color: side === 'sell' ? 'white' : '#71717a' }}>Sell / Short</button>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button onClick={() => setOrderType('limit')} style={{ flex: 1, padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: orderType === 'limit' ? '#18181b' : 'transparent', color: orderType === 'limit' ? 'white' : '#71717a', borderColor: orderType === 'limit' ? '#a855f7' : '#1f1f23', borderStyle: 'solid', borderWidth: '1px' }}>Limit</button>
              <button onClick={() => setOrderType('market')} style={{ flex: 1, padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: orderType === 'market' ? '#18181b' : 'transparent', color: orderType === 'market' ? 'white' : '#71717a', borderColor: orderType === 'market' ? '#a855f7' : '#1f1f23', borderStyle: 'solid', borderWidth: '1px' }}>Market</button>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '12px', color: '#71717a' }}>Price</span><span style={{ fontSize: '12px', color: '#71717a' }}>~$67,234</span></div>
              <input type="text" defaultValue="67,234" style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #1f1f23', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: 'white', fontFamily: 'monospace', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '12px', color: '#71717a' }}>Size</span><span style={{ fontSize: '12px', color: '#71717a' }}>~0.015 BTC</span></div>
              <input type="text" placeholder="0.00" style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #1f1f23', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: 'white', fontFamily: 'monospace', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '12px', color: '#71717a' }}>Leverage</span><span style={{ fontSize: '12px', color: 'white', fontFamily: 'monospace' }}>{leverage}x</span></div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 5, 10].map((lev) => (
                  <button key={lev} onClick={() => setLeverage(lev.toString())} style={{ flex: 1, padding: '6px', borderRadius: '4px', fontSize: '11px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: leverage === lev.toString() ? '#18181b' : 'transparent', color: leverage === lev.toString() ? 'white' : '#71717a', borderColor: leverage === lev.toString() ? '#a855f7' : '#1f1f23', borderStyle: 'solid', borderWidth: '1px' }}>{lev}x</button>
                ))}
              </div>
            </div>
            <button 
              disabled={!connected}
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '8px', 
                fontWeight: 600, 
                fontSize: '14px', 
                border: 'none', 
                cursor: connected ? 'pointer' : 'not-allowed',
                backgroundColor: !connected ? '#27272a' : (side === 'buy' ? '#22c55e' : '#ef4444'), 
                color: !connected ? '#71717a' : (side === 'buy' ? 'black' : 'white'),
                opacity: !connected ? 0.5 : 1
              }}
            >
              {!connected ? 'Connect Wallet' : (side === 'buy' ? 'Buy / Long BTC-PERP' : 'Sell / Short BTC-PERP')}
            </button>
          </div>

          {/* Positions */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: 500, fontSize: '14px', color: 'white' }}>Positions</span>
              <span style={{ fontSize: '12px', color: '#71717a' }}>{positions.length} open</span>
            </div>
            
            {positions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#71717a', fontSize: '13px' }}>
                No open positions
              </div>
            )}
            
            {positions.map((pos) => (
              <div key={pos.symbol} style={{ padding: '12px', backgroundColor: '#18181b', border: '1px solid #1f1f23', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 500, color: 'white' }}>{pos.symbol}</span>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 500, backgroundColor: pos.side === 'long' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: pos.side === 'long' ? '#22c55e' : '#ef4444' }}>{pos.side.toUpperCase()}</span>
                    <span style={{ fontSize: '12px', color: '#71717a' }}>{pos.size}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontFamily: 'monospace', color: pos.sidePnl ? '#22c55e' : '#ef4444' }}>{pos.pnl} ({pos.pnlPct})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
                  <span>Entry: ${pos.entry}</span>
                  <span>Mark: ${pos.mark}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Balance */}
          <div style={{ padding: '16px', borderTop: '1px solid #1f1f23', backgroundColor: '#0f0f11' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#71717a' }}>Available</span>
              <span style={{ fontFamily: 'monospace', color: 'white' }}>1,234.56 USDC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
