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
    key1: {
      sub_key1: [
        { symbol: 'AAA', price: rand(100, 150) },
        { symbol: 'BBB', price: rand(200, 250) }
      ],
      sub_key2: [
        { metric: 'volume', value: rand(1000, 5000) },
        { metric: 'pe_ratio', value: rand(10, 20) }
      ]
    },
    key2: {
      sub_key3: [
        { sector: 'Tech', change: rand(-5, 5) },
        { sector: 'Finance', change: rand(-5, 5) }
      ]
    }
  };
}

function forexSnapshot() {
  return {
    key1: {
      sub_key1: [
        { pair: 'EUR/USD', rate: rand(1.05, 1.15) },
        { pair: 'USD/JPY', rate: rand(109, 111) }
      ],
      sub_key2: [
        { pair: 'GBP/USD', rate: rand(1.2, 1.3) },
        { pair: 'USD/CAD', rate: rand(1.25, 1.35) }
      ]
    },
    key2: {
      sub_key3: [
        { pair: 'AUD/USD', rate: rand(0.7, 0.8) }
      ]
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

