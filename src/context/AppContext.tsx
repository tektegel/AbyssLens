import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// --- Types ---

export type AppMode = 'live' | 'demo';
export type DemoScenario = 1 | 2 | 3 | 4;

export interface ApiStatus {
  connected: boolean;
  loading: boolean;
  error: string | null;
  lastSync: string | null;
}

export interface HardwareDevice {
  id: string;
  name: string;
  type: 'hackrf' | 'rtlsdr' | 'serial_nmea' | 'ais_antenna' | 'iot_mqtt';
  enabled: boolean;
  connected: boolean;
  config: Record<string, string>;
  lastData: string | null;
  description: string;
}

export interface ApiKeys {
  aisstream: string;
  newsdata: string;
  otx: string;
  abuseipdb: string;
  pulsedive: string;
  liveuamap: string;
}

export interface AppState {
  mode: AppMode;
  activeScenario: DemoScenario;
  apiStatus: Record<keyof ApiKeys, ApiStatus>;
  apiKeys: ApiKeys;
  hardware: HardwareDevice[];
}

interface AppContextType extends AppState {
  setMode: (mode: AppMode) => void;
  setActiveScenario: (s: DemoScenario) => void;
  setApiKey: (service: keyof ApiKeys, key: string) => void;
  setApiStatus: (service: keyof ApiKeys, status: Partial<ApiStatus>) => void;
  toggleHardware: (id: string) => void;
  updateHardwareConfig: (id: string, config: Record<string, string>) => void;
}

// --- Helpers ---

const STORAGE_KEY = 'abysslens_api_keys';

function loadApiKeys(): ApiKeys {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { aisstream: '', newsdata: '', otx: '', abuseipdb: '', pulsedive: '', liveuamap: '' };
}

function saveApiKeys(keys: ApiKeys) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

const defaultStatus: ApiStatus = { connected: false, loading: false, error: null, lastSync: null };

const defaultHardware: HardwareDevice[] = [
  { id: 'hackrf', name: 'HackRF One SDR', type: 'hackrf', enabled: false, connected: false, description: 'Software Defined Radio for AIS channel demodulation at 161.975 / 162.025 MHz. Requires hackrf_transfer binary.', config: { frequency: '161975000', sampleRate: '2000000', gain: '40', lnaGain: '32', vgaGain: '20', ampEnable: '0' }, lastData: null },
  { id: 'rtlsdr', name: 'RTL-SDR v3 Dongle', type: 'rtlsdr', enabled: false, connected: false, description: 'Low-cost SDR receiver for AIS monitoring. Uses rtl_ais for direct NMEA sentence decoding.', config: { frequency: '162025000', gain: '42', ppm: '0', deviceIndex: '0', rtlAisPath: '/usr/local/bin/rtl_ais' }, lastData: null },
  { id: 'serial_nmea', name: 'Serial NMEA Input', type: 'serial_nmea', enabled: false, connected: false, description: 'RS-232/USB serial NMEA 0183 feed from AIS transponder, GPS receiver, or navigation bus.', config: { port: 'COM3', baudRate: '38400', dataBits: '8', parity: 'none', stopBits: '1', sentenceFilter: 'AIVDM,AIVDO,GPGGA,GPRMC' }, lastData: null },
  { id: 'ais_antenna', name: 'GP-3E VHF Antenna', type: 'ais_antenna', enabled: false, connected: false, description: 'External VHF marine antenna for shore-based AIS reception. Connect to SDR or dedicated AIS receiver.', config: { antennaType: 'GP-3E Collinear', gain: '6dBi', cableLength: '10m', cableType: 'RG-58', connectorType: 'SMA-Male', mountType: 'Mast/Roof' }, lastData: null },
  { id: 'iot_mqtt', name: 'IoT MQTT Bridge', type: 'iot_mqtt', enabled: false, connected: false, description: 'MQTT bridge receiving fleet IoT sensor telemetry (fuel, vibration, bilge, GPS integrity) via broker.', config: { broker: 'mqtt://localhost:1883', username: '', password: '', topic: 'fleet/sensors/#', fuelTopic: 'fleet/sensors/+/fuel', vibrationTopic: 'fleet/sensors/+/vibration', bilgeTopic: 'fleet/sensors/+/bilge', gpsTopic: 'fleet/sensors/+/gps', clientId: 'abysslens-iot-bridge', qos: '1', keepAlive: '60' }, lastData: null },
];

// --- Context ---

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('demo');
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(1);
  const [apiKeys, setApiKeysState] = useState<ApiKeys>(loadApiKeys);
  const [apiStatus, setApiStatusState] = useState<Record<keyof ApiKeys, ApiStatus>>({
    aisstream: { ...defaultStatus },
    newsdata: { ...defaultStatus },
    otx: { ...defaultStatus },
    abuseipdb: { ...defaultStatus },
    pulsedive: { ...defaultStatus },
    liveuamap: { ...defaultStatus },
  });
  const [hardware, setHardware] = useState<HardwareDevice[]>(defaultHardware);

  const setApiKey = useCallback((service: keyof ApiKeys, key: string) => {
    setApiKeysState(prev => {
      const next = { ...prev, [service]: key };
      saveApiKeys(next);
      return next;
    });
  }, []);

  const setApiStatus = useCallback((service: keyof ApiKeys, status: Partial<ApiStatus>) => {
    setApiStatusState(prev => ({ ...prev, [service]: { ...prev[service], ...status } }));
  }, []);

  const toggleHardware = useCallback((id: string) => {
    setHardware(prev => prev.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d));
  }, []);

  const updateHardwareConfig = useCallback((id: string, config: Record<string, string>) => {
    setHardware(prev => prev.map(d => d.id === id ? { ...d, config: { ...d.config, ...config } } : d));
  }, []);

  return (
    <AppContext.Provider value={{
      mode, setMode,
      activeScenario, setActiveScenario,
      apiKeys, setApiKey,
      apiStatus, setApiStatus,
      hardware, toggleHardware, updateHardwareConfig,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
