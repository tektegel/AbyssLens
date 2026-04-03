import { Brain, Zap, ChevronRight, AlertTriangle, Shield, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getScenario } from '../data/demoScenarios';
import { useState, useEffect } from 'react';

const MITRE_MAPPINGS = [
  { tactic: 'Initial Access', technique: 'T0866 — Exploitation of Remote Services', description: 'VSAT terminal default credentials exploited' },
  { tactic: 'Execution', technique: 'T0871 — Execution through API', description: 'S7COMM protocol used to send commands to PLC' },
  { tactic: 'Persistence', technique: 'T0839 — Module Firmware', description: 'Backdoor inserted into ECDIS firmware update' },
  { tactic: 'Evasion', technique: 'T0872 — Indicator Removal', description: 'AIS transponder manipulation to mask position' },
  { tactic: 'Collection', technique: 'T0802 — Automated Collection', description: 'Credential harvesting from bridge network' },
  { tactic: 'Impact', technique: 'T0831 — Manipulation of Control', description: 'Engine PLC commands altered, fuel injection modified' },
];

export default function CrossDomainAgent() {
  const { activeScenario } = useAppContext();
  const scenario = getScenario(activeScenario);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [showChain, setShowChain] = useState(false);

  const correlationChain = [
    { step: 1, action: 'OSINT Collection', detail: `Detected credential leak for ${scenario.vessels[0]?.name} crew`, status: 'complete' },
    { step: 2, action: 'Infrastructure Scan', detail: 'Cross-referenced leaked identity with exposed VSAT/OT systems', status: 'complete' },
    { step: 3, action: 'Telemetry Analysis', detail: 'AIS anomaly detected — correlates with exposure timeline', status: 'complete' },
    { step: 4, action: 'Threat Intel Enrichment', detail: 'IOCs matched against OTX/PulseDive threat feeds', status: 'complete' },
    { step: 5, action: 'IoT Sensor Validation', detail: 'Physical sensor data confirms digital anomaly hypothesis', status: 'complete' },
    { step: 6, action: 'Hypothesis Generation', detail: `HIGH CONFIDENCE: Coordinated cyber-physical attack on ${scenario.vessels[0]?.name}`, status: 'active' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setThinkingStep(prev => {
        if (prev >= correlationChain.length - 1) {
          setShowChain(true);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [activeScenario]);

  return (
    <div className="p-8 h-full flex flex-col w-full overflow-y-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
          <Brain className="w-6 h-6 mr-3 text-accent" /> Cross-Domain Correlation Agent
        </h2>
        <p className="text-secondary font-mono text-sm mt-1">Automated multi-source threat hypothesis engine — {scenario.codename}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Correlation Chain */}
        <div className="glass-card p-6 flex flex-col">
          <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-6 border-b border-border/50 pb-2 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-accent" /> Correlation Chain Analysis
          </h3>
          <div className="space-y-3 flex-1">
            {correlationChain.map((step, idx) => {
              const isActive = idx === thinkingStep && !showChain;
              const isComplete = idx < thinkingStep || showChain;
              return (
                <div key={idx} className={`flex items-start space-x-3 p-3 rounded border transition-all duration-500 ${
                  isActive ? 'border-accent/50 bg-accent/10 animate-pulse' :
                  isComplete ? 'border-border/30 bg-surface/30' : 'border-transparent opacity-30'
                }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                    isComplete ? 'bg-safe/20 text-safe border border-safe/30' :
                    isActive ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-surface text-secondary border border-border'
                  }`}>
                    {isComplete ? '✓' : step.step}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">{step.action}</div>
                    <div className="text-xs text-secondary mt-0.5">{step.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {showChain && (
            <div className="mt-4 p-4 bg-danger/10 border border-danger/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <span className="text-sm font-bold text-danger uppercase">Threat Hypothesis Generated</span>
              </div>
              <p className="text-xs text-danger/80 font-mono leading-relaxed">{scenario.description}</p>
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-danger/20 text-danger border border-danger/30 font-mono">CONFIDENCE: 94%</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30 font-mono">{scenario.intelligence.length} SIGNALS</span>
              </div>
            </div>
          )}
        </div>

        {/* MITRE ATT&CK Mapping + IOCs */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-4 border-b border-border/50 pb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-warning" /> MITRE ATT&CK for ICS Mapping
            </h3>
            <div className="space-y-2">
              {MITRE_MAPPINGS.map((m, i) => (
                <div key={i} className="flex items-start space-x-3 p-2 hover:bg-surface/50 rounded transition-colors cursor-pointer group">
                  <span className="text-[10px] font-mono text-warning shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-warning/10 border border-warning/20">{m.tactic}</span>
                  <div>
                    <div className="text-xs font-mono text-slate-200 group-hover:text-accent transition-colors">{m.technique}</div>
                    <div className="text-[10px] text-secondary">{m.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-4 border-b border-border/50 pb-2 flex items-center">
              <Search className="w-4 h-4 mr-2 text-accent" /> Extracted IOCs
            </h3>
            <div className="space-y-2">
              {scenario.iocs.slice(0, 6).map((ioc, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-surface/50 rounded transition-colors">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                      ioc.risk === 'critical' ? 'text-danger border-danger/30 bg-danger/10' :
                      ioc.risk === 'high' ? 'text-warning border-warning/30 bg-warning/10' : 'text-secondary border-border bg-surface'
                    }`}>{ioc.type.toUpperCase()}</span>
                    <span className="text-xs font-mono text-slate-300 truncate">{ioc.indicator}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-secondary shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
