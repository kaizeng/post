const path = require('path');
const { spawn } = require('child_process');
const request = require('supertest');

let apiProc; // example API server
let serverProc; // main server

// utility to wait for endpoint to respond
const waitFor = async (fn, timeout = 10000, interval = 200) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fn();
      return res;
    } catch (err) {
      await new Promise(res => setTimeout(res, interval));
    }
  }
  throw new Error('Timeout waiting for server');
};

beforeAll(async () => {
  apiProc = spawn('node', [path.join(__dirname, '../example-app/example-api-app.js')], { stdio: 'ignore' });
  serverProc = spawn('node', [path.join(__dirname, '../server.js')], { stdio: 'ignore', env: { ...process.env, PORT: 3000 } });
  await waitFor(() => request('http://localhost:3000').get('/api/apps'));
});

afterAll(() => {
  if (serverProc) serverProc.kill();
  if (apiProc) apiProc.kill();
});

test('GET /api/apps returns configured app names', async () => {
  const res = await request('http://localhost:3000').get('/api/apps');
  expect(res.status).toBe(200);
  expect(res.body).toEqual(expect.arrayContaining(['AppOne', 'AppTwo']));
});

test('GET /api/data/:appName returns cached data', async () => {
  await waitFor(() => request('http://localhost:3000').get('/api/data/AppOne'));
  const res = await request('http://localhost:3000').get('/api/data/AppOne');
  expect(res.status).toBe(200);
  expect(res.body.name).toBe('AppOne');
  expect(res.body.payload.status).toBe('ok');
});
