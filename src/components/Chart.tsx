'use client';

import { useEffect, useRef, useState } from 'react';

const tools = [
  { id: 'cursor', icon: '↖', name: 'Cursor' },
  { id: 'crosshair', icon: '✛', name: 'Crosshair' },
  { id: 'trendline', icon: '╱', name: 'Trendline' },
  { id: 'horizontal', icon: '─', name: 'Horizontal Line' },
  { id: 'vertical', icon: '│', name: 'Vertical Line' },
  { id: 'rectangle', icon: '▢', name: 'Rectangle' },
  { id: 'fib', icon: 'Fib', name: 'Fib Retracement' },
  { id: 'pin', icon: '📌', name: 'Pin' },
];

const indicators = [
  { id: 'ma', name: 'MA' },
  { id: 'ema', name: 'EMA' },
  { id: 'bb', name: 'Bollinger' },
  { id: 'rsi', name: 'RSI' },
  { id: 'macd', name: 'MACD' },
  { id: 'volume', name: 'Volume' },
];

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [timeframe, setTimeframe] = useState('1m');
  const [activeTool, setActiveTool] = useState('cursor');
  const [showIndicators, setShowIndicators] = useState(false);

  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    import('lightweight-charts').then((charts) => {
      const { createChart } = charts;

      if (chartRef.current) {
        chartRef.current.remove();
      }

      const chart = createChart(chartContainerRef.current!, {
        layout: {
          backgroundColor: '#0a0a0b',
          textColor: '#a1a1aa',
        },
        grid: {
          vertLines: { color: '#1f1f23' },
          horzLines: { color: '#1f1f23' },
        },
        width: chartContainerRef.current!.clientWidth,
        height: chartContainerRef.current!.clientHeight,
        crosshair: { mode: 1 },
        rightPriceScale: { borderColor: '#1f1f23' },
        timeScale: { borderColor: '#1f1f23' },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#a855f7',
        downColor: '#22c55e',
        borderUpColor: '#a855f7',
        borderDownColor: '#22c55e',
        wickUpColor: '#a855f7',
        wickDownColor: '#22c55e',
      });

      const generateData = () => {
        const data: any[] = [];
        const intervals: { [key: string]: number } = {
          '1m': 60, '5m': 300, '15m': 900, '30m': 1800,
          '1h': 3600, '4h': 14400, '1d': 86400,
        };
        const interval = intervals[timeframe] || 60;
        const numCandles = timeframe === '1d' ? 90 : timeframe === '4h' ? 180 : 500;
        let time = Math.floor(Date.now() / 1000) - numCandles * interval;
        let price = 67000;
        
        for (let i = 0; i < numCandles; i++) {
          const volatility = timeframe === '1d' ? 2000 : timeframe === '4h' ? 800 : 400;
          const change = (Math.random() - 0.5) * volatility;
          const open = price;
          const close = price + change;
          const high = Math.max(open, close) + Math.random() * volatility * 0.3;
          const low = Math.min(open, close) - Math.random() * volatility * 0.3;
          data.push({ time, open, high, low, close });
          price = close;
          time += interval;
        }
        return data;
      };

      candlestickSeries.setData(generateData());
      chart.timeScale().fitContent();
      chartRef.current = chart;

      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    });
  }, [timeframe]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar: Tools left, Timeframes center */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '8px 0',
        borderBottom: '1px solid #1f1f23',
        gap: '8px'
      }}>
        {/* Drawing Tools */}
        <div style={{ display: 'flex', gap: '2px', padding: '0 8px', borderRight: '1px solid #1f1f23' }}>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              title={tool.name}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                backgroundColor: activeTool === tool.id ? '#a855f7' : 'transparent',
                color: activeTool === tool.id ? 'white' : '#71717a',
                transition: 'all 0.15s',
              }}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Indicators Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowIndicators(!showIndicators)}
            style={{
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '4px',
              border: '1px solid #1f1f23',
              cursor: 'pointer',
              fontSize: '11px',
              backgroundColor: showIndicators ? '#a855f7' : 'transparent',
              color: showIndicators ? 'white' : '#71717a',
            }}
          >
            Indicators
          </button>
          
          {showIndicators && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              backgroundColor: '#18181b',
              border: '1px solid #1f1f23',
              borderRadius: '8px',
              padding: '8px 0',
              zIndex: 100,
              minWidth: '120px',
            }}>
              {indicators.map((ind) => (
                <button
                  key={ind.id}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#a1a1aa',
                    fontSize: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {ind.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Timeframes */}
        <div style={{ display: 'flex', gap: '2px', padding: '0 8px' }}>
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                padding: '4px 8px',
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
      </div>

      {/* Chart */}
      <div ref={chartContainerRef} style={{ flex: 1, minHeight: 0 }} />
    </div>
  );
}
