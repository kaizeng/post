const express = require('express');
const app = express();
const PORT = 4000;

function rand(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function wrap(payload) {
  return { status: 'ok', timestamp: Date.now(), payload };
}

function stockSnapshot() {
  return {
    "Market Overview": {
      "Indices": [
        { index: 'S&P 500', price: rand(4000, 4200), change: rand(-1.5, 1.5) + '%' },
        { index: 'Nasdaq', price: rand(12000, 12500), change: rand(-2.0, 2.0) + '%' },
        { index: 'Dow Jones', price: rand(33000, 34000), change: rand(-1.0, 1.0) + '%' },
        { index: 'Russell 2000', price: rand(1700, 1800), change: rand(-2.5, 2.5) + '%' }
      ],
      "Top Movers": [
        { symbol: 'TSLA', price: rand(200, 220), change: rand(-5, 5) + '%' },
        { symbol: 'NVDA', price: rand(400, 450), change: rand(-4, 4) + '%' },
        { symbol: 'AAPL', price: rand(170, 180), change: rand(-2, 2) + '%' }
      ]
    },
    "Sector Performance": {
      "Sector Chart": {
        display: 'chart',
        chartType: 'bar',
        data: [
          { sector: 'Technology', performance: rand(-2, 3) },
          { sector: 'Healthcare', performance: rand(-1, 2) },
          { sector: 'Finance', performance: rand(-1.5, 2.5) },
          { sector: 'Energy', performance: rand(-3, 3) },
          { sector: 'Consumer', performance: rand(-1, 1) }
        ]
      }
    },
    "Price History": {
      "Intraday Trend": {
        display: 'chart',
        chartType: 'line',
        data: [
          { time: '09:30', price: rand(100, 102) },
          { time: '10:00', price: rand(101, 103) },
          { time: '10:30', price: rand(102, 104) },
          { time: '11:00', price: rand(103, 105) },
          { time: '11:30', price: rand(104, 106) },
          { time: '12:00', price: rand(105, 107) }
        ]
      }
    },
    "Portfolio": {
      "Allocation": {
        display: 'chart',
        chartType: 'pie',
        data: [
          { asset: 'Stocks', value: 60 },
          { asset: 'Bonds', value: 20 },
          { asset: 'Cash', value: 10 },
          { asset: 'Crypto', value: 5 },
          { asset: 'Real Estate', value: 5 }
        ]
      }
    },
    "Dense Data": {
      "Grid Test": [
        { id: 1, symbol: 'A', open: rand(10, 20), high: rand(20, 30), low: rand(5, 10), close: rand(15, 25), vol: rand(1000, 9000), mkt_cap: '1B', pe: rand(10, 50), eps: rand(1, 5), beta: rand(0.5, 1.5) },
        { id: 2, symbol: 'B', open: rand(10, 20), high: rand(20, 30), low: rand(5, 10), close: rand(15, 25), vol: rand(1000, 9000), mkt_cap: '2B', pe: rand(10, 50), eps: rand(1, 5), beta: rand(0.5, 1.5) },
        { id: 3, symbol: 'C', open: rand(10, 20), high: rand(20, 30), low: rand(5, 10), close: rand(15, 25), vol: rand(1000, 9000), mkt_cap: '500M', pe: rand(10, 50), eps: rand(1, 5), beta: rand(0.5, 1.5) },
        { id: 4, symbol: 'D', open: rand(10, 20), high: rand(20, 30), low: rand(5, 10), close: rand(15, 25), vol: rand(1000, 9000), mkt_cap: '10B', pe: rand(10, 50), eps: rand(1, 5), beta: rand(0.5, 1.5) },
        { id: 5, symbol: 'E', open: rand(10, 20), high: rand(20, 30), low: rand(5, 10), close: rand(15, 25), vol: rand(1000, 9000), mkt_cap: '5B', pe: rand(10, 50), eps: rand(-1, 5), beta: rand(0.5, 1.5) }
      ],
      "Large Grid": [
        { id: 101, symbol: 'MSFT', name: 'Microsoft', sector: 'Tech', ind: 'Software', cap: '2.5T', price: 330.50, chg: 5.20, chg_p: '1.5%', vol: '30M', avg_vol: '30M', pe: 30, eps: 10, beta: 0.9, div: '0.8%', high52: 360 },
        { id: 102, symbol: 'AAPL', name: 'Apple Inc', sector: 'Tech', ind: 'Consumer', cap: '2.8T', price: 180.00, chg: -2.50, chg_p: '(1.2%)', vol: '50M', avg_vol: '50M', pe: 28, eps: 6, beta: 1.1, div: '0.5%', high52: 198 },
        { id: 103, symbol: 'GOOGL', name: 'Alphabet', sector: 'Tech', ind: 'Internet', cap: '1.7T', price: 140.20, chg: 3.10, chg_p: '2.1%', vol: '25M', avg_vol: '25M', pe: 25, eps: 5, beta: 1.0, div: '0.0%', high52: 155 },
        { id: 104, symbol: 'AMZN', name: 'Amazon', sector: 'Cons', ind: 'Retail', cap: '1.5T', price: 135.50, chg: -1.20, chg_p: '-0.8%', vol: '40M', avg_vol: '40M', pe: 60, eps: 2, beta: 1.2, div: '0.0%', high52: 150 },
        { id: 105, symbol: 'TSLA', name: 'Tesla Inc', sector: 'Auto', ind: 'Manuf', cap: '800B', price: 245.00, chg: 10.50, chg_p: '4.2%', vol: '100M', avg_vol: '100M', pe: 70, eps: 3, beta: 2.0, div: '0.0%', high52: 300 },
        { id: 106, symbol: 'META', name: 'Meta Plat', sector: 'Tech', ind: 'Internet', cap: '850B', price: 315.00, chg: 5.00, chg_p: '1.6%', vol: '20M', avg_vol: '20M', pe: 22, eps: 12, beta: 1.3, div: '0.0%', high52: 340 },
        { id: 107, symbol: 'NVDA', name: 'NVIDIA', sector: 'Tech', ind: 'Semi', cap: '1.2T', price: 480.00, chg: -5.00, chg_p: '-1.0%', vol: '45M', avg_vol: '45M', pe: 100, eps: 4, beta: 1.8, div: '0.1%', high52: 505 },
        { id: 108, symbol: 'BRK.B', name: 'Berkshire', sector: 'Fin', ind: 'Insure', cap: '780B', price: 360.00, chg: 1.50, chg_p: '0.4%', vol: '3M', avg_vol: '3M', pe: 18, eps: 15, beta: 0.8, div: '2.5%', high52: 160 },
        { id: 109, symbol: 'JPM', name: 'JPMorgan', sector: 'Fin', ind: 'Banks', cap: '450B', price: 150.00, chg: -1.00, chg_p: '-0.6%', vol: '10M', avg_vol: '10M', pe: 10, eps: 14, beta: 1.1, div: '2.5%', high52: 160 },
        { id: 110, symbol: 'V', name: 'Visa Inc', sector: 'Fin', ind: 'Credit', cap: '500B', price: 245.00, chg: 2.00, chg_p: '0.8%', vol: '6M', avg_vol: '6M', pe: 28, eps: 8, beta: 0.9, div: '0.7%', high52: 255 }
      ]
    }
  };
}

function forexSnapshot() {
  return {
    "Major Pairs": {
      "Rates": [
        { pair: 'EUR/USD', bid: rand(1.08, 1.09), ask: rand(1.09, 1.10), spread: '0.2' },
        { pair: 'USD/JPY', bid: rand(140, 142), ask: rand(142, 143), spread: '0.5' },
        { pair: 'GBP/USD', bid: rand(1.25, 1.27), ask: rand(1.27, 1.28), spread: '0.8' },
        { pair: 'USD/CHF', bid: rand(0.88, 0.90), ask: rand(0.90, 0.92), spread: '0.4' }
      ]
    },
    "Analysis": {
      "Currency Strength": {
        display: 'chart',
        chartType: 'bar',
        data: [
          { currency: 'USD', strength: rand(40, 60) },
          { currency: 'EUR', strength: rand(30, 50) },
          { currency: 'GBP', strength: rand(35, 55) },
          { currency: 'JPY', strength: rand(20, 40) }
        ]
      },
      "Volatility Index": {
        display: 'chart',
        chartType: 'line',
        data: [
          { time: 'Mon', vol: rand(10, 15) },
          { time: 'Tue', vol: rand(12, 18) },
          { time: 'Wed', vol: rand(15, 25) },
          { time: 'Thu', vol: rand(14, 20) },
          { time: 'Fri', vol: rand(18, 30) }
        ]
      }
    }
  };
}

function stream(handler) {
  return (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.flushHeaders();
    const interval = setInterval(() => {
      res.write(`data: ${JSON.stringify(wrap(handler()))}\n\n`);
    }, 1000);
    req.on('close', () => clearInterval(interval));
  };
}

// JSON endpoints used by the worker
app.get('/api/app1', (req, res) => {
  res.json(wrap(stockSnapshot()));
});

app.get('/api/app2', (req, res) => {
  res.json(wrap(forexSnapshot()));
});

// Streaming endpoints for demonstration
app.get('/api/stream/app1', stream(stockSnapshot));
app.get('/api/stream/app2', stream(forexSnapshot));

app.listen(PORT, () => {
  console.log(`Example API server running on ${PORT}`);
});

