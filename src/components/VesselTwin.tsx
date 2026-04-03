import { Cpu, Fingerprint, Waves, ChevronRight, X } from 'lucide-react';

export default function VesselTwin({ vessel, onClose, intelligence }: any) {
  
  let riskColor = 'text-safe drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]';
  let gaugeColor = 'stroke-safe';
  
  if (vessel.status === 'suspicious') { riskColor = 'text-warning drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'; gaugeColor = 'stroke-warning'; }
  if (vessel.status === 'high-risk') { riskColor = 'text-danger drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'; gaugeColor = 'stroke-danger'; }

  const riskPercent = Math.round(vessel.rScore * 100);

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur-3xl overflow-y-auto overflow-x-hidden border-l border-border shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="p-6 border-b border-border/50 flex justify-between items-start sticky top-0 bg-background/90 backdrop-blur-md z-10 shrink-0">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="text-xl font-mono text-slate-100 font-bold tracking-tight uppercase truncate max-w-[200px]" title={vessel.name}>{vessel.name}</h2>
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded uppercase tracking-wider border ${vessel.status === 'high-risk' ? 'bg-danger/20 border-danger/50 text-danger' : vessel.status === 'suspicious' ? 'bg-warning/20 border-warning/50 text-warning' : 'bg-safe/20 border-safe/50 text-safe'}`}>
              {vessel.status}
            </span>
          </div>
          <p className="text-xs text-secondary font-mono">ID: {vessel.id} &nbsp;|&nbsp; TYPE: {vessel.type}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-surface rounded-full text-secondary hover:text-slate-100 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-8 flex-1">
        
        {/* Risk Score Engine Output */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase">Risk Engine Analysis</h3>
          </div>
          <div className="glass-card flex items-center p-6 border-border/50">
            {/* Simple SVG Gauge */}
            <div className="relative w-24 h-24 shrink-0 -ml-2">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" className="stroke-surface fill-none" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" className={`${gaugeColor} fill-none`} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * riskPercent / 100)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className={`text-2xl font-mono font-bold ${riskColor}`}>{riskPercent}</span>
              </div>
            </div>
            
            <div className="block ml-6 flex-1 space-y-3">
               <div>
                 <div className="flex justify-between text-xs font-mono mb-1">
                   <span className="text-slate-300">Identity Leaks (45%)</span>
                   <span className="text-danger font-bold">{(vessel.rScore * 0.45).toFixed(2)}</span>
                 </div>
                 <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                   <div className="h-full bg-danger w-[45%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-mono mb-1">
                   <span className="text-slate-300">System Exposure (30%)</span>
                   <span className="text-warning font-bold">{(vessel.rScore * 0.30).toFixed(2)}</span>
                 </div>
                 <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                   <div className="h-full bg-warning w-[30%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-mono mb-1">
                   <span className="text-slate-300">AIS Anomaly (25%)</span>
                   <span className="text-danger font-bold">{(vessel.rScore * 0.25).toFixed(2)}</span>
                 </div>
                 <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                   <div className="h-full bg-danger w-[25%] animate-pulse"></div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Intelligence Feed Specific to Vessel */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
             <Fingerprint className="w-4 h-4 text-accent" />
             <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase">Correlated Intelligence</h3>
          </div>
          <div className="space-y-3">
             {intelligence.filter((i: any) => i.vessel === vessel.name).length === 0 && (
               <div className="text-sm text-secondary italic">No active intelligence signals triggering.</div>
             )}
             {intelligence.filter((i: any) => i.vessel === vessel.name).map((item: any) => (
                <div key={item.id} className="glass-card hover:bg-surface/60 p-4 border-l-2" style={{ borderLeftColor: item.level === 'high' ? '#EF4444' : item.level === 'medium' ? '#F59E0B' : '#10B981' }}>
                   <div className="flex justify-between mb-2 items-center">
                     <span className="text-[10px] uppercase tracking-wider font-mono text-secondary px-2 py-0.5 rounded bg-surface border border-border">{item.source}</span>
                     <span className="text-xs text-secondary">{item.time}</span>
                   </div>
                   <h4 className="text-sm font-medium text-slate-200 mb-1">{item.title}</h4>
                   <p className="text-[10px] text-slate-400 mt-1">{item.details}</p>
                   <p className="text-xs text-accent font-mono flex items-center mt-3 group cursor-pointer hover:text-white transition-colors">
                     View Raw Signal Evidence <ChevronRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                   </p>
                </div>
             ))}
          </div>
        </section>

        {/* Telemetry Timeline Mini */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
             <Waves className="w-4 h-4 text-accent" />
             <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase">Operational Telemetry</h3>
          </div>
          <div className="glass-card p-4 flex flex-col items-center justify-center border-border/50 text-secondary border-dashed h-40">
             <div className="w-full h-full relative p-2">
                 <div className="absolute bottom-4 left-4 right-4 h-px bg-slate-700/50"></div>
                 <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <polyline points="0,80 20,70 40,75 60,30 80,20 100,25" fill="none" stroke="#06B6D4" strokeWidth="2" strokeOpacity="0.8"/>
                    {vessel.rScore > 0.6 && (
                        <>
                           <circle cx="60" cy="30" r="4" className="fill-danger animate-pulse"/>
                           <text x="60" y="20" fill="#EF4444" fontSize="8" textAnchor="middle" className="font-mono">ANOMALY</text>
                        </>
                    )}
                 </svg>
                 <div className="absolute top-2 left-4 text-[10px] text-slate-500 font-mono">24H Speed (Knots)</div>
             </div>
          </div>
        </section>
        
        {/* Actions */}
        <div className="pt-4 flex gap-3">
           <button className="flex-1 bg-surface border border-border px-4 py-3 rounded text-sm font-mono font-bold text-slate-200 hover:bg-surface/80 hover:text-white transition-colors">Generate Report</button>
           <button className="flex-1 bg-accent/10 border border-accent/40 shadow-[0_0_15px_rgba(6,182,212,0.1)] px-4 py-3 rounded text-sm font-mono font-bold text-accent hover:bg-accent hover:text-[#0A0F1A] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">Expand Threat Graph</button>
        </div>

      </div>
    </div>
  )
}
