'use client';

import { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#0a0a0b' },
        textColor: '#71717a',
      },
      grid: {
        vertLines: { color: '#27272a' },
        horzLines: { color: '#27272a' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#27272a',
      },
      timeScale: {
        borderColor: '#27272a',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Generate sample data
    const generateData = (): CandlestickData<Time>[] => {
      const data: CandlestickData<Time>[] = [];
      let time = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
      let price = 67000;
      
      for (let i = 0; i < 500; i++) {
        const change = (Math.random() - 0.5) * 500;
        const open = price;
        const close = price + change;
        const high = Math.max(open, close) + Math.random() * 100;
        const low = Math.min(open, close) - Math.random() * 100;
        
        data.push({
          time: time as Time,
          open,
          high,
          low,
          close,
        });
        
        price = close;
        time += 60; // 1 minute candles
      }
      
      return data;
    };

    candlestickSeries.setData(generateData());

    // Fit content
    chart.timeScale().fitContent();

    // Store refs
    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div 
      ref={chartContainerRef} 
      style={{ width: '100%', height: '100%' }}
    />
  );
}
