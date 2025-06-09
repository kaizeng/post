const { parentPort, workerData } = require('worker_threads');
const fetch = require('node-fetch');

const { name, rest_api_url, auto_request_freq } = workerData;

async function fetchAndPost() {
  try {
    const resp = await fetch(rest_api_url);
    const data = await resp.json();
    parentPort.postMessage({ name, timestamp: Date.now(), payload: data });
  } catch (err) {
    console.error(`Error fetching for ${name}:`, err);
  }
}

// initial fetch
fetchAndPost();
// schedule repeated fetches
setInterval(fetchAndPost, auto_request_freq);