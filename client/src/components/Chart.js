// client/src/components/Chart.js
// Updated to properly destroy previous Chart instances and avoid "Canvas is already in use" errors


import React, { useEffect, useRef } from 'react';
import ChartJS from 'chart.js/auto';
function Chart({ data, type = 'line', height = 300 }) {

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

    const keys = Object.keys(data[0]);
    const numericKeys = keys.filter(k => typeof data[0][k] === 'number');
    const labelKey = keys.find(k => typeof data[0][k] !== 'number');

    chartInstanceRef.current = new ChartJS(ctx, {
      type,
      data: {
        labels: labelKey ? data.map(row => row[labelKey]) : data.map((_, i) => i),
        datasets: numericKeys.map(key => ({
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
  }, [data, type]);


  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </div>
  );
}


export default Chart;
