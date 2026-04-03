<p align="center">
  <img src="https://img.shields.io/badge/ABYSS-LENS-00E5FF?style=for-the-badge&logo=radar&logoColor=white" alt="AbyssLens" />
</p>

<h1 align="center">AbyssLens — Maritime Cyber-Physical Intelligence Platform</h1>

<p align="center">
  <em>Real-time convergence of maritime domain awareness, cyber threat intelligence, and OT security monitoring.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet" />
  <img src="https://img.shields.io/badge/Node.js-Proxy-339933?style=flat-square&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-00E676?style=flat-square" />
  <img src="https://img.shields.io/badge/Mode-Live%20%7C%20Demo-06B6D4?style=flat-square" />
  <img src="https://img.shields.io/badge/Scenarios-4%20Threat%20Campaigns-EF4444?style=flat-square" />
  <img src="https://img.shields.io/badge/APIs-6%20Intelligence%20Sources-F59E0B?style=flat-square" />
</p>

---

## 🔍 Overview

**AbyssLens** is a maritime security intelligence platform that fuses **AIS vessel tracking**, **cyber threat intelligence**, **OT/IoT sensor telemetry**, and **OSINT** into a unified tactical operating picture. Designed for SOC analysts, maritime security teams, and fleet operators, it enables real-time detection of cyber-physical threats targeting the global maritime infrastructure.

The platform operates in two modes:
- **🟢 LIVE** — Connects to real-time intelligence APIs, hardware SDR receivers, and MQTT sensor bridges
- **🔵 DEMO** — Four ultra-realistic threat campaign simulations with full data across all modules

---

## ⚡ Key Features

### 🗺️ Core Modules
| Module | Description |
|--------|-------------|
| **Executive Dashboard** | Real-time threat metrics, fleet risk distribution, recent intelligence events |
| **Tactical Map** | Leaflet-based global AIS tracking with vessel trails, risk overlays, and geofencing |
| **Fleet Monitor** | Full vessel database with filtering, risk scoring, and digital twin access |
| **Intelligence Feed** | Aggregated multi-source threat events with IOC extraction |

### 🧠 Analysis Modules
| Module | Description |
|--------|-------------|
| **Correlation Graph** | Interactive entity relationship visualization — vessels, IPs, credentials, IOCs |
| **Exposure Scanner** | IT/OT infrastructure scanning with PulseDive, AbuseIPDB, and OTX integration |
| **Risk Engine** | Continuous risk scoring engine with configurable triage rules |
| **Cross-Domain Agent** | Automated correlation chain analysis with MITRE ATT&CK for ICS mapping |

### 📡 Source Modules
| Module | Description |
|--------|-------------|
| **Maritime News** | Real-time news aggregation with sentiment analysis and vessel linking |
| **RF/Hardware Gateway** | HackRF/RTL-SDR AIS reception, NMEA serial input, live RF spectrum |
| **IoT Sensor Grid** | Fleet-wide IoT telemetry — fuel, vibration, bilge, GPS integrity monitoring |

---

## 🛡️ Demo Scenarios

AbyssLens includes **4 fully-realized threat campaign simulations**, each with 10-14 vessels, 8-12 intelligence events, news articles, exposure scans, IOCs, sensor telemetry, and correlation graphs:

| # | Codename | Region | Threat Type |
|---|----------|--------|-------------|
| **S1** | `OPERATION DARK TIDE` | Gulf of Guinea | Piracy + Cyber-Physical OT compromise on oil tanker |
| **S2** | `OPERATION PHANTOM RUDDER` | Strait of Hormuz | State-sponsored SATCOM breach + ECDIS navigation hijack |
| **S3** | `OPERATION GHOST CARGO` | Mediterranean Sea | Dark fleet sanctions evasion with AIS identity spoofing |
| **S4** | `OPERATION BURNING HORIZON` | Strait of Hormuz | **Full-spectrum attack**: IRGCN drone strike + GPS jamming + APT C2 + crew data exfiltration via Telegram |

> **S4 (BlackHat Demo)** — Reflects current geopolitical tensions in the Strait of Hormuz. Features a Greek-flagged tanker struck by an IRGCN suicide drone, with simultaneous MuddyWater APT compromise of VSAT systems, wide-area GPS jamming from Qeshm Island, crew PII leaked on Telegram channels, and cascading OT sensor failures. Includes 11 news items from Reuters, LiveUAMap, Bloomberg, Telegram OSINT, Planet Labs, and CENTCOM.

---

## 🔌 API Integrations

All API keys are proxied through a local Node.js backend (`localhost:3001`) to prevent CORS issues and client-side key exposure.

