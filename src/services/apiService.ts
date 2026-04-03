// AbyssLens API Service Layer
// Routes all API calls through local proxy server (localhost:3001) to protect keys

const PROXY_BASE = 'http://localhost:3001';
const WS_PROXY_BASE = 'ws://localhost:3001';

// --- AISStream.io (WebSocket) ---

export interface AISMessage {
  MessageType: string;
  MetaData: {
    MMSI: number;
    ShipName: string;
    latitude: number;
    longitude: number;
    time_utc: string;
  };
  Message: Record<string, any>;
}

export function connectAISStream(
  apiKey: string,
  boundingBoxes: number[][][],
  onMessage: (msg: AISMessage) => void,
  onStatus: (status: { connected: boolean; error: string | null }) => void
): () => void {
  let ws: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  function connect() {
    ws = new WebSocket(`${WS_PROXY_BASE}/ais`);

    ws.onopen = () => {
      ws?.send(JSON.stringify({
        APIKey: apiKey,
        BoundingBoxes: boundingBoxes,
        FilterMessageTypes: ['PositionReport', 'ShipStaticData', 'StandardClassBPositionReport']
      }));
      onStatus({ connected: true, error: null });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch { /* ignore parse errors */ }
    };

    ws.onerror = () => {
      onStatus({ connected: false, error: 'WebSocket connection error' });
    };

    ws.onclose = () => {
      onStatus({ connected: false, error: null });
      reconnectTimer = setTimeout(connect, 5000);
    };
  }

  connect();

  return () => {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    ws?.close();
  };
}

// --- NewsData.io ---

export interface NewsArticle {
  article_id: string;
  title: string;
  description: string;
  content: string;
  pubDate: string;
  source_name: string;
  source_url: string;
  image_url: string | null;
  category: string[];
  country: string[];
  language: string;
  link: string;
}

export async function fetchMaritimeNews(
  apiKey: string,
  query: string = 'maritime security OR shipping attack OR vessel hijack OR maritime cyber',
  language: string = 'en'
): Promise<NewsArticle[]> {
  const params = new URLSearchParams({ apikey: apiKey, q: query, language });
  const res = await fetch(`${PROXY_BASE}/api/news?${params}`);
  if (!res.ok) throw new Error(`NewsData API error: ${res.status}`);
  const data = await res.json();
  return data.results || [];
}

// --- OTX AlienVault ---

export interface OTXPulse {
  id: string;
  name: string;
  description: string;
  created: string;
  modified: string;
  tags: string[];
  adversary: string;
  targeted_countries: string[];
  indicators: OTXIndicator[];
}

export interface OTXIndicator {
  id: number;
  indicator: string;
  type: string;
  created: string;
  description: string;
}

export async function queryOTXIndicator(
  apiKey: string,
  type: 'IPv4' | 'IPv6' | 'domain' | 'hostname' | 'url' | 'FileHash-MD5' | 'FileHash-SHA1' | 'FileHash-SHA256',
  value: string
): Promise<any> {
  const params = new URLSearchParams({ apikey: apiKey });
  const res = await fetch(`${PROXY_BASE}/api/otx/indicators/${type}/${encodeURIComponent(value)}?${params}`);
  if (!res.ok) throw new Error(`OTX API error: ${res.status}`);
  return res.json();
}

export async function queryOTXPulses(apiKey: string, query: string): Promise<OTXPulse[]> {
  const params = new URLSearchParams({ apikey: apiKey, q: query });
  const res = await fetch(`${PROXY_BASE}/api/otx/pulses/search?${params}`);
  if (!res.ok) throw new Error(`OTX API error: ${res.status}`);
  const data = await res.json();
  return data.results || [];
}

// --- AbuseIPDB ---

export interface AbuseIPDBResult {
  ipAddress: string;
  isPublic: boolean;
  ipVersion: number;
  isWhitelisted: boolean;
  abuseConfidenceScore: number;
  countryCode: string;
  usageType: string;
  isp: string;
  domain: string;
  totalReports: number;
  numDistinctUsers: number;
  lastReportedAt: string;
}

export async function checkIPReputation(apiKey: string, ip: string, maxAge: number = 90): Promise<AbuseIPDBResult> {
  const params = new URLSearchParams({ apikey: apiKey, ipAddress: ip, maxAgeInDays: String(maxAge) });
  const res = await fetch(`${PROXY_BASE}/api/abuseipdb/check?${params}`);
  if (!res.ok) throw new Error(`AbuseIPDB API error: ${res.status}`);
  const data = await res.json();
  return data.data;
}

// --- PulseDive ---

export interface PulseDiveIndicator {
  iid: number;
  indicator: string;
  type: string;
  risk: string;
  risk_recommended: string;
  manualrisk: number;
  stamp_added: string;
  stamp_updated: string;
  stamp_seen: string;
  stamp_probed: string;
  summary: { properties: Record<string, any>; threats: any[] };
}

export async function queryPulseDive(apiKey: string, indicator: string): Promise<PulseDiveIndicator> {
  const params = new URLSearchParams({ key: apiKey, indicator });
  const res = await fetch(`${PROXY_BASE}/api/pulsedive/indicator?${params}`);
  if (!res.ok) throw new Error(`PulseDive API error: ${res.status}`);
  return res.json();
}

export async function searchPulseDive(apiKey: string, query: string): Promise<any> {
  const params = new URLSearchParams({ key: apiKey, q: query, type: 'indicator' });
  const res = await fetch(`${PROXY_BASE}/api/pulsedive/explore?${params}`);
  if (!res.ok) throw new Error(`PulseDive API error: ${res.status}`);
  return res.json();
}

// --- Test Connections ---

export async function testNewsDataConnection(apiKey: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ apikey: apiKey, q: 'test', language: 'en' });
    const res = await fetch(`${PROXY_BASE}/api/news?${params}`);
    return res.ok;
  } catch { return false; }
}

export async function testOTXConnection(apiKey: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ apikey: apiKey });
    const res = await fetch(`${PROXY_BASE}/api/otx/pulses/subscribed?${params}`);
    return res.ok;
  } catch { return false; }
}

export async function testAbuseIPDBConnection(apiKey: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ apikey: apiKey, ipAddress: '8.8.8.8', maxAgeInDays: '90' });
    const res = await fetch(`${PROXY_BASE}/api/abuseipdb/check?${params}`);
    return res.ok;
  } catch { return false; }
}

export async function testPulseDiveConnection(apiKey: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ key: apiKey, indicator: '8.8.8.8' });
    const res = await fetch(`${PROXY_BASE}/api/pulsedive/indicator?${params}`);
    return res.ok;
  } catch { return false; }
}
