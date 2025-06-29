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
    market: 'stocks',
    quotes: [
      { symbol: 'AAA', price: rand(100, 150) },
      { symbol: 'BBB', price: rand(200, 250) }
    ]
  };
}

function forexSnapshot() {
  return {
    market: 'forex',
    rates: [
      { pair: 'EUR/USD', rate: rand(1.05, 1.15) },
      { pair: 'USD/JPY', rate: rand(109, 111) }
    ]
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