| Service | Protocol | Purpose |
|---------|----------|---------|
| [AISStream.io](https://aisstream.io) | WebSocket | Real-time AIS vessel positions, speed, heading, identity |
| [NewsData.io](https://newsdata.io) | REST | Maritime security news feed with keyword filtering |
| [OTX AlienVault](https://otx.alienvault.com) | REST | IOC lookups, threat pulses, adversary intelligence |
| [AbuseIPDB](https://www.abuseipdb.com) | REST | IP reputation scoring for maritime infrastructure |
| [PulseDive](https://pulsedive.com) | REST | Threat indicator scanning and risk assessment |
| [LiveUAMap](https://liveuamap.com) | REST | Real-time conflict zone monitoring in GeoJSON |

> **Setup**: Navigate to **Settings → API Integrations**, paste your API key, click **Save**. The service auto-tests and shows connection status.

---

## 🔧 Hardware Support

AbyssLens supports modular hardware integration for shore-based AIS reception and fleet IoT telemetry:

| Device | Type | Configuration |
|--------|------|---------------|
| **HackRF One** | SDR | AIS Ch. A/B demodulation (161.975/162.025 MHz), configurable gain/LNA/VGA |
| **RTL-SDR v3** | SDR | Low-cost AIS monitoring via `rtl_ais` binary |
| **Serial NMEA** | RS-232/USB | Direct NMEA 0183 sentences (AIVDM, AIVDO, GPGGA, GPRMC) |
| **VHF Antenna** | Passive | GP-3E collinear, SMA connector, mast/roof mount |
| **MQTT Bridge** | IoT | Fleet sensor telemetry — fuel, vibration, bilge, GPS integrity topics |

> All hardware devices can be enabled/disabled and configured in **Settings → Hardware Integrations** with expandable configuration panels.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/yourusername/abysslens.git
cd abysslens
npm install
```

### Running

```bash
# Frontend only (Demo mode — no API keys needed)
npm run dev:frontend

# Full stack (Frontend + API Proxy Server)
npm run dev

# Production build
npm run build
```

The app will be available at `http://localhost:5173`. The proxy server runs on `http://localhost:3001`.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AbyssLens Frontend                      │
│  React 19 + TypeScript + Tailwind 4 + Leaflet + Recharts   │
├─────────────┬─────────────┬──────────────┬──────────────────┤
│  Dashboard  │  Tactical   │  Intel Feed  │  Cross-Domain    │
│  Module     │  Map        │  + News      │  Agent           │
├─────────────┴─────────────┴──────────────┴──────────────────┤
│                    AppContext (Global State)                 │
│          Mode • Scenario • API Keys • Hardware              │
├─────────────────────────────────────────────────────────────┤
│                 API Service Layer (apiService.ts)            │
├─────────────────────────────────────────────────────────────┤
│                Node.js Proxy Server (:3001)                  │
│  ┌──────┐  ┌──────┐  ┌─────┐  ┌────────┐  ┌──────────┐    │
│  │  AIS │  │ News │  │ OTX │  │AbuseDB │  │PulseDive │    │
│  │  WS  │  │ Data │  │     │  │        │  │          │    │
│  └──┬───┘  └──┬───┘  └──┬──┘  └───┬────┘  └────┬─────┘    │
├─────┼─────────┼─────────┼──────────┼────────────┼──────────┤
│     ▼         ▼         ▼          ▼            ▼          │
│  External APIs (keys stored server-side only)               │
├─────────────────────────────────────────────────────────────┤
│  Hardware Gateway                                           │
│  ┌─────────┐  ┌──────────┐  ┌──────┐  ┌──────────────┐    │
│  │ HackRF  │  │ RTL-SDR  │  │ NMEA │  │ MQTT Bridge  │    │
│  │ One     │  │ v3       │  │ Serial│  │ (IoT Sensors)│    │
│  └─────────┘  └──────────┘  └──────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
abysslens/
├── public/                     # Static assets
├── server/
│   └── proxy.ts                # Node.js API proxy + WebSocket relay
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx       # Executive command dashboard
│   │   ├── TacticalMap.tsx     # Leaflet global AIS map
│   │   ├── FleetMonitor.tsx    # Vessel database & filtering
│   │   ├── IntelligenceFeed.tsx# Multi-source threat events
│   │   ├── CorrelationGraph.tsx# Entity relationship graph
│   │   ├── ExposureScanner.tsx # IT/OT vulnerability scanner
│   │   ├── RiskEngine.tsx      # Continuous risk scoring
│   │   ├── CrossDomainAgent.tsx# MITRE ATT&CK correlation
│   │   ├── MaritimeNews.tsx    # News intelligence module
│   │   ├── HardwareGateway.tsx # SDR/NMEA hardware interface
│   │   ├── IoTSensorGrid.tsx   # Fleet IoT sensor dashboard
│   │   ├── VesselTwin.tsx      # Digital twin slide-out panel
│   │   └── Settings.tsx        # API keys + hardware config
│   ├── context/
│   │   └── AppContext.tsx       # Global state management
│   ├── data/
│   │   └── demoScenarios.ts    # 4 threat campaign datasets
│   ├── hooks/
│   │   └── useApiConnection.ts # API connection management
│   ├── services/
│   │   └── apiService.ts       # Unified API layer
│   ├── App.tsx                 # Main app with routing
│   └── index.css               # Tactical dark theme
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Design System

AbyssLens uses a **Tactical Dark** theme optimized for SOC environments:

- **Background**: `#050A14` — Deep navy black
- **Surface/Panel**: `#0A1628` with glassmorphism blur
- **Accent**: `#06B6D4` — Cyan for active elements
- **Danger**: `#EF4444` — Red for critical threats
- **Warning**: `#F59E0B` — Amber for suspicious activity
- **Safe**: `#22C55E` — Green for healthy systems
- **Typography**: Inter (UI) + Roboto Mono (data/code)

---

## 📋 Configuration

### Environment Variables

No `.env` file required. All API keys are stored in `localStorage` and managed through the Settings UI.

### Proxy Server Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `WS /ais` | WebSocket | AISStream.io relay |
| `GET /api/news` | GET | NewsData.io proxy |
| `GET /api/otx/*` | GET | OTX AlienVault proxy |
| `GET /api/abuseipdb/check` | GET | AbuseIPDB check proxy |
| `GET /api/pulsedive/*` | GET | PulseDive proxy |
| `WS /hardware` | WebSocket | SDR/NMEA hardware gateway |
| `WS /iot` | WebSocket | IoT MQTT-to-WebSocket bridge |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built for maritime security professionals who operate at the intersection of cyber and physical threat domains.</strong>
</p>

<p align="center">
  <sub>AbyssLens — Where the digital ocean meets the physical one.</sub>
</p>
