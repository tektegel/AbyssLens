// AbyssLens Proxy Server
// Handles CORS, API key protection, WebSocket relay for AISStream

import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';

const app = express();
const PORT = 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

// --- Health Check ---
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), services: ['ais', 'news', 'otx', 'abuseipdb', 'pulsedive'] });
});

// --- NewsData.io Proxy ---
app.get('/api/news', async (req, res) => {
  try {
    const { apikey, q, language } = req.query;
    const url = `https://newsdata.io/api/1/latest?apikey=${apikey}&q=${encodeURIComponent(String(q || 'maritime'))}&language=${language || 'en'}`;
    const r = await fetch(url);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// --- OTX AlienVault Proxy ---
app.get('/api/otx/indicators/:type/:value', async (req, res) => {
  try {
    const { apikey } = req.query;
    const url = `https://otx.alienvault.com/api/v1/indicators/${req.params.type}/${encodeURIComponent(req.params.value)}/general`;
    const r = await fetch(url, { headers: { 'X-OTX-API-KEY': String(apikey) } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

app.get('/api/otx/pulses/search', async (req, res) => {
  try {
    const { apikey, q } = req.query;
    const url = `https://otx.alienvault.com/api/v1/search/pulses?q=${encodeURIComponent(String(q || 'maritime'))}`;
    const r = await fetch(url, { headers: { 'X-OTX-API-KEY': String(apikey) } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

app.get('/api/otx/pulses/subscribed', async (req, res) => {
  try {
    const { apikey } = req.query;
    const url = `https://otx.alienvault.com/api/v1/pulses/subscribed?limit=1`;
    const r = await fetch(url, { headers: { 'X-OTX-API-KEY': String(apikey) } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// --- AbuseIPDB Proxy ---
app.get('/api/abuseipdb/check', async (req, res) => {
  try {
    const { apikey, ipAddress, maxAgeInDays } = req.query;
    const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(String(ipAddress))}&maxAgeInDays=${maxAgeInDays || 90}`;
    const r = await fetch(url, { headers: { Key: String(apikey), Accept: 'application/json' } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// --- PulseDive Proxy ---
app.get('/api/pulsedive/indicator', async (req, res) => {
  try {
    const { key, indicator } = req.query;
    const url = `https://pulsedive.com/api/info.php?indicator=${encodeURIComponent(String(indicator))}&key=${key}`;
    const r = await fetch(url);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

app.get('/api/pulsedive/explore', async (req, res) => {
  try {
    const { key, q, type } = req.query;
    const url = `https://pulsedive.com/api/explore.php?q=${encodeURIComponent(String(q))}&type=${type || 'indicator'}&key=${key}`;
    const r = await fetch(url);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// --- HTTP + WebSocket Server ---
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ais' });

wss.on('connection', (clientWs) => {
  let upstreamWs: WebSocket | null = null;
  console.log('[AIS] Client connected');

  clientWs.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.APIKey) {
        // Connect to AISStream upstream
        if (upstreamWs) upstreamWs.close();
        upstreamWs = new WebSocket('wss://stream.aisstream.io/v0/stream');
        upstreamWs.on('open', () => {
          upstreamWs?.send(JSON.stringify(msg));
          console.log('[AIS] Connected to AISStream');
        });
        upstreamWs.on('message', (data) => {
          if (clientWs.readyState === WebSocket.OPEN) clientWs.send(data.toString());
        });
        upstreamWs.on('error', (e) => {
          console.error('[AIS] Upstream error:', e.message);
          if (clientWs.readyState === WebSocket.OPEN) clientWs.send(JSON.stringify({ error: e.message }));
        });
        upstreamWs.on('close', () => console.log('[AIS] Upstream disconnected'));
      }
    } catch { /* ignore */ }
  });

  clientWs.on('close', () => {
    upstreamWs?.close();
    console.log('[AIS] Client disconnected');
  });
});

// --- Hardware WebSocket endpoint (placeholder) ---
const hwWss = new WebSocketServer({ server, path: '/hardware' });
hwWss.on('connection', (ws) => {
  console.log('[HW] Hardware client connected');
  ws.on('message', (data) => console.log('[HW] Data:', data.toString().substring(0, 100)));
  ws.on('close', () => console.log('[HW] Hardware client disconnected'));
});

// --- IoT MQTT Bridge endpoint (placeholder) ---
const iotWss = new WebSocketServer({ server, path: '/iot' });
iotWss.on('connection', (ws) => {
  console.log('[IoT] IoT client connected');
  ws.on('close', () => console.log('[IoT] IoT client disconnected'));
});

server.listen(PORT, () => {
  console.log(`\n  🌊 AbyssLens Proxy Server running on http://localhost:${PORT}`);
  console.log(`  📡 AIS WebSocket relay: ws://localhost:${PORT}/ais`);
  console.log(`  🔧 Hardware gateway: ws://localhost:${PORT}/hardware`);
  console.log(`  🔌 IoT bridge: ws://localhost:${PORT}/iot\n`);
});
