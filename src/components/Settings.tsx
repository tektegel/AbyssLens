import { useState, useCallback } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Key, Wifi, WifiOff, Loader2, Radio, Cpu, Antenna, Plug, ExternalLink, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import * as api from '../services/apiService';

interface ApiConfig {
  key: keyof typeof SERVICE_META;
  name: string;
  description: string;
  docUrl: string;
  protocol: 'websocket' | 'rest';
  placeholder: string;
}

const SERVICE_META: Record<string, ApiConfig> = {
  aisstream: { key: 'aisstream', name: 'AISStream.io', description: 'Real-time AIS vessel tracking via WebSocket — positions, speed, heading, identity.', docUrl: 'https://aisstream.io/documentation', protocol: 'websocket', placeholder: 'Enter AISStream API key...' },
  newsdata: { key: 'newsdata', name: 'NewsData.io', description: 'Maritime security news feed — piracy, sanctions, incidents, geopolitical events.', docUrl: 'https://newsdata.io/documentation/', protocol: 'rest', placeholder: 'Enter NewsData.io API key...' },
  otx: { key: 'otx', name: 'OTX AlienVault', description: 'Open Threat Exchange — IOC lookups, threat pulses, adversary intelligence.', docUrl: 'https://otx.alienvault.com/api', protocol: 'rest', placeholder: 'Enter OTX API key...' },
  abuseipdb: { key: 'abuseipdb', name: 'AbuseIPDB', description: 'IP reputation scoring — check maritime infrastructure IPs for abuse reports.', docUrl: 'https://www.abuseipdb.com/api', protocol: 'rest', placeholder: 'Enter AbuseIPDB API key...' },
  pulsedive: { key: 'pulsedive', name: 'PulseDive', description: 'Threat intelligence — indicator scanning, risk assessment, feed enrichment.', docUrl: 'https://docs.pulsedive.com', protocol: 'rest', placeholder: 'Enter PulseDive API key...' },
  liveuamap: { key: 'liveuamap', name: 'LiveUAMap', description: 'Real-time conflict monitoring — geospatial incident data, maritime conflict zones, geopolitical events in GeoJSON format.', docUrl: 'https://liveuamap.com/api', protocol: 'rest', placeholder: 'Enter LiveUAMap API key...' },
};

const CONFIG_LABELS: Record<string, string> = {
  frequency: 'Frequency (Hz)', sampleRate: 'Sample Rate', gain: 'Gain (dB)', lnaGain: 'LNA Gain (dB)', vgaGain: 'VGA Gain (dB)', ampEnable: 'Amp Enable',
  ppm: 'PPM Correction', deviceIndex: 'Device Index', rtlAisPath: 'rtl_ais Binary Path',
  port: 'Serial Port', baudRate: 'Baud Rate', dataBits: 'Data Bits', parity: 'Parity', stopBits: 'Stop Bits', sentenceFilter: 'NMEA Sentence Filter',
  antennaType: 'Antenna Model', cableLength: 'Cable Length', cableType: 'Cable Type', connectorType: 'Connector', mountType: 'Mount Type',
  broker: 'MQTT Broker URL', username: 'Username', password: 'Password', topic: 'Root Topic', fuelTopic: 'Fuel Topic', vibrationTopic: 'Vibration Topic', bilgeTopic: 'Bilge Topic', gpsTopic: 'GPS Topic', clientId: 'Client ID', qos: 'QoS Level', keepAlive: 'Keep Alive (s)',
};

