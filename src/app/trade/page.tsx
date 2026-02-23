'use client';

import { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TrendingUp, Settings, Zap, Bell, Search } from 'lucide-react';
import dynamic from 'next/dynamic';

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
  { symbol: 'BTC', side: 'long', size: '0.5', entry: '65,400', mark: '67,234', pnl: '+917', pnlPct: '+2.80%', sidePnl: true },
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0b', display: 'flex' }}>
      {/* Left Sidebar */}
      <aside style={{ width: '256px', borderRight: '1px solid #27272a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #27272a' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 600 }}>Markets</span>
            <Search size={16} color="#71717a" />
          </div>
          <input type="text" placeholder="Search..." style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', color: 'white', outline: 'none' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {markets.map((market) => (
            <a key={market.symbol} href={`/trade/${market.symbol}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', textDecoration: 'none', borderBottom: '1px solid rgba(39,39,42,0.5)', transition: 'background 0.2s' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '14px' }}>{market.symbol}</div>
                <div style={{ fontSize: '12px', color: '#71717a' }}>{market.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>${market.price}</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: market.change.startsWith('+') ? '#22c55e' : '#ef4444' }}>{market.change}</div>
              </div>
            </a>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ height: '56px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '18px' }}>BTC-PERP</span>
              <span style={{ padding: '2px 8px', backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '12px', borderRadius: '4px' }}>PERP</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <span style={{ fontFamily: 'monospace', color: '#22c55e' }}>$67,234</span>
              <TrendingUp size={16} color="#22c55e" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #27272a' }}>
              <Zap size={16} color="#22c55e" />
              <span style={{ fontSize: '14px' }}>Funding: <span style={{ color: '#22c55e' }}>0.01%</span></span>
            </div>
            <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Bell size={16} color="#71717a" /></button>
            <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Settings size={16} color="#71717a" /></button>
            <WalletMultiButton style={{ backgroundColor: '#22c55e', color: 'black', fontWeight: 600, borderRadius: '8px', border: 'none', padding: '6px 16px', cursor: 'pointer', fontSize: '14px', height: '36px' }} />
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex' }}>
          {/* Chart */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #27272a' }}>
            <div style={{ height: '40px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
              <button style={{ padding: '4px 12px', backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '12px', borderRadius: '4px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>Price</button>
              <button style={{ padding: '4px 12px', background: 'none', color: '#71717a', fontSize: '12px', border: 'none', cursor: 'pointer' }}>Depth</button>
              <button style={{ padding: '4px 12px', background: 'none', color: '#71717a', fontSize: '12px', border: 'none', cursor: 'pointer' }}>Funding</button>
            </div>
            <div style={{ flex: 1 }}>
              <Chart />
            </div>
            {/* Trades */}
            <div style={{ height: '192px', borderTop: '1px solid #27272a' }}>
              <div style={{ height: '32px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                <span style={{ fontSize: '12px', color: '#71717a' }}>Recent Trades</span>
              </div>
              <div style={{ overflowY: 'auto', height: '160px' }}>
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
          <div style={{ width: '288px', borderRight: '1px solid #27272a', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '40px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <span style={{ fontSize: '12px', color: '#71717a' }}>Order Book</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse' }}>
              {[...orderBook.asks].reverse().map((ask, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '12px', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(239,68,68,0.1)', width: `${(parseFloat(ask.total) / 47.06) * 100}%` }} />
                  <span style={{ flex: 1, padding: '2px 16px', color: '#ef4444', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{ask.price}</span>
                  <span style={{ width: '80px', textAlign: 'right', padding: '2px 16px', color: '#a1a1aa', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{ask.size}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '8px', borderTop: '1px solid #27272a', borderBottom: '1px solid #27272a', textAlign: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 600 }}>67,234</span>
              <span style={{ color: '#71717a', fontSize: '12px', marginLeft: '8px' }}>Spread: 0.01%</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {orderBook.bids.map((bid, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '12px', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(34,197,94,0.1)', width: `${(parseFloat(bid.total) / 39.81) * 100}%` }} />
                  <span style={{ flex: 1, padding: '2px 16px', color: '#22c55e', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{bid.price}</span>
                  <span style={{ width: '80px', textAlign: 'right', padding: '2px 16px', color: '#a1a1aa', fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>{bid.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div style={{ width: '320px', display: 'flex', flexDirection: 'column' }}>
            {/* Order Form */}
            <div style={{ padding: '16px', borderBottom: '1px solid #27272a' }}>
              {/* Buy/Sell */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button onClick={() => setSide('buy')} style={{ flex: 1, padding: '8px', borderRadius: '8px', fontWeight: 500, fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: side === 'buy' ? '#22c55e' : '#18181b', color: side === 'buy' ? 'black' : '#71717a' }}>Buy / Long</button>
                <button onClick={() => setSide('sell')} style={{ flex: 1, padding: '8px', borderRadius: '8px', fontWeight: 500, fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: side === 'sell' ? '#ef4444' : '#18181b', color: side === 'sell' ? 'white' : '#71717a' }}>Sell / Short</button>
              </div>
              {/* Type */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button onClick={() => setOrderType('limit')} style={{ flex: 1, padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: orderType === 'limit' ? '#18181b' : 'transparent', color: orderType === 'limit' ? 'white' : '#71717a', borderColor: orderType === 'limit' ? '#22c55e' : 'transparent', borderStyle: 'solid', borderWidth: '1px' }}>Limit</button>
                <button onClick={() => setOrderType('market')} style={{ flex: 1, padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: orderType === 'market' ? '#18181b' : 'transparent', color: orderType === 'market' ? 'white' : '#71717a', borderColor: orderType === 'market' ? '#22c55e' : 'transparent', borderStyle: 'solid', borderWidth: '1px' }}>Market</button>
              </div>
              {/* Price */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '12px', color: '#71717a' }}>Price</span><span style={{ fontSize: '12px', color: '#71717a' }}>~$67,234</span></div>
                <input type="text" defaultValue="67,234" style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', color: 'white', fontFamily: 'monospace', outline: 'none' }} />
              </div>
              {/* Size */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '12px', color: '#71717a' }}>Size</span><span style={{ fontSize: '12px', color: '#71717a' }}>~0.015 BTC</span></div>
                <input type="text" placeholder="0.00" style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', color: 'white', fontFamily: 'monospace', outline: 'none' }} />
              </div>
              {/* Leverage */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '12px', color: '#71717a' }}>Leverage</span><span style={{ fontSize: '12px', color: 'white', fontFamily: 'monospace' }}>{leverage}x</span></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 5, 10].map((lev) => (
                    <button key={lev} onClick={() => setLeverage(lev.toString())} style={{ flex: 1, padding: '4px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: leverage === lev.toString() ? '#18181b' : 'transparent', color: leverage === lev.toString() ? 'white' : '#71717a', borderColor: leverage === lev.toString() ? '#22c55e' : 'transparent', borderStyle: 'solid', borderWidth: '1px' }}>{lev}x</button>
                  ))}
                </div>
              </div>
              {/* Submit */}
              <button style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: side === 'buy' ? '#22c55e' : '#ef4444', color: side === 'buy' ? 'black' : 'white' }}>
                {side === 'buy' ? 'Buy / Long BTC-PERP' : 'Sell / Short BTC-PERP'}
              </button>
            </div>

            {/* Positions */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 500, fontSize: '14px' }}>Positions</span>
                <span style={{ fontSize: '12px', color: '#71717a' }}>1 open</span>
              </div>
              {positions.map((pos) => (
                <div key={pos.symbol} style={{ padding: '12px', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 500 }}>{pos.symbol}</span>
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
            <div style={{ padding: '16px', borderTop: '1px solid #27272a', backgroundColor: '#111113' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#71717a' }}>Available</span>
                <span style={{ fontFamily: 'monospace' }}>1,234.56 USDC</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
