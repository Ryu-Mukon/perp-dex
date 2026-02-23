'use client';

import { useEffect, useRef, useState } from 'react';

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [timeframe, setTimeframe] = useState('1m');

  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Import dynamically
    import('lightweight-charts').then((charts) => {
      const { createChart } = charts;

      // Clean up existing chart
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
        upColor: '#a855f7',      // Purple
        downColor: '#22c55e',    // Green
        borderUpColor: '#a855f7',
        borderDownColor: '#22c55e',
        wickUpColor: '#a855f7',
        wickDownColor: '#22c55e',
      });

      // Generate sample data based on timeframe
      const generateData = () => {
        const data: any[] = [];
        
        // Time intervals in seconds
        const intervals: { [key: string]: number } = {
          '1m': 60,
          '5m': 300,
          '15m': 900,
          '30m': 1800,
          '1h': 3600,
          '4h': 14400,
          '1d': 86400,
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
      {/* Chart */}
      <div ref={chartContainerRef} style={{ flex: 1, minHeight: 0 }} />
    </div>
  );
}
