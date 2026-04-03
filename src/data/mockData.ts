export const VESSELS = [
  { id: 'IMO-192837', name: 'TITAN HORIZON', lat: 35.68, lng: 139.76, status: 'safe', rScore: 0.12, type: 'Container Ship', flag: 'PAN', dest: 'Yokohama', speed: 18.2 },
  { id: 'IMO-283746', name: 'AEGEAN STAR', lat: 1.29, lng: 103.85, status: 'suspicious', rScore: 0.58, type: 'Oil Tanker', flag: 'LBR', dest: 'Singapore', speed: 12.0 },
  { id: 'IMO-847365', name: 'NORDIC EMPRESS', lat: 25.20, lng: 55.27, status: 'high-risk', rScore: 0.85, type: 'Bulk Carrier', flag: 'MHL', dest: 'Dubai', speed: 0.5 },
  { id: 'IMO-495867', name: 'PACIFIC DAWN', lat: 51.50, lng: -0.12, status: 'safe', rScore: 0.05, type: 'LNG Carrier', flag: 'BHS', dest: 'London', speed: 14.3 },
  { id: 'IMO-332190', name: 'ARCTIC CHALLENGER', lat: 71.22, lng: -156.74, status: 'safe', rScore: 0.19, type: 'Research Vessel', flag: 'USA', dest: 'Barrow', speed: 8.5 },
  { id: 'IMO-559922', name: 'GULF STREAM', lat: 29.95, lng: -90.07, status: 'safe', rScore: 0.02, type: 'Container Ship', flag: 'SGP', dest: 'New Orleans', speed: 20.1 },
  { id: 'IMO-993344', name: 'BALTIC PRINCESS', lat: 59.32, lng: 18.06, status: 'suspicious', rScore: 0.61, type: 'Ro-Ro/Passenger', flag: 'FIN', dest: 'Stockholm', speed: 16.8 },
  { id: 'IMO-881122', name: 'MEDITERRANEAN SUN', lat: 37.98, lng: 23.72, status: 'high-risk', rScore: 0.77, type: 'Oil Tanker', flag: 'GRC', dest: 'Piraeus', speed: 11.2 },
  { id: 'IMO-223344', name: 'RED SEA EXPLORER', lat: 21.48, lng: 39.19, status: 'safe', rScore: 0.15, type: 'Bulk Carrier', flag: 'SAU', dest: 'Jeddah', speed: 13.0 },
  { id: 'IMO-776655', name: 'ATLANTIC VOYAGER', lat: 40.71, lng: -74.00, status: 'safe', rScore: 0.08, type: 'Container Ship', flag: 'DEU', dest: 'New York', speed: 19.5 },
  { id: 'IMO-664422', name: 'INDIAN PRIDE', lat: 18.92, lng: 72.81, status: 'suspicious', rScore: 0.44, type: 'Chemical Tanker', flag: 'IND', dest: 'Mumbai', speed: 10.5 },
  { id: 'IMO-119988', name: 'CAPE HORN', lat: -55.98, lng: -67.27, status: 'safe', rScore: 0.01, type: 'Fishing Vessel', flag: 'CHL', dest: 'Punta Arenas', speed: 9.0 },
  { id: 'IMO-445566', name: 'SOUTHERN CROSS', lat: -33.86, lng: 151.20, status: 'safe', rScore: 0.22, type: 'LNG Carrier', flag: 'AUS', dest: 'Sydney', speed: 15.6 },
  { id: 'IMO-998877', name: 'EBONY MARINER', lat: 4.05, lng: 9.70, status: 'high-risk', rScore: 0.91, type: 'Oil Tanker', flag: 'NGA', dest: 'Douala', speed: 0.0 }, // Stationary high risk
  { id: 'IMO-556677', name: 'JADE EMPEROR', lat: 22.31, lng: 114.16, status: 'safe', rScore: 0.09, type: 'Container Ship', flag: 'HKG', dest: 'Hong Kong', speed: 21.0 },
  { id: 'IMO-334455', name: 'NORTHERN LIGHTS', lat: 60.39, lng: 5.32, status: 'safe', rScore: 0.04, type: 'Offshore Supply', flag: 'NOR', dest: 'Bergen', speed: 12.2 }
];

export const INTELLIGENCE_FEED = [
  { id: 101, type: 'leak', level: 'high', title: 'Credential Dump: Chief Engineer', vessel: 'NORDIC EMPRESS', time: '10m ago', source: 'Telegram Bot', details: 'A dump containing "chief.eng@nordicempress.vsl" with a plaintext password was found in a Telegram threat actor channel.' },
  { id: 102, type: 'anomaly', level: 'medium', title: 'AIS Route Deviation Detect', vessel: 'AEGEAN STAR', time: '1h ago', source: 'Telemetry Engine', details: 'Vessel altered course 15 degrees off planned route towards Singapore, bypassing designated traffic lanes.' },
  { id: 103, type: 'scan', level: 'high', title: 'Exposed Satcom Terminal (VSAT)', vessel: 'NORDIC EMPRESS', time: '2h ago', source: 'Shodan API', details: 'Cobham SAILOR 900 VSAT terminal management interface exposed on port 80/443 without authentication.' },
  { id: 104, type: 'anomaly', level: 'high', title: 'AIS Signal Lost (Spoofing Suspected)', vessel: 'EBONY MARINER', time: '30m ago', source: 'Telemetry Engine', details: 'Vessel track disappeared from AIS in the Gulf of Guinea. Last speed 0.0kn. Possible pirate activity or deliberate GPS spoofing.' },
  { id: 105, type: 'leak', level: 'medium', title: 'Corporate Email Compromise', vessel: 'MEDITERRANEAN SUN', time: '4h ago', source: 'IntelX', details: 'Credentials for the shore-side fleet manager responsible for MEDITERRANEAN SUN were leaked in a recent breach.' },
  { id: 106, type: 'scan', level: 'medium', title: 'Outdated ECDIS Software', vessel: 'BALTIC PRINCESS', time: '1d ago', source: 'Active Scan', details: 'Banner grabbing indicates the vessel is running a vulnerable version of JRC ECDIS software.' },
  { id: 107, type: 'leak', level: 'low', title: 'Crew Social Media Exposure', vessel: 'INDIAN PRIDE', time: '2d ago', source: 'OSINT', details: 'Crew member posted photos showing clear views of bridge equipment and network topology diagrams on Facebook.' },
  { id: 108, type: 'scan', level: 'high', title: 'Exposed OT: Engine Control PLC', vessel: 'EBONY MARINER', time: '5m ago', source: 'Censys', details: 'Siemens S7-1200 PLC port 102 exposed to the public internet. Correlates with suspected physical takeover.' }
];

export const FLEET_METRICS = {
  totalVessels: 12450,
  activeThreats: 142,
  criticalAlerts: 12,
  exposedSystems: 341,
  coverage: 84
};
