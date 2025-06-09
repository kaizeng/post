const express = require('express');
const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');
const chokidar = require('chokidar');

const app = express();
const PORT = process.env.PORT || 3000;
const configPath = path.resolve(__dirname, 'apps_config.json');
let config = {};
let workers = {};
let cache = {};

// load config and spawn workers
function loadConfig() {
  const raw = fs.readFileSync(configPath);
  const newConfig = JSON.parse(raw);

  // remove old workers
  Object.keys(workers).forEach(name => {
    if (!newConfig[name]) {
      workers[name].terminate();
      delete workers[name];
      delete cache[name];
    }
  });

  // add/update workers
  Object.entries(newConfig).forEach(([name, info]) => {
    if (!workers[name] || JSON.stringify(config[name]) !== JSON.stringify(info)) {
      if (workers[name]) workers[name].terminate();

      // spawn worker thread for this app
      const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
        workerData: { name, ...info }
      });

      worker.on('message', data => {
        cache[name] = data;
      });
      worker.on('error', err => console.error(`Worker ${name} error:`, err));
      workers[name] = worker;
    }
  });

  config = newConfig;
}

// watch config file for changes
chokidar.watch(configPath).on('change', () => {
  console.log('apps_config.json changed, reloading...');
  loadConfig();
});
// initial load
loadConfig();

// serve static React build
//app.use(express.static(path.join(__dirname, 'client', 'build')));

// API: list apps
app.get('/api/apps', (req, res) => {
  res.json(Object.keys(config));
});

// API: get cached data for one app
app.get('/api/data/:appName', (req, res) => {
  const { appName } = req.params;
  if (!cache[appName]) return res.status(404).json({ error: 'App not found' });
  res.json(cache[appName]);
});

// all other routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));