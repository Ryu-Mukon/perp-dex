'use client';

import { useEffect, useRef, useState } from 'react';

export default function Chart({ symbol = 'BTCUSD' }: { symbol?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState('1D');

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1W', '1M'];

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.style.width = '100%';
    widgetContainer.style.height = '100%';
    containerRef.current.appendChild(widgetContainer);

    // TradingView Advanced Chart widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.onload = () => {
      (window as any).TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1', // 1 = candlesticks
        locale: 'en',
        toolbar_bg: '#0a0a0b',
        enable_publishing: false,
        allow_symbol_change: true,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: widgetContainer.id || undefined,
        backgroundColor: '#0a0a0b',
        gridColor: '#1f1f23',
        studies: [
          'MASimple@tv-basicstudies',
          'RSI@tv-basicstudies',
        ],
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
        hide_side_toolbar: false,
        allow_shorting: true,
        support_host: 'https://www.tradingview.com',
      });
    };
    document.head.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0a0a0b' }}>
      {/* Timeframe selector */}
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        padding: '8px 16px', 
        borderBottom: '1px solid #1f1f23',
        flexWrap: 'wrap'
      }}>
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              backgroundColor: timeframe === tf ? '#a855f7' : 'transparent',
              color: timeframe === tf ? 'white' : '#71717a',
              transition: 'all 0.15s',
            }}
          >
            {tf}
          </button>
        ))}
      </div>
      
      {/* Chart container */}
      <div ref={containerRef} style={{ flex: 1, minHeight: 0 }} />
    </div>
  );
}
