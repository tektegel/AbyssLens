import { useState, useEffect } from 'react';
import { 
  Search, Bell, User, Activity, ShieldAlert, Network, 
  Settings as SettingsIcon, Ship, Globe2, Target, 
  Database, Radar, Newspaper, Radio, Plug, Brain,
  Zap, Monitor
} from 'lucide-react';

import { AppProvider, useAppContext } from './context/AppContext';
import { getScenario, getScenarioVesselsAsLegacy, DEMO_SCENARIOS } from './data/demoScenarios';

import TacticalMap from './components/TacticalMap';
import Dashboard from './components/Dashboard';
import FleetMonitor from './components/FleetMonitor';
import IntelligenceFeed from './components/IntelligenceFeed';
import ExposureScanner from './components/ExposureScanner';
import RiskEngine from './components/RiskEngine';
import Settings from './components/Settings';
import CorrelationGraphMockup from './components/CorrelationGraph';
import VesselTwin from './components/VesselTwin';
import MaritimeNews from './components/MaritimeNews';
import HardwareGateway from './components/HardwareGateway';
import IoTSensorGrid from './components/IoTSensorGrid';
import CrossDomainAgent from './components/CrossDomainAgent';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { mode, setMode, activeScenario, setActiveScenario } = useAppContext();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedVessel, setSelectedVessel] = useState<any>(null);
  const [pulse, setPulse] = useState(false);

  const scenario = getScenario(activeScenario);
  const vessels = getScenarioVesselsAsLegacy(scenario);
  const intelligence = scenario.intelligence;
  const metrics = scenario.metrics;

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-sm font-sans">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-16 lg:w-64 glass-panel border-y-0 border-l-0 rounded-none z-20 flex flex-col flex-shrink-0 transition-all duration-300">
        {/* Brand */}
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border/50">
          <Radar className="w-8 h-8 text-accent shrink-0" />
          <span className="ml-3 font-mono font-bold text-lg tracking-widest hidden lg:block text-slate-100">
            ABYSS<span className="text-secondary">LENS</span>
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
          <div className="hidden lg:block text-[9px] font-mono uppercase text-secondary/50 tracking-widest px-3 py-2">Core</div>
          <NavItem icon={<Activity />} label="Dashboard" onClick={() => setActiveModule('dashboard')} active={activeModule === 'dashboard'} />
          <NavItem icon={<Globe2 />} label="Global Map" onClick={() => setActiveModule('map')} active={activeModule === 'map'} />
          <NavItem icon={<Ship />} label="Fleet Monitor" onClick={() => setActiveModule('fleet')} active={activeModule === 'fleet'} />
          <NavItem icon={<Database />} label="Intelligence Feed" onClick={() => setActiveModule('intel')} active={activeModule === 'intel'} />
          
          <div className="hidden lg:block text-[9px] font-mono uppercase text-secondary/50 tracking-widest px-3 py-2 mt-2">Analysis</div>
          <NavItem icon={<Network />} label="Correlation Graph" onClick={() => setActiveModule('graph')} active={activeModule === 'graph'} />
          <NavItem icon={<Target />} label="Exposure Scanner" onClick={() => setActiveModule('scanner')} active={activeModule === 'scanner'} />
          <NavItem icon={<ShieldAlert />} label="Risk Engine" onClick={() => setActiveModule('risk')} active={activeModule === 'risk'} />
          <NavItem icon={<Brain />} label="Cross-Domain Agent" onClick={() => setActiveModule('agent')} active={activeModule === 'agent'} />
          
          <div className="hidden lg:block text-[9px] font-mono uppercase text-secondary/50 tracking-widest px-3 py-2 mt-2">Sources</div>
          <NavItem icon={<Newspaper />} label="Maritime News" onClick={() => setActiveModule('news')} active={activeModule === 'news'} />
          <NavItem icon={<Radio />} label="RF Gateway" onClick={() => setActiveModule('hardware')} active={activeModule === 'hardware'} />
          <NavItem icon={<Plug />} label="IoT Sensors" onClick={() => setActiveModule('iot')} active={activeModule === 'iot'} />
        </div>

        <div className="p-3 border-t border-border/50">
          <NavItem icon={<SettingsIcon />} label="Settings" onClick={() => setActiveModule('settings')} active={activeModule === 'settings'} />
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        
        {/* Top Navigation Bar */}
        <header className="h-16 glass-panel border-x-0 border-t-0 rounded-none flex items-center justify-between px-6 shrink-0 z-30">
          
          {/* Global Search */}
          <div className="w-80 relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-secondary" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-border/50 rounded-md leading-5 bg-surface/50 text-slate-300 placeholder-secondary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm font-mono backdrop-blur-sm transition-colors" 
              placeholder="Search IMO, MMSI, Threat Actor, IP..." 
            />
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-1 mx-4">
            <button
              onClick={() => setMode('live')}
              className={`flex items-center px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-l-md border transition-all ${
                mode === 'live'
                  ? 'bg-safe/20 border-safe/40 text-safe shadow-[0_0_12px_rgba(34,197,94,0.2)]'
                  : 'bg-surface/50 border-border/50 text-secondary hover:text-slate-300'
              }`}
            >
              <Zap className="w-3 h-3 mr-1.5" /> Live
            </button>
            <button
              onClick={() => setMode('demo')}
              className={`flex items-center px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-r-md border border-l-0 transition-all ${
                mode === 'demo'
                  ? 'bg-accent/20 border-accent/40 text-accent shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'bg-surface/50 border-border/50 text-secondary hover:text-slate-300'
              }`}
            >
              <Monitor className="w-3 h-3 mr-1.5" /> Demo
            </button>
          </div>

          {/* Scenario Selector (Demo only) */}
          {mode === 'demo' && (
            <div className="hidden lg:flex items-center space-x-1">
              {DEMO_SCENARIOS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(s.id as 1 | 2 | 3)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded border transition-all whitespace-nowrap ${
                    activeScenario === s.id
                      ? 'bg-accent/15 border-accent/40 text-accent'
                      : 'bg-surface/30 border-border/30 text-secondary hover:text-slate-300 hover:border-border'
                  }`}
                  title={s.name}
                >
                  S{s.id}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <button className="relative p-1 text-secondary hover:text-slate-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse ring-2 ring-background"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-border/50 pl-6 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-slate-200 group-hover:text-accent transition-colors">Operator Alpha</div>
                <div className="text-xs text-secondary font-mono">SOC Level 3</div>
              </div>
              <div className="h-8 w-8 rounded bg-surface border border-border flex items-center justify-center">
                <User className="h-4 w-4 text-slate-300" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Canvas Area */}
        <div className="flex-1 relative overflow-hidden bg-[#050A14]">
          {activeModule !== 'map' && (
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 z-0"></div>
          )}

          <div className="absolute inset-0 z-10 overflow-hidden flex">
            {activeModule === 'dashboard' && <Dashboard vessels={vessels} metrics={metrics} intelligence={intelligence} />}
            {activeModule === 'map' && <TacticalMap vessels={vessels} pulse={pulse} onSelectVessel={setSelectedVessel} />}
            {activeModule === 'fleet' && <FleetMonitor vessels={vessels} onSelectVessel={setSelectedVessel} />}
            {activeModule === 'intel' && <IntelligenceFeed intelligence={intelligence} />}
            {activeModule === 'graph' && <CorrelationGraphMockup />}
            {activeModule === 'scanner' && <ExposureScanner />}
            {activeModule === 'risk' && <RiskEngine vessels={vessels} />}
            {activeModule === 'settings' && <Settings />}
            {activeModule === 'news' && <MaritimeNews />}
            {activeModule === 'hardware' && <HardwareGateway />}
            {activeModule === 'iot' && <IoTSensorGrid />}
            {activeModule === 'agent' && <CrossDomainAgent />}
          </div>

          {/* Right Context Panel (Digital Twin Slide-out) */}
          <div className={`absolute top-0 right-0 h-full w-full sm:w-[500px] z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${selectedVessel ? 'translate-x-0' : 'translate-x-full'}`}>
            {selectedVessel && (
              <VesselTwin 
                vessel={selectedVessel} 
                onClose={() => setSelectedVessel(null)} 
                intelligence={intelligence}
              />
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ icon, label, onClick, active }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2.5 rounded-lg border border-transparent transition-all duration-200 group
        ${active ? 'bg-accent/10 border-accent/20 text-accent' : 'text-slate-400 hover:bg-surface/50 hover:text-slate-200'}
      `}
    >
      <div className={`shrink-0 ${activeRefIndicator(active)}`}>
        {icon}
      </div>
      <span className={`ml-3 font-medium text-sm hidden lg:block tracking-wide whitespace-nowrap opacity-90 group-hover:opacity-100 ${active ? 'text-slate-100' : ''}`}>
        {label}
      </span>
    </button>
  );
}

const activeRefIndicator = (isActive: boolean) => 
  isActive ? "text-accent drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "text-secondary group-hover:text-slate-300";