export default function Settings() {
  const { apiKeys, setApiKey, apiStatus, setApiStatus, hardware, toggleHardware, updateHardwareConfig } = useAppContext();
  const [editingKeys, setEditingKeys] = useState<Record<string, string>>({});
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);

  const handleSave = useCallback(async (service: keyof typeof SERVICE_META) => {
    const key = editingKeys[service] ?? apiKeys[service as keyof typeof apiKeys];
    if (!key) return;
    setApiKey(service as any, key);
    setEditingKeys(prev => { const n = { ...prev }; delete n[service]; return n; });
    setApiStatus(service as any, { loading: true, error: null });

    setTesting(prev => ({ ...prev, [service]: true }));
    try {
      let success = false;
      switch (service) {
        case 'newsdata': success = await api.testNewsDataConnection(key); break;
        case 'otx': success = await api.testOTXConnection(key); break;
        case 'abuseipdb': success = await api.testAbuseIPDBConnection(key); break;
        case 'pulsedive': success = await api.testPulseDiveConnection(key); break;
        case 'aisstream': success = !!key; break;
        case 'liveuamap': success = !!key; break;
      }
      setApiStatus(service as any, { connected: success, loading: false, error: success ? null : 'Connection failed', lastSync: success ? new Date().toISOString() : null });
    } catch (e: any) {
      setApiStatus(service as any, { connected: false, loading: false, error: e.message });
    }
    setTesting(prev => ({ ...prev, [service]: false }));
  }, [editingKeys, apiKeys, setApiKey, setApiStatus]);

  return (
    <div className="p-8 h-full flex flex-col w-full overflow-y-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
          <SettingsIcon className="w-6 h-6 mr-3 text-secondary" /> Platform Configuration
        </h2>
        <p className="text-secondary font-mono text-sm mt-1">Configure API keys, hardware integrations, IoT bridges, and threat triage rules</p>
      </header>

      <div className="max-w-5xl space-y-6">

        {/* === API Integrations === */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-mono text-slate-200 uppercase mb-6 flex items-center border-b border-border/50 pb-2">
            <Key className="w-4 h-4 mr-2 text-accent" /> API Integrations
          </h3>
          <p className="text-xs text-secondary mb-6 font-mono">Paste your API key and click Save — the service will auto-connect. All keys stored locally, proxied through backend.</p>
          <div className="space-y-5">
            {Object.values(SERVICE_META).map(svc => {
              const status = apiStatus[svc.key as keyof typeof apiStatus];
              const savedKey = apiKeys[svc.key as keyof typeof apiKeys];
              const editValue = editingKeys[svc.key] ?? '';
              const isEditing = svc.key in editingKeys;
              const isTesting = testing[svc.key];

              return (
                <div key={svc.key} className="p-4 bg-surface/50 border border-border/50 rounded-lg hover:border-border transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-bold text-slate-200">{svc.name}</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-border text-secondary">{svc.protocol === 'websocket' ? 'WebSocket' : 'REST'}</span>
                        <a href={svc.docUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors"><ExternalLink className="w-3 h-3" /></a>
                      </div>
                      <p className="text-xs text-secondary">{svc.description}</p>
                    </div>
                    <div className="shrink-0 ml-4">
                      {isTesting || status?.loading ? (
                        <span className="flex items-center px-2.5 py-1 text-[10px] uppercase font-bold rounded bg-accent/20 text-accent border border-accent/30 animate-pulse"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Testing...</span>
                      ) : status?.connected ? (
                        <span className="flex items-center px-2.5 py-1 text-[10px] uppercase font-bold rounded bg-safe/20 text-safe border border-safe/30"><CheckCircle2 className="w-3 h-3 mr-1" /> Connected</span>
                      ) : status?.error ? (
                        <span className="flex items-center px-2.5 py-1 text-[10px] uppercase font-bold rounded bg-danger/20 text-danger border border-danger/30"><XCircle className="w-3 h-3 mr-1" /> Error</span>
                      ) : savedKey ? (
                        <span className="flex items-center px-2.5 py-1 text-[10px] uppercase font-bold rounded bg-warning/20 text-warning border border-warning/30"><WifiOff className="w-3 h-3 mr-1" /> Saved</span>
                      ) : (
                        <span className="flex items-center px-2.5 py-1 text-[10px] uppercase font-bold rounded bg-surface text-secondary border border-border"><WifiOff className="w-3 h-3 mr-1" /> Not Set</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type={isEditing ? 'text' : 'password'}
                      value={isEditing ? editValue : savedKey ? '•'.repeat(Math.min(savedKey.length, 32)) : ''}
                      onChange={(e) => setEditingKeys(prev => ({ ...prev, [svc.key]: e.target.value }))}
                      onFocus={() => { if (!(svc.key in editingKeys)) setEditingKeys(prev => ({ ...prev, [svc.key]: savedKey || '' })); }}
                      placeholder={svc.placeholder}
                      className="flex-1 bg-background border border-border p-2.5 rounded text-xs font-mono text-slate-200 outline-none focus:border-accent transition-colors placeholder:text-secondary/50"
                    />
                    <button
                      onClick={() => handleSave(svc.key as any)}
                      disabled={isTesting}
                      className="px-4 py-2 bg-accent/10 border border-accent/40 text-accent text-xs font-mono font-bold uppercase rounded hover:bg-accent hover:text-[#0A0F1A] transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    >
                      Save
                    </button>
                  </div>
                  {status?.error && <p className="text-[10px] text-danger mt-2 font-mono">⚠ {status.error}</p>}
                  {status?.lastSync && <p className="text-[10px] text-safe/70 mt-1 font-mono">Last sync: {new Date(status.lastSync).toLocaleString()}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* === Hardware Integrations === */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-mono text-slate-200 uppercase mb-4 flex items-center border-b border-border/50 pb-2">
            <Radio className="w-4 h-4 mr-2 text-warning" /> Hardware Integrations
          </h3>
          <p className="text-xs text-secondary mb-4 font-mono">Configure AIS receivers, SDR devices, serial NMEA sources, and IoT sensor bridges. Enable a device and configure its parameters below.</p>
          <div className="space-y-3">
            {hardware.map(device => {
              const isExpanded = expandedDevice === device.id;
              return (
                <div key={device.id} className={`bg-surface/50 border rounded-lg transition-all ${device.enabled ? 'border-accent/30' : 'border-border/50'}`}>
                  {/* Header Row */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${device.enabled ? 'bg-accent/20 text-accent' : 'bg-surface text-secondary'} transition-colors`}>
                        {device.type === 'hackrf' || device.type === 'rtlsdr' ? <Antenna className="w-4 h-4" /> :
                         device.type === 'iot_mqtt' ? <Plug className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-200">{device.name}</div>
                        <div className="text-[10px] text-secondary font-mono truncate">{device.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0 ml-3">
                      {device.connected && <span className="text-[10px] text-safe font-mono flex items-center"><Wifi className="w-3 h-3 mr-1" /> LIVE</span>}
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleHardware(device.id)}
                        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${device.enabled ? 'bg-accent' : 'bg-[#1E293B] border border-border'}`}
                      >
                        <span className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-md transition-transform duration-200 ${device.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                      {/* Expand Button */}
                      <button 
                        onClick={() => setExpandedDevice(isExpanded ? null : device.id)}
                        className="p-1.5 text-secondary hover:text-slate-200 transition-colors rounded hover:bg-surface"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Config Panel */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-border/30 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(device.config).map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-[10px] font-mono text-secondary uppercase mb-1">{CONFIG_LABELS[key] || key}</label>
                            <input
                              type={key === 'password' ? 'password' : 'text'}
                              value={value}
                              onChange={(e) => updateHardwareConfig(device.id, { [key]: e.target.value })}
                              className="w-full bg-background border border-border p-2 rounded text-xs font-mono text-slate-200 outline-none focus:border-accent transition-colors"
                            />
                          </div>
                        ))}
                      </div>
                      {device.enabled && (
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[10px] text-secondary font-mono">
                            {device.lastData ? `Last data: ${device.lastData}` : 'Waiting for data...'}
                          </span>
                          <button className="px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent text-[10px] font-mono font-bold uppercase rounded hover:bg-accent hover:text-[#0A0F1A] transition-all">
                            Test Connection
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* === Threat Triage Rules === */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-mono text-slate-200 uppercase mb-4 flex items-center border-b border-border/50 pb-2">
            <Shield className="w-4 h-4 mr-2 text-warning" /> Threat Triage Rules
          </h3>
          <div className="space-y-4 text-sm">
            <label className="flex items-center space-x-3 text-slate-300 cursor-pointer"><input type="checkbox" defaultChecked className="accent-accent w-4 h-4" /><span>Auto-escalate alerts matching named APT groups in Telegram leaks</span></label>
            <label className="flex items-center space-x-3 text-slate-300 cursor-pointer"><input type="checkbox" defaultChecked className="accent-accent w-4 h-4" /><span>Flag vessels with AIS spoofing probability &gt; 70% as HIGH-RISK instantly</span></label>
            <label className="flex items-center space-x-3 text-slate-300 cursor-pointer"><input type="checkbox" className="accent-accent w-4 h-4" /><span>Mute alerts for vessels currently in safe harbor zones (Geofenced)</span></label>
            <label className="flex items-center space-x-3 text-slate-300 cursor-pointer"><input type="checkbox" defaultChecked className="accent-accent w-4 h-4" /><span>Cross-correlate OSINT leaks with AIS anomalies automatically</span></label>
            <label className="flex items-center space-x-3 text-slate-300 cursor-pointer"><input type="checkbox" defaultChecked className="accent-accent w-4 h-4" /><span>Trigger IoT sensor validation on any AIS dark event</span></label>
            <label className="flex items-center space-x-3 text-slate-300 cursor-pointer"><input type="checkbox" defaultChecked className="accent-accent w-4 h-4" /><span>Enrich LiveUAMap conflict zone events with vessel proximity data</span></label>
          </div>
        </div>

        {/* === Notification Delivery === */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-mono text-slate-200 uppercase mb-4 flex items-center border-b border-border/50 pb-2">
            <Bell className="w-4 h-4 mr-2 text-danger" /> Notification Delivery
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-3 bg-surface/50 border border-border/50 rounded"><span className="text-slate-300">SOC PagerDuty Integration</span><span className="px-2 py-1 bg-safe/20 text-safe text-xs uppercase font-bold rounded">Connected</span></div>
            <div className="flex items-center justify-between text-sm p-3 bg-surface/50 border border-border/50 rounded"><span className="text-slate-300">Slack "#sec-maritime-alerts"</span><span className="px-2 py-1 bg-safe/20 text-safe text-xs uppercase font-bold rounded">Connected</span></div>
            <div className="flex items-center justify-between text-sm p-3 bg-surface/50 border border-border/50 rounded"><span className="text-slate-300">Email — SOC Team Distribution</span><span className="px-2 py-1 bg-safe/20 text-safe text-xs uppercase font-bold rounded">Connected</span></div>
            <div className="flex items-center justify-between text-sm p-3 bg-surface/50 border border-border/50 rounded"><span className="text-slate-300">Telegram Bot — @AbyssLensAlert</span><span className="px-2 py-1 bg-safe/20 text-safe text-xs uppercase font-bold rounded">Connected</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}
