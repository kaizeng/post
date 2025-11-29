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

    const keys = Object.keys(data[0]);
    const numericKeys = keys.filter(k => typeof data[0][k] === 'number');
    const labelKey = keys.find(k => typeof data[0][k] !== 'number');

    // Bloomberg Theme Colors
    const colors = [
      'rgba(255, 153, 0, 1)',    // Bloomberg Amber
      'rgba(0, 255, 0, 1)',      // Bright Green
      'rgba(0, 191, 255, 1)',    // Deep Sky Blue
      'rgba(255, 0, 0, 1)',      // Bright Red
      'rgba(255, 255, 0, 1)',    // Yellow
      'rgba(255, 0, 255, 1)',    // Magenta
    ];

    const borderColors = colors;

    chartInstanceRef.current = new ChartJS(ctx, {
      type,
      data: {
        labels: labelKey ? data.map(row => row[labelKey]) : data.map((_, i) => i),
        datasets: numericKeys.map((key, index) => {
          const isPie = type === 'pie' || type === 'doughnut';
          const bg = isPie ? colors : colors[index % colors.length];
          const border = isPie ? borderColors : borderColors[index % borderColors.length];

          return {
            label: key,
            data: data.map(row => row[key]),
            backgroundColor: bg,
            borderColor: border,
            borderWidth: 1.5,
            pointBackgroundColor: '#000000',
            pointBorderColor: border,
            pointRadius: 3,
            fill: type === 'area',
            tension: 0.2
          };
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#ff9900',
              font: { family: "'Roboto Mono', monospace", size: 11 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            titleColor: '#ff9900',
            bodyColor: '#ffffff',
            borderColor: '#333333',
            borderWidth: 1,
            titleFont: { family: "'Roboto Mono', monospace" },
            bodyFont: { family: "'Roboto Mono', monospace" }
          }
        },
        scales: type === 'pie' ? {} : {
          x: {
            ticks: {
              color: '#ff9900',
              font: { family: "'Roboto Mono', monospace", size: 10 }
            },
            grid: {
              color: '#333333',
              borderColor: '#ff9900'
            }
          },
          y: {
            ticks: {
              color: '#ff9900',
              font: { family: "'Roboto Mono', monospace", size: 10 }
            },
            grid: {
              color: '#333333',
              borderColor: '#ff9900'
            }
          }
        }
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
