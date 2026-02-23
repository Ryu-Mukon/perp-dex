'use client';

import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TrendingUp, Shield, Zap, ChevronRight, Activity, Lock } from 'lucide-react';

const markets = [
  { symbol: 'BTC', name: 'Bitcoin', price: '67,234', change: '+2.34%', long: true },
  { symbol: 'SOL', name: 'Solana', price: '142.56', change: '+5.67%', long: true },
  { symbol: 'ETH', name: 'Ethereum', price: '3,456', change: '-1.23%', long: false },
  { symbol: 'HYPE', name: 'Hyperliquid', price: '28.45', change: '+8.90%', long: true },
  { symbol: 'SUI', name: 'Sui', price: '0.94', change: '+12.34%', long: true },
  { symbol: 'BONK', name: 'Bonk', price: '0.000021', change: '-3.45%', long: false },
];

const features = [
  { icon: Shield, title: 'No Admin Keys', description: 'Fully immutable. No central control. Trade with confidence.' },
  { icon: Lock, title: 'Private Positions', description: 'Your PnL is for your eyes only. Privacy by design.' },
  { icon: Activity, title: 'Formula Pricing', description: 'On-chain pricing. No keepers. No oracles needed.' },
  { icon: Zap, title: 'Instant Settlement', description: 'Built on Solana. Sub-second finality for every trade.' },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0b' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid #27272a', backgroundColor: 'rgba(10,10,11,0.8)', backdropFilter: 'blur(24px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #a855f7, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'black', fontWeight: 700, fontSize: '14px' }}>M</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: '18px', letterSpacing: '-0.02em' }}>Mukon Perps</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <a href="#markets" style={{ color: '#a1a1aa', fontSize: '14px', textDecoration: 'none' }}>Markets</a>
              <a href="#features" style={{ color: '#a1a1aa', fontSize: '14px', textDecoration: 'none' }}>Features</a>
              <a href="#about" style={{ color: '#a1a1aa', fontSize: '14px', textDecoration: 'none' }}>About</a>
            </div>
            <div>
              {mounted && <WalletMultiButton style={{ backgroundColor: '#a855f7', color: 'black', fontWeight: 600, borderRadius: '8px', border: 'none', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', height: '36px' }} />}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '128px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }} className="stagger-children">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#a855f7', fontSize: '12px', fontWeight: 500, marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#a855f7' }} className="animate-pulse-glow"></span>
            Live on Solana Devnet
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 8vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '24px' }}>
            <span style={{ background: 'linear-gradient(90deg, #fff, #fff, #71717a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Perpetuals</span>
            <br />
            <span style={{ color: 'white' }}>for the people.</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#a1a1aa', maxWidth: '672px', margin: '0 auto 40px' }}>
            Trade perpetual futures with true privacy. No admin keys. Fully on-chain pricing. Built on Solana.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <a href="/trade" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#a855f7', color: 'black', fontWeight: 600, borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' }}>
              Start Trading <ChevronRight size={16} />
            </a>
            <a href="#markets" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#18181b', border: '1px solid #27272a', color: 'white', fontWeight: 500, borderRadius: '8px', textDecoration: 'none' }}>
              View Markets
            </a>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section id="markets" style={{ padding: '64px 16px', borderTop: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Live Markets</h2>
            <a href="/markets" style={{ color: '#a855f7', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
              View all <ChevronRight size={12} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {markets.map((market, i) => (
              <a key={market.symbol} href={`/trade/${market.symbol}`} style={{ padding: '16px', backgroundColor: '#111113', border: '1px solid #27272a', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }} className="animate-slide-up">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>{market.symbol}</span>
                  <span style={{ fontSize: '12px', fontFamily: 'monospace', color: market.long ? '#a855f7' : '#ef4444' }}>{market.change}</span>
                </div>
                <div style={{ color: '#71717a', fontSize: '14px' }}>{market.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '18px', marginTop: '4px' }}>${market.price}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 16px', backgroundColor: '#111113' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, marginBottom: '16px' }}>Why Mukon Perps?</h2>
            <p style={{ color: '#a1a1aa', maxWidth: '448px', margin: '0 auto' }}>Built different. Privacy-first. Truly decentralized.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {features.map((feature, i) => (
              <div key={feature.title} style={{ padding: '24px', backgroundColor: '#0a0a0b', border: '1px solid #27272a', borderRadius: '16px', transition: 'all 0.2s' }} className="animate-slide-up">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <feature.icon size={24} color="#a855f7" />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: '#71717a', fontSize: '14px' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 16px', borderTop: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'black', fontWeight: 700, fontSize: '12px' }}>M</span>
            </div>
            <span style={{ color: '#71717a', fontSize: '14px' }}>Mukon Labs © 2026</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#71717a' }}>
            <a href="#" style={{ color: '#71717a', textDecoration: 'none' }}>Twitter</a>
            <a href="#" style={{ color: '#71717a', textDecoration: 'none' }}>GitHub</a>
            <a href="#" style={{ color: '#71717a', textDecoration: 'none' }}>Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
