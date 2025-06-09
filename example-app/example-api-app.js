const express = require('express');
const app = express();
const PORT = 4000;

// Example data payload for AppOne
const exampleData = {
  status: 'ok',
  timestamp: Date.now(),
  payload: {
    key1: {
      sub_key1: [
        { id: 1, value: 42 },
        { id: 2, value: 84 }
      ],
      sub_key2: [
        { name: 'Alice', score: 95 },
        { name: 'Bob', score: 88 }
      ]
    },
    key2: {
      sub_key3: [
        { category: 'X', amount: 123 },
        { category: 'Y', amount: 456 }
      ]
    }
  }
};

// Define the endpoint
app.get('/api/app1', (req, res) => {
  res.json(exampleData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Example API server running at http://localhost:${PORT}/api/app1`);
});

