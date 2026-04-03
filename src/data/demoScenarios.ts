// ============================================================
// AbyssLens Demo Scenarios — 3 Ultra-Realistic Threat Campaigns
// ============================================================

export interface DemoVessel {
  id: string; mmsi: string; name: string; lat: number; lng: number;
  status: 'safe' | 'suspicious' | 'high-risk'; rScore: number;
  type: string; flag: string; dest: string; speed: number;
  imo?: string; callSign?: string; heading?: number;
  trail?: { lat: number; lng: number; ts: string }[];
}

export interface DemoIntel {
  id: number; type: 'leak' | 'anomaly' | 'scan' | 'threat' | 'news';
  level: 'high' | 'medium' | 'low'; title: string; vessel: string;
  time: string; source: string; details: string; iocs?: string[];
}

export interface DemoNews {
  id: string; title: string; summary: string; source: string;
  date: string; region: string; sentiment: 'negative' | 'neutral' | 'positive';
  relatedVessels: string[];
}

export interface DemoExposure {
  ip: string; port: string; service: string; system: string;
  vessel: string; confidence: number; severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface DemoIOC {
  indicator: string; type: 'ip' | 'domain' | 'hash' | 'email';
  risk: 'critical' | 'high' | 'medium' | 'low'; source: string;
  description: string; relatedVessel: string;
}

export interface DemoSensor {
  vesselName: string; sensorType: 'fuel' | 'vibration' | 'bilge' | 'gps';
  value: number; unit: string; threshold: number; alarm: boolean;
  timestamp: string;
}

export interface DemoCorrelationNode {
  id: string; label: string; type: 'vessel' | 'ip' | 'credential' | 'ioc' | 'news' | 'sensor' | 'threat';
  x: number; y: number; risk?: 'high' | 'medium' | 'low';
}

export interface DemoCorrelationEdge {
  from: string; to: string; label: string; type: 'correlates' | 'compromised' | 'detected' | 'reported';
}

export interface DemoScenario {
  id: number; name: string; codename: string; description: string;
  region: string; threatType: string;
  vessels: DemoVessel[]; intelligence: DemoIntel[]; news: DemoNews[];
  exposures: DemoExposure[]; iocs: DemoIOC[]; sensors: DemoSensor[];
  correlationNodes: DemoCorrelationNode[]; correlationEdges: DemoCorrelationEdge[];
  metrics: { totalVessels: number; activeThreats: number; criticalAlerts: number; exposedSystems: number; coverage: number };
}

// ===========================
// SCENARIO 1: Gulf of Guinea
// ===========================
const scenario1: DemoScenario = {
  id: 1, name: 'Gulf of Guinea — Pirate-Enabled Cyber-Physical Attack', codename: 'OPERATION DARK TIDE',
  description: 'A coordinated cyber-physical attack on an oil tanker in the Gulf of Guinea. Digital credential leaks preceded a physical boarding and engine control system compromise.',
  region: 'West Africa', threatType: 'Piracy + Cyber-Physical',
  vessels: [
    { id: 'IMO-9353821', mmsi: '636019825', name: 'EBONY MARINER', lat: 4.05, lng: 9.70, status: 'high-risk', rScore: 0.94, type: 'Oil Tanker', flag: 'LBR', dest: 'Douala', speed: 0.0, callSign: 'A8KQ7', heading: 145, trail: [{lat:4.12,lng:9.55,ts:'-6h'},{lat:4.10,lng:9.60,ts:'-4h'},{lat:4.08,lng:9.65,ts:'-2h'},{lat:4.05,lng:9.70,ts:'now'}] },
    { id: 'IMO-8812453', mmsi: '636091001', name: 'SAHEL GUARDIAN', lat: 4.08, lng: 9.68, status: 'suspicious', rScore: 0.72, type: 'Support Vessel', flag: 'CMR', dest: 'Limbe', speed: 3.2, heading: 220 },
    { id: 'IMO-UNKNOWN-1', mmsi: '667001234', name: 'FISHING VESSEL 01', lat: 4.06, lng: 9.72, status: 'suspicious', rScore: 0.65, type: 'Fishing Vessel', flag: 'NGA', dest: '', speed: 5.1, heading: 180 },
    { id: 'IMO-UNKNOWN-2', mmsi: '667005678', name: 'FISHING VESSEL 02', lat: 4.03, lng: 9.74, status: 'suspicious', rScore: 0.58, type: 'Fishing Vessel', flag: 'NGA', dest: '', speed: 4.8, heading: 195 },
    { id: 'IMO-9456712', mmsi: '636019900', name: 'ATLANTIC VOYAGER', lat: 5.50, lng: 3.20, status: 'safe', rScore: 0.08, type: 'Container Ship', flag: 'DEU', dest: 'Lagos', speed: 19.5 },
    { id: 'IMO-9234567', mmsi: '620345678', name: 'WEST AFRICA STAR', lat: 6.20, lng: 3.10, status: 'safe', rScore: 0.12, type: 'Bulk Carrier', flag: 'PAN', dest: 'Lagos', speed: 14.2 },
    { id: 'IMO-9345678', mmsi: '636020100', name: 'NIGER DELTA PRIDE', lat: 4.30, lng: 6.95, status: 'safe', rScore: 0.05, type: 'LNG Carrier', flag: 'NGA', dest: 'Bonny', speed: 12.8 },
    { id: 'IMO-9567890', mmsi: '636021200', name: 'CAMEROON EXPRESS', lat: 3.75, lng: 9.65, status: 'safe', rScore: 0.15, type: 'Container Ship', flag: 'CMR', dest: 'Douala', speed: 16.5 },
    { id: 'IMO-9678901', mmsi: '636022300', name: 'GULF PATROL 7', lat: 4.10, lng: 9.35, status: 'safe', rScore: 0.03, type: 'Patrol Vessel', flag: 'NGA', dest: 'Calabar', speed: 22.0 },
    { id: 'IMO-9789012', mmsi: '636023400', name: 'BONNY RIVER TUG', lat: 4.25, lng: 7.00, status: 'safe', rScore: 0.02, type: 'Tug', flag: 'NGA', dest: 'Bonny', speed: 8.5 },
    { id: 'IMO-9890123', mmsi: '256789012', name: 'MEDITERRANEAN SUN', lat: 37.80, lng: 23.50, status: 'safe', rScore: 0.18, type: 'Oil Tanker', flag: 'GRC', dest: 'Piraeus', speed: 11.2 },
    { id: 'IMO-9901234', mmsi: '245473000', name: 'NORDIC EMPRESS', lat: 25.10, lng: 55.50, status: 'safe', rScore: 0.22, type: 'Bulk Carrier', flag: 'MHL', dest: 'Dubai', speed: 13.5 },
  ],
  intelligence: [
    { id: 1001, type: 'leak', level: 'high', title: 'Credential Dump: Chief Engineer EBONY MARINER', vessel: 'EBONY MARINER', time: '10m ago', source: 'Telegram Bot', details: 'Dump containing "chief.eng@ebonymariner.fleet" with plaintext password found in a Telegram threat actor channel linked to Gulf of Guinea pirate syndicate.', iocs: ['chief.eng@ebonymariner.fleet'] },
    { id: 1002, type: 'anomaly', level: 'high', title: 'AIS Signal Lost — Possible Spoofing/Jamming', vessel: 'EBONY MARINER', time: '30m ago', source: 'Telemetry Engine', details: 'Vessel AIS track disappeared in the Gulf of Guinea. Last reported speed 0.0kn. Multiple fishing vessels converging on last known position. Possible pirate activity or deliberate GPS spoofing.' },
    { id: 1003, type: 'scan', level: 'high', title: 'Exposed OT: Siemens S7-1200 PLC on Engine Control', vessel: 'EBONY MARINER', time: '5m ago', source: 'Censys / PulseDive', details: 'Siemens S7-1200 PLC port 102 (S7COMM) exposed to public internet via satellite uplink. PLC controls main engine fuel injection system. Correlates with suspected physical boarding.', iocs: ['164.215.xxx.xx'] },
    { id: 1004, type: 'scan', level: 'high', title: 'Exposed VSAT Terminal — Cobham SAILOR 900', vessel: 'EBONY MARINER', time: '2h ago', source: 'Shodan / AbuseIPDB', details: 'Cobham SAILOR 900 VSAT terminal management interface exposed on port 80/443. Default credentials accepted. IP has 47 abuse reports in last 90 days.', iocs: ['82.114.xxx.xx'] },
    { id: 1005, type: 'anomaly', level: 'medium', title: 'Suspicious Vessel Convergence Pattern', vessel: 'SAHEL GUARDIAN', time: '1h ago', source: 'Telemetry Engine', details: 'SAHEL GUARDIAN and two unidentified fishing vessels forming triangular approach pattern around EBONY MARINER — consistent with known piracy boarding tactics.' },
    { id: 1006, type: 'threat', level: 'high', title: 'C2 Infrastructure Match — Maritime APT Group "Neptune\'s Spear"', vessel: 'EBONY MARINER', time: '15m ago', source: 'OTX AlienVault', details: 'IP 164.215.xxx.xx matches known C2 infrastructure used by APT group "Neptune\'s Spear" targeting maritime OT systems. Group has conducted 3 prior attacks in West Africa.', iocs: ['164.215.xxx.xx', 'neptune-c2.darknet.io'] },
    { id: 1007, type: 'leak', level: 'medium', title: 'Shore-Side Fleet Manager Credentials Compromised', vessel: 'EBONY MARINER', time: '4h ago', source: 'IntelX / Have I Been Pwned', details: 'Fleet management portal admin credentials for West Africa Maritime Group found in ComboList-2024 breach dump.' },
    { id: 1008, type: 'anomaly', level: 'high', title: 'IoT Fuel Sensor — Abnormal Drop Detected', vessel: 'EBONY MARINER', time: '8m ago', source: 'IoT Sensor Grid', details: 'Main fuel tank level dropped 12% in 15 minutes without engine running. Consistent with unauthorized fuel transfer (bunkering/diversion).' },
  ],
  news: [
    { id: 'n1001', title: 'Nigerian Navy Reports Suspicious Activity Near Bonny River Approach', summary: 'Nigerian naval command has increased patrols after receiving reports of suspicious vessel movements near the Bonny River oil terminal approach channel.', source: 'Maritime Security Review', date: '2h ago', region: 'Gulf of Guinea', sentiment: 'negative', relatedVessels: ['EBONY MARINER', 'GULF PATROL 7'] },
    { id: 'n1002', title: 'IMB Piracy Annual Report: Gulf of Guinea Remains High-Risk Zone', summary: 'The International Maritime Bureau\'s latest report confirms that the Gulf of Guinea accounts for 43% of global piracy incidents in 2024.', source: 'Lloyd\'s List', date: '1d ago', region: 'Gulf of Guinea', sentiment: 'negative', relatedVessels: [] },
    { id: 'n1003', title: 'Cyber-Physical Attacks on Maritime OT Systems Rising 300%', summary: 'A new report from BIMCO shows a dramatic increase in combined cyber and physical attacks targeting vessel operational technology.', source: 'The Maritime Executive', date: '3d ago', region: 'Global', sentiment: 'negative', relatedVessels: [] },
  ],
  exposures: [
    { ip: '164.215.xxx.xx', port: '102', service: 'S7COMM', system: 'Siemens S7-1200 PLC', vessel: 'EBONY MARINER', confidence: 95, severity: 'critical' },
    { ip: '82.114.xxx.xx', port: '443', service: 'HTTPS', system: 'Cobham SAILOR 900 VSAT', vessel: 'EBONY MARINER', confidence: 98, severity: 'critical' },
    { ip: '82.114.xxx.xy', port: '80', service: 'HTTP', system: 'Cobham SAILOR 900 Admin', vessel: 'EBONY MARINER', confidence: 98, severity: 'high' },
    { ip: '195.22.xxx.xx', port: '8080', service: 'HTTP-Alt', system: 'Wärtsilä Engine Monitor', vessel: 'SAHEL GUARDIAN', confidence: 72, severity: 'medium' },
    { ip: '119.82.xxx.xx', port: '22', service: 'SSH', system: 'Cisco IOS Router', vessel: 'ATLANTIC VOYAGER', confidence: 45, severity: 'low' },
  ],
  iocs: [
    { indicator: '164.215.xxx.xx', type: 'ip', risk: 'critical', source: 'OTX AlienVault', description: 'C2 server for Neptune\'s Spear maritime APT', relatedVessel: 'EBONY MARINER' },
    { indicator: 'neptune-c2.darknet.io', type: 'domain', risk: 'high', source: 'PulseDive', description: 'DGA domain associated with S7COMM exploitation toolkit', relatedVessel: 'EBONY MARINER' },
    { indicator: 'chief.eng@ebonymariner.fleet', type: 'email', risk: 'high', source: 'IntelX', description: 'Compromised crew credential from Telegram leak', relatedVessel: 'EBONY MARINER' },
    { indicator: '82.114.xxx.xx', type: 'ip', risk: 'high', source: 'AbuseIPDB', description: 'VSAT terminal IP with 47 abuse reports, hosting exposed management interface', relatedVessel: 'EBONY MARINER' },
    { indicator: 'a3f8d2e1b9c7...', type: 'hash', risk: 'medium', source: 'OTX', description: 'SHA256 of S7COMM exploit payload dropped on compromised PLCs', relatedVessel: 'EBONY MARINER' },
  ],
  sensors: [
    { vesselName: 'EBONY MARINER', sensorType: 'fuel', value: 42, unit: '%', threshold: 50, alarm: true, timestamp: '8m ago' },
    { vesselName: 'EBONY MARINER', sensorType: 'vibration', value: 0.12, unit: 'mm/s', threshold: 2.0, alarm: false, timestamp: '2m ago' },
    { vesselName: 'EBONY MARINER', sensorType: 'bilge', value: 78, unit: 'cm', threshold: 50, alarm: true, timestamp: '12m ago' },
    { vesselName: 'EBONY MARINER', sensorType: 'gps', value: 0, unit: 'offset_m', threshold: 100, alarm: false, timestamp: '1m ago' },
    { vesselName: 'SAHEL GUARDIAN', sensorType: 'fuel', value: 88, unit: '%', threshold: 20, alarm: false, timestamp: '5m ago' },
    { vesselName: 'ATLANTIC VOYAGER', sensorType: 'fuel', value: 65, unit: '%', threshold: 20, alarm: false, timestamp: '3m ago' },
    { vesselName: 'ATLANTIC VOYAGER', sensorType: 'vibration', value: 1.8, unit: 'mm/s', threshold: 2.0, alarm: false, timestamp: '3m ago' },
  ],
  correlationNodes: [
    { id: 'v1', label: 'EBONY MARINER', type: 'vessel', x: 50, y: 40, risk: 'high' },
    { id: 'c1', label: 'chief.eng@...', type: 'credential', x: 20, y: 20, risk: 'high' },
    { id: 'ip1', label: '164.215.xxx.xx', type: 'ip', x: 80, y: 20, risk: 'high' },
    { id: 'ip2', label: '82.114.xxx.xx', type: 'ip', x: 75, y: 60, risk: 'high' },
    { id: 'ioc1', label: 'Neptune\'s Spear C2', type: 'ioc', x: 85, y: 40, risk: 'high' },
    { id: 's1', label: 'Fuel Sensor Alarm', type: 'sensor', x: 35, y: 70, risk: 'high' },
    { id: 'n1', label: 'Nigeria Navy Alert', type: 'news', x: 15, y: 55, risk: 'medium' },
    { id: 't1', label: 'AIS Dark Event', type: 'threat', x: 55, y: 15, risk: 'high' },
    { id: 'v2', label: 'SAHEL GUARDIAN', type: 'vessel', x: 40, y: 60, risk: 'medium' },
  ],
  correlationEdges: [
    { from: 'c1', to: 'v1', label: 'credentials for', type: 'compromised' },
    { from: 'ip1', to: 'v1', label: 'PLC exposed on', type: 'compromised' },
    { from: 'ip2', to: 'v1', label: 'VSAT terminal of', type: 'compromised' },
    { from: 'ioc1', to: 'ip1', label: 'C2 infrastructure', type: 'correlates' },
    { from: 's1', to: 'v1', label: 'fuel anomaly on', type: 'detected' },
    { from: 'n1', to: 'v1', label: 'mentioned in', type: 'reported' },
    { from: 't1', to: 'v1', label: 'AIS loss for', type: 'detected' },
    { from: 'v2', to: 'v1', label: 'proximity alert', type: 'correlates' },
  ],
  metrics: { totalVessels: 12, activeThreats: 8, criticalAlerts: 5, exposedSystems: 5, coverage: 78 }
};

// ===========================
// SCENARIO 2: Strait of Hormuz
// ===========================
const scenario2: DemoScenario = {
  id: 2, name: 'Strait of Hormuz — SATCOM Breach & Navigation Hijack', codename: 'OPERATION PHANTOM RUDDER',
  description: 'A sophisticated state-sponsored attack on an LNG carrier\'s satellite communications and ECDIS navigation system, causing a dangerous deviation in the congested Strait of Hormuz.',
  region: 'Persian Gulf', threatType: 'State-Sponsored + Navigation',
  vessels: [
    { id: 'IMO-9712345', mmsi: '636091234', name: 'PERSIAN GULF LNG', lat: 26.56, lng: 56.25, status: 'high-risk', rScore: 0.91, type: 'LNG Carrier', flag: 'LBR', dest: 'Fujairah', speed: 8.2, callSign: 'A8LR9', heading: 290, trail: [{lat:26.52,lng:56.45,ts:'-6h'},{lat:26.54,lng:56.38,ts:'-4h'},{lat:26.58,lng:56.30,ts:'-2h'},{lat:26.56,lng:56.25,ts:'now'}] },
    { id: 'IMO-DDG-105', mmsi: '369970105', name: 'USS DEWEY (DDG-105)', lat: 26.58, lng: 56.22, status: 'safe', rScore: 0.01, type: 'Destroyer', flag: 'USA', dest: 'PATROL', speed: 15.0, heading: 110 },
    { id: 'IMO-9823456', mmsi: '422012345', name: 'HORMUZ PILOT', lat: 26.55, lng: 56.28, status: 'safe', rScore: 0.04, type: 'Pilot Vessel', flag: 'IRN', dest: 'Bandar Abbas', speed: 12.0 },
    { id: 'IMO-9934567', mmsi: '470345678', name: 'EMIRATES FORTUNE', lat: 25.78, lng: 55.95, status: 'safe', rScore: 0.10, type: 'Oil Tanker', flag: 'ARE', dest: 'Fujairah', speed: 11.5 },
    { id: 'IMO-9045678', mmsi: '538006789', name: 'ASIAN SPIRIT', lat: 26.30, lng: 56.50, status: 'safe', rScore: 0.14, type: 'Container Ship', flag: 'MHL', dest: 'Jebel Ali', speed: 18.2 },
    { id: 'IMO-9156789', mmsi: '636025600', name: 'QATAR GAS CARRIER', lat: 25.92, lng: 51.55, status: 'safe', rScore: 0.06, type: 'LNG Carrier', flag: 'QAT', dest: 'Ras Laffan', speed: 14.0 },
    { id: 'IMO-9267890', mmsi: '422098765', name: 'IRAN DENA', lat: 27.12, lng: 56.18, status: 'suspicious', rScore: 0.45, type: 'Naval Vessel', flag: 'IRN', dest: 'Bandar Abbas', speed: 20.0, heading: 200 },
    { id: 'IMO-9378901', mmsi: '538007890', name: 'OMAN TRADER', lat: 26.20, lng: 56.60, status: 'safe', rScore: 0.08, type: 'Bulk Carrier', flag: 'OMN', dest: 'Muscat', speed: 13.5 },
    { id: 'IMO-9489012', mmsi: '636026700', name: 'BAHRAIN PEARL', lat: 26.15, lng: 50.40, status: 'safe', rScore: 0.03, type: 'Passenger Ship', flag: 'BHR', dest: 'Manama', speed: 16.0 },
    { id: 'IMO-9590123', mmsi: '470456789', name: 'DUBAI VOYAGER', lat: 25.08, lng: 55.55, status: 'safe', rScore: 0.07, type: 'Container Ship', flag: 'ARE', dest: 'Jebel Ali', speed: 17.8 },
  ],
  intelligence: [
    { id: 2001, type: 'scan', level: 'high', title: 'Exposed VSAT Terminal — Default Credentials Active', vessel: 'PERSIAN GULF LNG', time: '3h ago', source: 'Shodan', details: 'Cobham SAILOR 6110 VSAT terminal exposed with factory default admin/admin credentials. Interface accessible via HTTP on port 80.' },
    { id: 2002, type: 'anomaly', level: 'high', title: 'ECDIS Route Injection Detected', vessel: 'PERSIAN GULF LNG', time: '45m ago', source: 'Telemetry Engine', details: 'Electronic Chart Display route was modified without bridge officer authorization. Planned route through TSS altered to cross into Iranian territorial waters.' },
    { id: 2003, type: 'anomaly', level: 'high', title: 'Dangerous Deviation from Traffic Separation Scheme', vessel: 'PERSIAN GULF LNG', time: '20m ago', source: 'Telemetry Engine', details: 'Vessel has deviated 2.8nm from designated Traffic Separation Scheme in Strait of Hormuz. Heading directly toward USS DEWEY patrol area.' },
    { id: 2004, type: 'threat', level: 'high', title: 'APT Group "Charming Kitten" IOCs Detected on VSAT', vessel: 'PERSIAN GULF LNG', time: '1h ago', source: 'OTX AlienVault', details: 'Network traffic from VSAT terminal shows beaconing to known Charming Kitten C2 at intervals matching their TTP profile. HTTP POST to port 8443.', iocs: ['185.141.xxx.xx', 'update-service.cloud-check.net'] },
    { id: 2005, type: 'scan', level: 'medium', title: 'Vulnerable ECDIS Firmware Identified', vessel: 'PERSIAN GULF LNG', time: '6h ago', source: 'Active Scan', details: 'JRC JAN-9201 ECDIS running firmware v3.2.1 — affected by CVE-2024-XXXXX allowing unauthenticated route data injection via network.' },
    { id: 2006, type: 'anomaly', level: 'medium', title: 'GPS Position Discrepancy — Spoof Vector Detected', vessel: 'PERSIAN GULF LNG', time: '35m ago', source: 'IoT Sensor Grid', details: 'Independent GPS module reports position 1.2nm south of vessel\'s primary GNSS. Indicates possible GPS spoofing attack to mask true heading.' },
    { id: 2007, type: 'news', level: 'medium', title: 'CENTCOM Issues Maritime Advisory for Strait of Hormuz', vessel: 'USS DEWEY (DDG-105)', time: '2h ago', source: 'NAVCENT', details: 'U.S. Naval Forces Central Command has issued a navigation advisory for commercial vessels transiting the Strait of Hormuz.' },
    { id: 2008, type: 'threat', level: 'high', title: 'Iranian Naval Activity Elevated Near TSS', vessel: 'IRAN DENA', time: '1h ago', source: 'SIGINT Correlation', details: 'IRAN DENA and 2 IRGCN fast attack craft conducting unusual patrol pattern near Traffic Separation Scheme boundary. Coincides with PERSIAN GULF LNG route deviation.' },
  ],
  news: [
    { id: 'n2001', title: 'Tensions Rise in Strait of Hormuz After Vessel Deviation Incident', summary: 'An LNG carrier reportedly deviated from the designated shipping lane, triggering a near-miss with a US Navy destroyer.', source: 'Reuters Maritime', date: '30m ago', region: 'Persian Gulf', sentiment: 'negative', relatedVessels: ['PERSIAN GULF LNG', 'USS DEWEY (DDG-105)'] },
    { id: 'n2002', title: 'BIMCO Warns of ECDIS Firmware Vulnerabilities in Fleet Advisory', summary: 'Shipping industry body BIMCO has issued an urgent advisory regarding vulnerabilities in certain ECDIS systems.', source: 'TradeWinds', date: '5h ago', region: 'Global', sentiment: 'negative', relatedVessels: [] },
    { id: 'n2003', title: 'Iran Expands Naval Patrols Amid Regional Tensions', summary: 'The Iranian Navy has expanded its patrol operations in the Strait of Hormuz and surrounding waters.', source: 'Al Jazeera', date: '1d ago', region: 'Persian Gulf', sentiment: 'neutral', relatedVessels: ['IRAN DENA'] },
  ],
  exposures: [
    { ip: '91.223.xxx.xx', port: '80', service: 'HTTP', system: 'Cobham SAILOR 6110 VSAT', vessel: 'PERSIAN GULF LNG', confidence: 97, severity: 'critical' },
    { ip: '91.223.xxx.xx', port: '443', service: 'HTTPS', system: 'Cobham SAILOR 6110 Admin', vessel: 'PERSIAN GULF LNG', confidence: 97, severity: 'critical' },
    { ip: '91.223.xxx.xy', port: '8080', service: 'HTTP-Alt', system: 'JRC ECDIS Web Interface', vessel: 'PERSIAN GULF LNG', confidence: 88, severity: 'high' },
    { ip: '185.141.xxx.xx', port: '8443', service: 'HTTPS-Alt', system: 'C2 Beacon Endpoint', vessel: 'PERSIAN GULF LNG', confidence: 92, severity: 'critical' },
    { ip: '203.45.xxx.xx', port: '22', service: 'SSH', system: 'Linux Bridge Network', vessel: 'ASIAN SPIRIT', confidence: 55, severity: 'medium' },
  ],
  iocs: [
    { indicator: '185.141.xxx.xx', type: 'ip', risk: 'critical', source: 'OTX AlienVault', description: 'Charming Kitten C2 server — active beaconing detected', relatedVessel: 'PERSIAN GULF LNG' },
    { indicator: 'update-service.cloud-check.net', type: 'domain', risk: 'critical', source: 'PulseDive', description: 'DGA domain used for ECDIS exploit delivery', relatedVessel: 'PERSIAN GULF LNG' },
    { indicator: '91.223.xxx.xx', type: 'ip', risk: 'high', source: 'AbuseIPDB', description: 'Exposed VSAT terminal - 23 abuse reports', relatedVessel: 'PERSIAN GULF LNG' },
    { indicator: 'b7e4a1d8f3c2...', type: 'hash', risk: 'high', source: 'OTX', description: 'ECDIS route injection malware SHA256', relatedVessel: 'PERSIAN GULF LNG' },
  ],
  sensors: [
    { vesselName: 'PERSIAN GULF LNG', sensorType: 'gps', value: 1200, unit: 'offset_m', threshold: 100, alarm: true, timestamp: '35m ago' },
    { vesselName: 'PERSIAN GULF LNG', sensorType: 'fuel', value: 72, unit: '%', threshold: 20, alarm: false, timestamp: '5m ago' },
    { vesselName: 'PERSIAN GULF LNG', sensorType: 'vibration', value: 2.8, unit: 'mm/s', threshold: 2.0, alarm: true, timestamp: '10m ago' },
    { vesselName: 'PERSIAN GULF LNG', sensorType: 'bilge', value: 15, unit: 'cm', threshold: 50, alarm: false, timestamp: '8m ago' },
    { vesselName: 'EMIRATES FORTUNE', sensorType: 'fuel', value: 55, unit: '%', threshold: 20, alarm: false, timestamp: '3m ago' },
  ],
  correlationNodes: [
    { id: 'v1', label: 'PERSIAN GULF LNG', type: 'vessel', x: 50, y: 40, risk: 'high' },
    { id: 'ip1', label: '185.141.xxx.xx', type: 'ip', x: 80, y: 20, risk: 'high' },
    { id: 'ip2', label: '91.223.xxx.xx', type: 'ip', x: 75, y: 60, risk: 'high' },
    { id: 'ioc1', label: 'Charming Kitten C2', type: 'ioc', x: 85, y: 40, risk: 'high' },
    { id: 's1', label: 'GPS Spoof Alert', type: 'sensor', x: 30, y: 65, risk: 'high' },
    { id: 'n1', label: 'Hormuz Tension News', type: 'news', x: 15, y: 50, risk: 'medium' },
    { id: 't1', label: 'ECDIS Route Inject', type: 'threat', x: 50, y: 15, risk: 'high' },
    { id: 'v2', label: 'USS DEWEY', type: 'vessel', x: 35, y: 35, risk: 'low' },
    { id: 'v3', label: 'IRAN DENA', type: 'vessel', x: 20, y: 25, risk: 'medium' },
  ],
  correlationEdges: [
    { from: 'ip1', to: 'v1', label: 'C2 beaconing from', type: 'compromised' },
    { from: 'ip2', to: 'v1', label: 'VSAT terminal of', type: 'compromised' },
    { from: 'ioc1', to: 'ip1', label: 'attributed to', type: 'correlates' },
    { from: 't1', to: 'v1', label: 'route injection on', type: 'compromised' },
    { from: 's1', to: 'v1', label: 'GPS anomaly on', type: 'detected' },
    { from: 'n1', to: 'v1', label: 'incident involving', type: 'reported' },
    { from: 'v2', to: 'v1', label: 'near-miss with', type: 'correlates' },
    { from: 'v3', to: 'v1', label: 'suspicious proximity', type: 'correlates' },
  ],
  metrics: { totalVessels: 10, activeThreats: 6, criticalAlerts: 4, exposedSystems: 5, coverage: 82 }
};

// ===========================
// SCENARIO 3: Mediterranean Dark Fleet
// ===========================
const scenario3: DemoScenario = {
  id: 3, name: 'Mediterranean — Dark Fleet Sanctions Evasion', codename: 'OPERATION GHOST CARGO',
  description: 'A network of vessels with spoofed AIS identities conducting ship-to-ship transfers of sanctioned Russian crude oil in the Mediterranean, bypassing EU sanctions.',
  region: 'Mediterranean Sea', threatType: 'Sanctions Evasion + Identity Fraud',
  vessels: [
    { id: 'IMO-SPOOFED-1', mmsi: '273XXXX01', name: 'SHADOW CARRIER 1', lat: 36.75, lng: 22.10, status: 'high-risk', rScore: 0.97, type: 'Oil Tanker', flag: '???', dest: 'UNKNOWN', speed: 2.1, heading: 180, trail: [{lat:37.20,lng:21.80,ts:'-12h'},{lat:37.00,lng:21.95,ts:'-8h'},{lat:36.85,lng:22.05,ts:'-4h'},{lat:36.75,lng:22.10,ts:'now'}] },
    { id: 'IMO-SPOOFED-2', mmsi: '273XXXX02', name: 'SHADOW CARRIER 2', lat: 36.73, lng: 22.13, status: 'high-risk', rScore: 0.95, type: 'Oil Tanker', flag: '???', dest: 'UNKNOWN', speed: 1.8, heading: 175 },
    { id: 'IMO-SPOOFED-3', mmsi: '273XXXX03', name: 'SHADOW CARRIER 3', lat: 36.78, lng: 22.08, status: 'high-risk', rScore: 0.92, type: 'Oil Tanker', flag: '???', dest: 'UNKNOWN', speed: 0.5, heading: 190 },
    { id: 'IMO-9645321', mmsi: '241234567', name: 'AEGEAN LEGACY', lat: 36.70, lng: 22.15, status: 'suspicious', rScore: 0.68, type: 'Oil Tanker', flag: 'GRC', dest: 'Kalamata', speed: 3.5, heading: 210 },
    { id: 'IMO-9756432', mmsi: '240987654', name: 'HELLENIC TRADER', lat: 37.95, lng: 23.70, status: 'safe', rScore: 0.18, type: 'Container Ship', flag: 'GRC', dest: 'Piraeus', speed: 16.2 },
    { id: 'IMO-9867543', mmsi: '247123456', name: 'ADRIATIC STAR', lat: 38.12, lng: 15.65, status: 'safe', rScore: 0.12, type: 'Bulk Carrier', flag: 'ITA', dest: 'Gioia Tauro', speed: 14.0 },
    { id: 'IMO-9978654', mmsi: '538123456', name: 'CRETE NAVIGATOR', lat: 35.52, lng: 24.02, status: 'safe', rScore: 0.09, type: 'Container Ship', flag: 'MHL', dest: 'Heraklion', speed: 17.5 },
    { id: 'IMO-8089765', mmsi: '256234567', name: 'MALTA SPIRIT', lat: 35.90, lng: 14.50, status: 'safe', rScore: 0.05, type: 'LNG Carrier', flag: 'MLT', dest: 'Marsaxlokk', speed: 13.8 },
    { id: 'IMO-8190876', mmsi: '224345678', name: 'BARCELONA EXPRESS', lat: 41.30, lng: 1.95, status: 'safe', rScore: 0.04, type: 'Container Ship', flag: 'ESP', dest: 'Barcelona', speed: 19.2 },
    { id: 'IMO-8201987', mmsi: '228456789', name: 'MARSEILLE VOYAGER', lat: 43.18, lng: 5.20, status: 'safe', rScore: 0.07, type: 'Ro-Ro', flag: 'FRA', dest: 'Marseille', speed: 15.5 },
    { id: 'IMO-8313098', mmsi: '636030100', name: 'BALTIC PRINCESS', lat: 59.25, lng: 18.30, status: 'suspicious', rScore: 0.55, type: 'Ro-Ro/Passenger', flag: 'FIN', dest: 'Stockholm', speed: 16.8 },
    { id: 'IMO-8424109', mmsi: '273456789', name: 'NOVOROSSIYSK TANKER', lat: 44.60, lng: 37.85, status: 'suspicious', rScore: 0.48, type: 'Oil Tanker', flag: 'RUS', dest: 'Novorossiysk', speed: 0.0 },
  ],
  intelligence: [
    { id: 3001, type: 'anomaly', level: 'high', title: 'MMSI Spoofing Detected — 3 Vessels with Forged Identities', vessel: 'SHADOW CARRIER 1', time: '15m ago', source: 'Telemetry Engine', details: 'Three tankers broadcasting MMSI numbers not registered in any ITU database. Position hopping detected — vessels appear to teleport between locations, consistent with AIS identity manipulation.' },
    { id: 3002, type: 'anomaly', level: 'high', title: 'Ship-to-Ship Transfer Zone Detected', vessel: 'SHADOW CARRIER 1', time: '1h ago', source: 'Telemetry Engine', details: 'Cluster of 4 vessels maintaining <500m proximity for 6+ hours in open water off Kalamata, Greece. Pattern consistent with ship-to-ship oil transfer operations.' },
    { id: 3003, type: 'threat', level: 'high', title: 'Sanctions List Match — Russian Origin Crude', vessel: 'NOVOROSSIYSK TANKER', time: '3h ago', source: 'OFAC / EU Sanctions DB', details: 'NOVOROSSIYSK TANKER departed Novorossiysk with full load of Urals crude. Vessel ownership chain traces to sanctioned entity Sovcomflot subsidiary.' },
    { id: 3004, type: 'leak', level: 'medium', title: 'Crew Social Media Reveals Actual Position', vessel: 'SHADOW CARRIER 1', time: '2h ago', source: 'OSINT', details: 'Crew member posted Instagram story showing sunset with landmark visible — geolocated to waters off Kalamata, Greece. Contradicts AIS-reported position in Libyan waters.' },
    { id: 3005, type: 'scan', level: 'medium', title: 'Fake Ship Registration Company Domain', vessel: 'SHADOW CARRIER 1', time: '4h ago', source: 'PulseDive', details: 'Domain "global-maritime-registry.com" used for fake vessel registration traced to bullet-proof hosting. WHOIS data shows registration 2 weeks ago.', iocs: ['global-maritime-registry.com'] },
    { id: 3006, type: 'anomaly', level: 'high', title: 'IoT Bilge Sensor — Oil Loading Activity Detected', vessel: 'AEGEAN LEGACY', time: '45m ago', source: 'IoT Sensor Grid', details: 'Bilge water oil content sensor spiked to 85ppm during apparent STS transfer. Normal operating range is 5-15ppm. Indicates crude oil handling.' },
    { id: 3007, type: 'threat', level: 'medium', title: 'Financial Network — Shell Company Web Identified', vessel: 'SHADOW CARRIER 1', time: '6h ago', source: 'OSINT / Corporate Registry', details: 'Ownership chain: Shadow Carrier 1 → Global Maritime Ltd (Seychelles) → Petrotrade Holdings (UAE) → sanctioned Russian oligarch.' },
    { id: 3008, type: 'news', level: 'medium', title: 'EU Investigators Probe Mediterranean Oil Transfers', vessel: 'AEGEAN LEGACY', time: '1d ago', source: 'Financial Times', details: 'EU anti-sanctions evasion task force has opened investigation into suspicious ship-to-ship transfers observed in Greek waters.' },
  ],
  news: [
    { id: 'n3001', title: 'EU Investigators Probe Mediterranean Oil Transfer Operations', summary: 'European investigators are examining a network of vessels suspected of conducting illegal ship-to-ship transfers to circumvent Russian oil sanctions.', source: 'Financial Times', date: '1d ago', region: 'Mediterranean', sentiment: 'negative', relatedVessels: ['SHADOW CARRIER 1', 'AEGEAN LEGACY'] },
    { id: 'n3002', title: 'Dark Fleet Growth Accelerates as Sanctions Enforcement Struggles', summary: 'The "dark fleet" of tankers operating outside normal regulatory oversight has grown to an estimated 800 vessels globally.', source: 'Bloomberg', date: '2d ago', region: 'Global', sentiment: 'negative', relatedVessels: [] },
    { id: 'n3003', title: 'Greece Under Pressure to Crack Down on STS Transfer Zones', summary: 'Diplomatic pressure mounts on Athens to enhance monitoring of ship-to-ship oil transfers occurring in Greek territorial waters.', source: 'Kathimerini', date: '3d ago', region: 'Mediterranean', sentiment: 'neutral', relatedVessels: ['SHADOW CARRIER 1', 'SHADOW CARRIER 2', 'SHADOW CARRIER 3'] },
  ],
  exposures: [
    { ip: '185.56.xxx.xx', port: '80', service: 'HTTP', system: 'Fake Registry Site', vessel: 'SHADOW CARRIER 1', confidence: 90, severity: 'high' },
    { ip: '194.87.xxx.xx', port: '443', service: 'HTTPS', system: 'AIS Transponder Config', vessel: 'SHADOW CARRIER 1', confidence: 85, severity: 'critical' },
    { ip: '194.87.xxx.xy', port: '8080', service: 'HTTP-Alt', system: 'AIS Transponder Config', vessel: 'SHADOW CARRIER 2', confidence: 85, severity: 'critical' },
    { ip: '204.15.xxx.xx', port: '80', service: 'HTTP', system: 'JRC ECDIS Web', vessel: 'BALTIC PRINCESS', confidence: 82, severity: 'medium' },
    { ip: '178.33.xxx.xx', port: '22', service: 'SSH', system: 'Vessel Network Gateway', vessel: 'AEGEAN LEGACY', confidence: 60, severity: 'medium' },
  ],
  iocs: [
    { indicator: 'global-maritime-registry.com', type: 'domain', risk: 'high', source: 'PulseDive', description: 'Fake vessel registration portal used for identity spoofing', relatedVessel: 'SHADOW CARRIER 1' },
    { indicator: '185.56.xxx.xx', type: 'ip', risk: 'high', source: 'AbuseIPDB', description: 'Bulletproof hosting — fake registry infrastructure', relatedVessel: 'SHADOW CARRIER 1' },
    { indicator: '194.87.xxx.xx', type: 'ip', risk: 'critical', source: 'OTX', description: 'AIS transponder remote configuration endpoint — used for MMSI spoofing', relatedVessel: 'SHADOW CARRIER 1' },
    { indicator: 'petrotrade-holdings.ae', type: 'domain', risk: 'medium', source: 'OSINT', description: 'Shell company domain in ownership chain', relatedVessel: 'SHADOW CARRIER 1' },
  ],
  sensors: [
    { vesselName: 'AEGEAN LEGACY', sensorType: 'bilge', value: 85, unit: 'ppm', threshold: 15, alarm: true, timestamp: '45m ago' },
    { vesselName: 'AEGEAN LEGACY', sensorType: 'fuel', value: 35, unit: '%', threshold: 20, alarm: false, timestamp: '10m ago' },
    { vesselName: 'SHADOW CARRIER 1', sensorType: 'gps', value: 48000, unit: 'offset_m', threshold: 100, alarm: true, timestamp: '15m ago' },
    { vesselName: 'SHADOW CARRIER 2', sensorType: 'gps', value: 52000, unit: 'offset_m', threshold: 100, alarm: true, timestamp: '20m ago' },
    { vesselName: 'HELLENIC TRADER', sensorType: 'fuel', value: 70, unit: '%', threshold: 20, alarm: false, timestamp: '5m ago' },
    { vesselName: 'HELLENIC TRADER', sensorType: 'vibration', value: 1.2, unit: 'mm/s', threshold: 2.0, alarm: false, timestamp: '5m ago' },
  ],
  correlationNodes: [
    { id: 'v1', label: 'SHADOW CARRIER 1', type: 'vessel', x: 45, y: 35, risk: 'high' },
    { id: 'v2', label: 'SHADOW CARRIER 2', type: 'vessel', x: 55, y: 45, risk: 'high' },
    { id: 'v3', label: 'SHADOW CARRIER 3', type: 'vessel', x: 40, y: 50, risk: 'high' },
    { id: 'v4', label: 'AEGEAN LEGACY', type: 'vessel', x: 60, y: 35, risk: 'medium' },
    { id: 'v5', label: 'NOVOROSSIYSK TANKER', type: 'vessel', x: 20, y: 25, risk: 'medium' },
    { id: 'ioc1', label: 'Fake Registry Domain', type: 'ioc', x: 80, y: 20, risk: 'high' },
    { id: 'ip1', label: '194.87.xxx.xx', type: 'ip', x: 75, y: 55, risk: 'high' },
    { id: 's1', label: 'Bilge Oil Alarm', type: 'sensor', x: 70, y: 70, risk: 'high' },
    { id: 'n1', label: 'EU Investigation News', type: 'news', x: 15, y: 60, risk: 'medium' },
    { id: 't1', label: 'Sanctions Match', type: 'threat', x: 25, y: 40, risk: 'high' },
  ],
  correlationEdges: [
    { from: 'v5', to: 'v1', label: 'crude origin', type: 'correlates' },
    { from: 'v1', to: 'v4', label: 'STS transfer to', type: 'correlates' },
    { from: 'v2', to: 'v1', label: 'fleet member', type: 'correlates' },
    { from: 'v3', to: 'v1', label: 'fleet member', type: 'correlates' },
    { from: 'ioc1', to: 'v1', label: 'fake registration via', type: 'compromised' },
    { from: 'ip1', to: 'v1', label: 'AIS spoof config from', type: 'compromised' },
    { from: 's1', to: 'v4', label: 'oil loading on', type: 'detected' },
    { from: 'n1', to: 'v1', label: 'investigated in', type: 'reported' },
    { from: 't1', to: 'v5', label: 'sanctioned entity', type: 'correlates' },
  ],
  metrics: { totalVessels: 12, activeThreats: 7, criticalAlerts: 4, exposedSystems: 5, coverage: 65 }
};

// ===========================
// SCENARIO 4: BlackHat — Strait of Hormuz Crisis
// ===========================
const scenario4: DemoScenario = {
  id: 4, name: 'Strait of Hormuz — Tanker Strike & Full-Spectrum Compromise', codename: 'OPERATION BURNING HORIZON',
  description: 'A Greek-flagged oil tanker struck by an IRGCN suicide drone while transiting the Strait of Hormuz. Vessel exhibits severe AIS jittering, crew credential leaks on Telegram, VSAT compromise with C2 beaconing, and cascading OT failures. Multi-source intelligence integration demonstrates full operational picture.',
  region: 'Strait of Hormuz', threatType: 'Kinetic + Cyber + EW',
  vessels: [
    { id: 'IMO-9834215', mmsi: '241098765', name: 'AEGEAN HORIZON', lat: 26.48, lng: 56.30, status: 'high-risk', rScore: 0.98, type: 'Crude Oil Tanker', flag: 'GRC', dest: 'Fujairah', speed: 0.3, callSign: 'SVAB2', heading: 315, imo: '9834215',
      trail: [{lat:26.35,lng:56.60,ts:'-8h'},{lat:26.40,lng:56.52,ts:'-6h'},{lat:26.44,lng:56.45,ts:'-4h'},{lat:26.46,lng:56.38,ts:'-2h'},{lat:26.55,lng:56.25,ts:'-45m'},{lat:26.42,lng:56.35,ts:'-30m'},{lat:26.51,lng:56.28,ts:'-15m'},{lat:26.48,lng:56.30,ts:'now'}] },
    { id: 'IMO-DDG-112', mmsi: '369970112', name: 'USS MICHAEL MURPHY (DDG-112)', lat: 26.52, lng: 56.18, status: 'safe', rScore: 0.01, type: 'Arleigh Burke Destroyer', flag: 'USA', dest: 'PATROL', speed: 18.0, heading: 95 },
    { id: 'IMO-IRGCN-1', mmsi: '422099001', name: 'IRGCN FAC 01', lat: 26.50, lng: 56.42, status: 'high-risk', rScore: 0.88, type: 'Fast Attack Craft', flag: 'IRN', dest: 'UNKNOWN', speed: 35.0, heading: 260 },
    { id: 'IMO-IRGCN-2', mmsi: '422099002', name: 'IRGCN FAC 02', lat: 26.45, lng: 56.45, status: 'high-risk', rScore: 0.85, type: 'Fast Attack Craft', flag: 'IRN', dest: 'UNKNOWN', speed: 32.0, heading: 270 },
    { id: 'IMO-IRGCN-3', mmsi: '422099003', name: 'IRGCN FAC 03', lat: 26.55, lng: 56.48, status: 'suspicious', rScore: 0.72, type: 'Fast Attack Craft', flag: 'IRN', dest: 'UNKNOWN', speed: 28.0, heading: 245 },
    { id: 'IMO-IRIN-DENA', mmsi: '422012999', name: 'IRIS DENA (F-75)', lat: 27.05, lng: 56.10, status: 'suspicious', rScore: 0.55, type: 'Moudge-class Frigate', flag: 'IRN', dest: 'Bandar Abbas', speed: 14.0, heading: 190 },
    { id: 'IMO-9876543', mmsi: '538012345', name: 'SINGAPORE SPIRIT', lat: 26.30, lng: 56.55, status: 'safe', rScore: 0.15, type: 'Container Ship', flag: 'SGP', dest: 'Jebel Ali', speed: 16.5, heading: 295 },
    { id: 'IMO-9765432', mmsi: '470567890', name: 'EMIRATES CROWN', lat: 25.65, lng: 56.00, status: 'safe', rScore: 0.08, type: 'VLCC', flag: 'ARE', dest: 'Fujairah', speed: 11.2 },
    { id: 'IMO-9654321', mmsi: '636045600', name: 'MARSHAL ISLANDS TRADER', lat: 26.60, lng: 56.65, status: 'safe', rScore: 0.10, type: 'Bulk Carrier', flag: 'MHL', dest: 'Muscat', speed: 13.0 },
    { id: 'IMO-9543210', mmsi: '477234567', name: 'HONG KONG VENTURE', lat: 25.95, lng: 56.80, status: 'safe', rScore: 0.06, type: 'Chemical Tanker', flag: 'HKG', dest: 'Sohar', speed: 14.5 },
    { id: 'IMO-9432109', mmsi: '352345678', name: 'PANAMA EXPRESS', lat: 26.70, lng: 56.15, status: 'safe', rScore: 0.04, type: 'Container Ship', flag: 'PAN', dest: 'Jebel Ali', speed: 18.8 },
    { id: 'IMO-9321098', mmsi: '538098765', name: 'PACIFIC GUARDIAN', lat: 25.40, lng: 57.10, status: 'safe', rScore: 0.12, type: 'LNG Carrier', flag: 'MHL', dest: 'Ras Laffan', speed: 15.0 },
    { id: 'IMO-9210987', mmsi: '256456789', name: 'HELLENIC VALOR', lat: 26.20, lng: 56.70, status: 'suspicious', rScore: 0.42, type: 'Oil Tanker', flag: 'GRC', dest: 'Piraeus', speed: 9.5, heading: 280 },
    { id: 'IMO-9109876', mmsi: '636056700', name: 'QATAR ENERGY ONE', lat: 25.80, lng: 51.80, status: 'safe', rScore: 0.03, type: 'LNG Carrier', flag: 'QAT', dest: 'Ras Laffan', speed: 17.2 },
  ],
  intelligence: [
    { id: 4001, type: 'threat', level: 'high', title: 'CONFIRMED: IRGCN Suicide Drone Strike on AEGEAN HORIZON', vessel: 'AEGEAN HORIZON', time: '42m ago', source: 'CENTCOM / LiveUAMap', details: 'IRGCN Ababil-T suicide drone impacted starboard hull of AEGEAN HORIZON at frame 87. Fire confirmed in cargo pump room. Crew reported 2 injured. Vessel listing 3° starboard. IRGCN FAC formation observed 6nm east providing overwatch.' },
    { id: 4002, type: 'anomaly', level: 'high', title: 'Severe AIS Jittering — Position Hopping 48nm in 15min', vessel: 'AEGEAN HORIZON', time: '30m ago', source: 'Telemetry Engine', details: 'AEGEAN HORIZON AIS track shows erratic position jumps: 26.55°N→26.42°N→26.51°N within 15 minutes. Speed reported as 102kn momentarily. Pattern consistent with GPS jamming from shore-based IRGC EW installation at Qeshm Island. 47 other vessels in Hormuz showing similar jitter.' },
    { id: 4003, type: 'leak', level: 'high', title: 'Crew PII Dumped on Telegram — "HormuzWatch" Channel', vessel: 'AEGEAN HORIZON', time: '1h ago', source: 'Telegram OSINT', details: 'Telegram channel "HormuzWatch" (12.4K subscribers) published full crew manifest including passport numbers, contract details, and home addresses for 24 Filipino and Greek crew members. Channel linked to IRGC-affiliated media operation. Data correlates with earlier phishing campaign against Thenamaris ship manager.', iocs: ['t.me/HormuzWatch_Official'] },
    { id: 4004, type: 'scan', level: 'high', title: 'VSAT Terminal Compromised — Intellian v240M', vessel: 'AEGEAN HORIZON', time: '3h ago', source: 'Shodan / AbuseIPDB', details: 'Intellian v240M VSAT terminal management interface exposed on port 80 with default credentials. IP 94.182.xxx.xx has 112 AbuseIPDB reports. Active C2 beaconing detected to 185.143.xxx.xx at 30-second intervals — consistent with MuddyWater TTP.', iocs: ['94.182.xxx.xx', '185.143.xxx.xx'] },
    { id: 4005, type: 'threat', level: 'high', title: 'APT Group "MuddyWater" C2 Infrastructure Confirmed', vessel: 'AEGEAN HORIZON', time: '2h ago', source: 'OTX AlienVault', details: 'C2 IP 185.143.xxx.xx matches known MuddyWater (MOIS) infrastructure. HTTP POST beaconing to /api/v2/check with base64-encoded system enumeration data. MuddyWater previously targeted Greek shipping companies in Operation "PoisonedAnchor" (2025).', iocs: ['185.143.xxx.xx', 'update-check.maritime-cloud.net', '94.182.xxx.xx'] },
    { id: 4006, type: 'anomaly', level: 'high', title: 'Engine Room OT Systems Unreachable Post-Strike', vessel: 'AEGEAN HORIZON', time: '35m ago', source: 'IoT Sensor Grid', details: 'All engine room IoT sensors (fuel flow, vibration, bilge level, exhaust temp) went offline simultaneously 3 minutes after drone impact. Last fuel reading showed 12% drop in 8 minutes. Pattern suggests either physical damage to sensor bus or deliberate OT network kill-switch activation.' },
    { id: 4007, type: 'anomaly', level: 'high', title: 'GPS Spoofing Attack — Qeshm Island EW Source', vessel: 'AEGEAN HORIZON', time: '25m ago', source: 'RF Signal Analysis', details: 'Independent GNSS receiver confirms true position differs from AIS-reported position by 3.2nm. Spoofing signal source triangulated to IRGC electronic warfare installation on Qeshm Island. Signal strength consistent with high-power GPS simulator. Affects 47+ vessels in the strait.' },
    { id: 4008, type: 'leak', level: 'medium', title: 'Thenamaris Fleet Manager Portal — Credential Breach', vessel: 'AEGEAN HORIZON', time: '6h ago', source: 'IntelX / Have I Been Pwned', details: 'Credentials for fleet.thenamaris.com admin portal found in "PersianGulf_Maritime_2026" breach dump on Russian-language forum. Dump contains 847 email/password pairs from 12 Greek shipping companies. AEGEAN HORIZON fleet manager credentials confirmed valid.' },
    { id: 4009, type: 'news', level: 'high', title: 'IRGC Claims Hormuz Strait "Closed" to Hostile Vessels', vessel: 'IRGCN FAC 01', time: '2h ago', source: 'LiveUAMap / IRNA', details: 'IRGC Commander Salami declared Strait of Hormuz closed to vessels of "hostile nations" effective immediately. IRGCN deployed additional Bladerunner-51 fast attack craft and Fateh-class submarine to enforce blockade.' },
    { id: 4010, type: 'threat', level: 'medium', title: 'CENTCOM Elevates FPCON to DELTA for Persian Gulf', vessel: 'USS MICHAEL MURPHY (DDG-112)', time: '1h ago', source: 'NAVCENT', details: 'U.S. 5th Fleet raised Force Protection Condition to DELTA. All commercial traffic advisory issued via NAVAREA IX warning. USS Michael Murphy redeploying from Gulf of Oman to Hormuz TSS western approach.' },
    { id: 4011, type: 'scan', level: 'medium', title: 'Wärtsilä RT-flex Engine Controller Exposed', vessel: 'AEGEAN HORIZON', time: '4h ago', source: 'PulseDive', details: 'Wärtsilä RT-flex82C engine management system accessible via web interface on port 8443. Firmware version 4.1.2 affected by CVE-2025-XXXXX enabling unauthenticated command injection. System controls main engine fuel injection and RPM governor.' },
    { id: 4012, type: 'anomaly', level: 'medium', title: 'Convoy Formation Detected Near HELLENIC VALOR', vessel: 'HELLENIC VALOR', time: '45m ago', source: 'Telemetry Engine', details: 'Greek-flagged tanker HELLENIC VALOR has reduced speed to 9.5kn and appears to be forming convoy with two Marshall Islands registered vessels. Behavior suggests voluntary speed reduction to avoid Hormuz chokepoint during active hostilities.' },
  ],
  news: [
    { id: 'n4001', title: 'BREAKING: Iranian Drone Strikes Greek Oil Tanker in Strait of Hormuz', summary: 'An IRGCN Ababil-T suicide drone struck the Greek-flagged crude oil tanker AEGEAN HORIZON while transiting the Strait of Hormuz. Crew reports fire in the cargo pump room and 2 casualties. Coalition forces responding.', source: 'Reuters', date: '40m ago', region: 'Strait of Hormuz', sentiment: 'negative', relatedVessels: ['AEGEAN HORIZON'] },
    { id: 'n4002', title: 'Telegram Channels Leak Full Crew Data of Struck Tanker', summary: 'IRGC-affiliated Telegram channel "HormuzWatch" published personal data of 24 crew members including passport numbers and home addresses, in apparent information warfare operation.', source: 'Telegram OSINT', date: '55m ago', region: 'Strait of Hormuz', sentiment: 'negative', relatedVessels: ['AEGEAN HORIZON'] },
    { id: 'n4003', title: 'IRGC Declares Strait of Hormuz \"Closed\" — Global Oil Markets Spike 14%', summary: 'Following the drone strike, IRGC Commander-in-Chief declared the strait closed to hostile nations\' vessels. Brent crude surged $12.4 to $98.7/barrel within minutes.', source: 'LiveUAMap / Bloomberg', date: '2h ago', region: 'Strait of Hormuz', sentiment: 'negative', relatedVessels: [] },
    { id: 'n4004', title: '47 Vessels Report GPS Anomalies in Hormuz — Massive EW Campaign', summary: 'Maritime intelligence firm Windward reports at least 47 commercial vessels exhibiting GPS jittering and AIS abnormalities consistent with wide-area electronic warfare operations from Iranian shore installations.', source: 'Windward AI / TradeWinds', date: '30m ago', region: 'Strait of Hormuz', sentiment: 'negative', relatedVessels: ['AEGEAN HORIZON', 'SINGAPORE SPIRIT', 'HELLENIC VALOR'] },
    { id: 'n4005', title: 'CENTCOM Deploys Additional Assets to Persian Gulf', summary: 'U.S. Central Command has ordered the Eisenhower Carrier Strike Group to accelerate transit to the Persian Gulf. Marine Expeditionary Unit on standby for potential VBSS operations.', source: 'CENTCOM Press / AP', date: '1h ago', region: 'Persian Gulf', sentiment: 'neutral', relatedVessels: ['USS MICHAEL MURPHY (DDG-112)'] },
    { id: 'n4006', title: 'Greek Shipping Industry Suspends All Hormuz Transits', summary: 'Union of Greek Shipowners declared force majeure, suspending all tanker transits through the Strait of Hormuz. Insurance premiums for Gulf transits increased 400% overnight.', source: 'Lloyd\'s List', date: '1h ago', region: 'Global', sentiment: 'negative', relatedVessels: ['AEGEAN HORIZON', 'HELLENIC VALOR'] },
    { id: 'n4007', title: 'Satellite Imagery Confirms Fire Aboard AEGEAN HORIZON', summary: 'Planet Labs satellite pass at 14:42 UTC shows thermal anomaly and smoke plume emanating from midship area of AEGEAN HORIZON. Vessel appears dead in water with slight starboard list.', source: 'Planet Labs / Maritime Executive', date: '25m ago', region: 'Strait of Hormuz', sentiment: 'negative', relatedVessels: ['AEGEAN HORIZON'] },
    { id: 'n4008', title: 'MuddyWater APT Linked to Pre-Strike Cyber Campaign on Greek Fleet', summary: 'Threat intelligence analysts connect Iranian MOIS-linked APT group MuddyWater to a months-long phishing campaign targeting Greek shipping companies, suggesting the cyber compromise preceded the kinetic strike.', source: 'Recorded Future / OTX', date: '3h ago', region: 'Global', sentiment: 'negative', relatedVessels: ['AEGEAN HORIZON'] },
    { id: 'n4009', title: 'LiveUAMap: IRGCN Fast Attack Craft Swarming Western Hormuz Approach', summary: 'Real-time tracking shows 8+ IRGCN Bladerunner-51 and Peykaap fast attack craft conducting aggressive maneuvers near the western approach to the Strait of Hormuz.', source: 'LiveUAMap', date: '15m ago', region: 'Strait of Hormuz', sentiment: 'negative', relatedVessels: ['IRGCN FAC 01', 'IRGCN FAC 02', 'IRGCN FAC 03'] },
    { id: 'n4010', title: 'Crew Families Targeted: Phishing Emails Reference Leaked Personal Data', summary: 'Family members of AEGEAN HORIZON crew report receiving phishing emails in Greek and Filipino referencing leaked personal data, attempting to distribute malware disguised as \"evacuation updates.\"', source: 'OSINT / CyberScoop', date: '4h ago', region: 'Global', sentiment: 'negative', relatedVessels: ['AEGEAN HORIZON'] },
    { id: 'n4011', title: 'Iran Foreign Ministry: "Defensive Action Against Maritime Aggression"', summary: 'Iranian FM spokesperson described the Hormuz incident as a "proportionate defensive response" and warned of further escalation if "maritime aggression continues."', source: 'IRNA / Al Jazeera', date: '45m ago', region: 'Strait of Hormuz', sentiment: 'neutral', relatedVessels: [] },
  ],
  exposures: [
    { ip: '94.182.xxx.xx', port: '80', service: 'HTTP', system: 'Intellian v240M VSAT Terminal', vessel: 'AEGEAN HORIZON', confidence: 98, severity: 'critical' },
    { ip: '94.182.xxx.xx', port: '443', service: 'HTTPS', system: 'Intellian v240M Admin Panel', vessel: 'AEGEAN HORIZON', confidence: 98, severity: 'critical' },
    { ip: '94.182.xxx.xy', port: '8443', service: 'HTTPS-Alt', system: 'Wärtsilä RT-flex Engine Controller', vessel: 'AEGEAN HORIZON', confidence: 91, severity: 'critical' },
    { ip: '185.143.xxx.xx', port: '443', service: 'HTTPS', system: 'MuddyWater C2 Server', vessel: 'AEGEAN HORIZON', confidence: 96, severity: 'critical' },
    { ip: '94.182.xxx.xz', port: '102', service: 'S7COMM', system: 'Siemens S7-1500 Cargo Pump PLC', vessel: 'AEGEAN HORIZON', confidence: 89, severity: 'critical' },
    { ip: '203.88.xxx.xx', port: '22', service: 'SSH', system: 'Bridge Network Gateway', vessel: 'SINGAPORE SPIRIT', confidence: 52, severity: 'medium' },
    { ip: '178.62.xxx.xx', port: '80', service: 'HTTP', system: 'JRC ECDIS Web Interface', vessel: 'HELLENIC VALOR', confidence: 75, severity: 'high' },
  ],
  iocs: [
    { indicator: '185.143.xxx.xx', type: 'ip', risk: 'critical', source: 'OTX AlienVault', description: 'MuddyWater (MOIS) C2 server — active beaconing from AEGEAN HORIZON VSAT', relatedVessel: 'AEGEAN HORIZON' },
    { indicator: '94.182.xxx.xx', type: 'ip', risk: 'critical', source: 'AbuseIPDB', description: 'AEGEAN HORIZON VSAT terminal IP — 112 abuse reports, default credentials active', relatedVessel: 'AEGEAN HORIZON' },
    { indicator: 'update-check.maritime-cloud.net', type: 'domain', risk: 'critical', source: 'PulseDive', description: 'MuddyWater C2 domain for Operation PoisonedAnchor targeting Greek maritime', relatedVessel: 'AEGEAN HORIZON' },
    { indicator: 't.me/HormuzWatch_Official', type: 'domain', risk: 'high', source: 'Telegram OSINT', description: 'IRGC-affiliated Telegram channel distributing crew PII and propaganda', relatedVessel: 'AEGEAN HORIZON' },
    { indicator: 'admin@fleet.thenamaris.com', type: 'email', risk: 'high', source: 'IntelX', description: 'Compromised fleet manager credential from PersianGulf_Maritime_2026 dump', relatedVessel: 'AEGEAN HORIZON' },
    { indicator: 'c4d8e2f1a3b7...', type: 'hash', risk: 'high', source: 'OTX', description: 'SHA256 of MuddyWater PowerShell downloader found on VSAT terminal', relatedVessel: 'AEGEAN HORIZON' },
    { indicator: '94.182.xxx.xy', type: 'ip', risk: 'critical', source: 'PulseDive', description: 'Exposed Wärtsilä engine controller with unauthenticated web interface', relatedVessel: 'AEGEAN HORIZON' },
  ],
  sensors: [
    { vesselName: 'AEGEAN HORIZON', sensorType: 'fuel', value: 31, unit: '%', threshold: 50, alarm: true, timestamp: '35m ago' },
    { vesselName: 'AEGEAN HORIZON', sensorType: 'vibration', value: 8.5, unit: 'mm/s', threshold: 2.0, alarm: true, timestamp: '38m ago' },
    { vesselName: 'AEGEAN HORIZON', sensorType: 'bilge', value: 142, unit: 'cm', threshold: 50, alarm: true, timestamp: '33m ago' },
    { vesselName: 'AEGEAN HORIZON', sensorType: 'gps', value: 3200, unit: 'offset_m', threshold: 100, alarm: true, timestamp: '25m ago' },
    { vesselName: 'SINGAPORE SPIRIT', sensorType: 'gps', value: 850, unit: 'offset_m', threshold: 100, alarm: true, timestamp: '28m ago' },
    { vesselName: 'SINGAPORE SPIRIT', sensorType: 'fuel', value: 68, unit: '%', threshold: 20, alarm: false, timestamp: '5m ago' },
    { vesselName: 'EMIRATES CROWN', sensorType: 'fuel', value: 82, unit: '%', threshold: 20, alarm: false, timestamp: '3m ago' },
    { vesselName: 'EMIRATES CROWN', sensorType: 'vibration', value: 1.4, unit: 'mm/s', threshold: 2.0, alarm: false, timestamp: '3m ago' },
    { vesselName: 'HELLENIC VALOR', sensorType: 'gps', value: 620, unit: 'offset_m', threshold: 100, alarm: true, timestamp: '20m ago' },
  ],
  correlationNodes: [
    { id: 'v1', label: 'AEGEAN HORIZON', type: 'vessel', x: 50, y: 38, risk: 'high' },
    { id: 'ip1', label: '185.143.xxx.xx', type: 'ip', x: 82, y: 18, risk: 'high' },
    { id: 'ip2', label: '94.182.xxx.xx', type: 'ip', x: 78, y: 58, risk: 'high' },
    { id: 'ioc1', label: 'MuddyWater C2', type: 'ioc', x: 88, y: 38, risk: 'high' },
    { id: 'c1', label: 'Thenamaris Creds', type: 'credential', x: 18, y: 18, risk: 'high' },
    { id: 'c2', label: 'Crew PII Dump', type: 'credential', x: 22, y: 45, risk: 'high' },
    { id: 's1', label: 'All Sensors ALARM', type: 'sensor', x: 38, y: 70, risk: 'high' },
    { id: 'n1', label: 'Drone Strike News', type: 'news', x: 12, y: 62, risk: 'high' },
    { id: 't1', label: 'GPS Jamming EW', type: 'threat', x: 55, y: 12, risk: 'high' },
    { id: 'v2', label: 'USS MURPHY', type: 'vessel', x: 35, y: 30, risk: 'low' },
    { id: 'v3', label: 'IRGCN FAC 01', type: 'vessel', x: 65, y: 25, risk: 'high' },
    { id: 'n2', label: 'Telegram Leak', type: 'news', x: 15, y: 35, risk: 'high' },
    { id: 't2', label: 'Kinetic Strike', type: 'threat', x: 60, y: 50, risk: 'high' },
  ],
  correlationEdges: [
    { from: 'ip1', to: 'v1', label: 'C2 beaconing from', type: 'compromised' },
    { from: 'ip2', to: 'v1', label: 'VSAT terminal of', type: 'compromised' },
    { from: 'ioc1', to: 'ip1', label: 'attributed to', type: 'correlates' },
    { from: 'c1', to: 'v1', label: 'fleet mgr creds for', type: 'compromised' },
    { from: 'c2', to: 'v1', label: 'crew data leaked', type: 'compromised' },
    { from: 's1', to: 'v1', label: 'sensor cascade on', type: 'detected' },
    { from: 'n1', to: 'v1', label: 'strike confirmed on', type: 'reported' },
    { from: 't1', to: 'v1', label: 'GPS jamming affects', type: 'detected' },
    { from: 'v2', to: 'v1', label: 'responding to', type: 'correlates' },
    { from: 'v3', to: 'v1', label: 'overwatch of', type: 'correlates' },
    { from: 'n2', to: 'c2', label: 'published via', type: 'reported' },
    { from: 't2', to: 'v1', label: 'drone impact on', type: 'detected' },
    { from: 'c1', to: 'ioc1', label: 'enabled access via', type: 'correlates' },
  ],
  metrics: { totalVessels: 14, activeThreats: 12, criticalAlerts: 9, exposedSystems: 7, coverage: 85 }
};

// ===========================
// EXPORTS
// ===========================

export const DEMO_SCENARIOS: DemoScenario[] = [scenario1, scenario2, scenario3, scenario4];

export function getScenario(id: number): DemoScenario {
  return DEMO_SCENARIOS.find(s => s.id === id) || scenario1;
}

export function getScenarioVesselsAsLegacy(scenario: DemoScenario) {
  return scenario.vessels.map(v => ({
    id: v.id, name: v.name, lat: v.lat, lng: v.lng,
    status: v.status, rScore: v.rScore, type: v.type,
    flag: v.flag, dest: v.dest, speed: v.speed,
  }));
}
