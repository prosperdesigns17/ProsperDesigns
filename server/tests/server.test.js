'use strict';
/**
 * server/tests/server.test.js
 *
 * Basic automated smoke tests using Node.js built-in test runner (node:test).
 * No extra dependencies needed.
 *
 * Run from the server/ directory:
 *   node --test tests/server.test.js
 *
 * The tests start the Express app on a random port, run HTTP checks,
 * then tear it down. They do NOT depend on a live MongoDB connection
 * for public endpoints (projects/services etc. have DB-fallback responses).
 */

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const path = require('path');
const fs = require('fs');

// ── Bootstrap env (same logic as app.js) ─────────────────────────────────────
const localEnvPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(localEnvPath)) {
  require('dotenv').config({ path: localEnvPath });
} else {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

// ── Helper ────────────────────────────────────────────────────────────────────
/**
 * Make a simple HTTP GET request and return { statusCode, body }
 */
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy(new Error('Request timed out'));
    });
  });
}

/**
 * Make a simple HTTP POST request and return { statusCode, body }
 */
function httpPost(url, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy(new Error('Request timed out'));
    });
    req.write(body);
    req.end();
  });
}

// ── Server lifecycle ──────────────────────────────────────────────────────────
let server;
let BASE_URL;

before(async () => {
  const app = require('../app');
  await new Promise((resolve, reject) => {
    server = app.listen(0, '127.0.0.1', (err) => {
      if (err) return reject(err);
      const { port } = server.address();
      BASE_URL = `http://127.0.0.1:${port}`;
      console.log(`[Test] Server started on ${BASE_URL}`);
      resolve();
    });
  });
  // Give the DB a moment to connect (best-effort for smoke tests)
  await new Promise((r) => setTimeout(r, 2000));
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  console.log('[Test] Server stopped.');
});

// ── Test Suite ────────────────────────────────────────────────────────────────

test('GET / — server root responds with success', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
});

test('GET /api/health — health endpoint responds with status ok', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/api/health`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
  assert.equal(body.data.status, 'ok');
  assert.ok(typeof body.data.uptime === 'number', 'uptime should be a number');
  assert.ok(typeof body.data.mongodb === 'string', 'mongodb state should be a string');
});

test('GET /health — alias health endpoint works', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/health`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
});

test('GET /api/projects — projects endpoint responds', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/api/projects`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
  assert.ok(Array.isArray(body.data), 'data should be an array');
});

test('GET /api/services — services endpoint responds', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/api/services`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
  assert.ok(Array.isArray(body.data), 'data should be an array');
});

test('GET /api/clients — clients endpoint responds', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/api/clients`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
  assert.ok(Array.isArray(body.data), 'data should be an array');
});

test('GET /api/testimonials — testimonials endpoint responds', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/api/testimonials`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
  assert.ok(Array.isArray(body.data), 'data should be an array');
});

test('GET /api/settings — settings endpoint responds', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/api/settings`);
  assert.equal(statusCode, 200);
  assert.equal(body.success, true);
});

test('POST /api/auth/login — invalid credentials return 401', async () => {
  const { statusCode, body } = await httpPost(`${BASE_URL}/api/auth/login`, {
    username: 'wrong_user',
    password: 'wrong_password',
  });
  assert.equal(statusCode, 401);
  assert.equal(body.success, false);
});

test('GET /api/messages — protected endpoint returns 401 without token', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/api/messages`);
  assert.equal(statusCode, 401);
  assert.equal(body.success, false);
});

test('GET /robots.txt — returns valid robots content', async () => {
  const { statusCode, body } = await httpGet(`${BASE_URL}/robots.txt`);
  assert.equal(statusCode, 200);
  assert.ok(typeof body === 'string' && body.includes('User-agent'), 'should return robots.txt content');
});
