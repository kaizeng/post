// client/src/components/Chart.js
// Updated to properly destroy previous Chart instances and avoid "Canvas is already in use" errors

import React, { useEffect, useRef } from 'react';
import ChartJS from 'chart.js/auto';

function Chart({ data }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !Array.isArray(data) || data.length === 0) {
      return;
    }

    const ctx = canvas.getContext('2d');
    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart
    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: Object.keys(data[0]).map(key => ({
          label: key,
          data: data.map(row => row[key]),
          fill: false,
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    ></canvas>
  );
}

export default Chart;
