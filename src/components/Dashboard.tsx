import { Activity, ShieldAlert, Zap, Server, Globe, Signal, AlertOctagon, History, Database } from 'lucide-react';

export default function Dashboard({ metrics, vessels, intelligence }: any) {
  
  const highRisk = vessels.filter((v: any) => v.status === 'high-risk').length;
  const suspicious = vessels.filter((v: any) => v.status === 'suspicious').length;
  const safe = vessels.filter((v: any) => v.status === 'safe').length;

  return (
    <div className="p-8 h-full overflow-y-auto w-full">
      <header className="mb-8">
        <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
            <Activity className="w-6 h-6 mr-3 text-accent" /> 
            Executive Command Dashboard
        </h2>
        <p className="text-secondary font-mono text-sm mt-2">Global Fleet Cyber-Physical Posture Overview</p>
      </header>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card flex flex-col items-center justify-center py-8 relative overflow-hidden group">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-danger to-transparent opacity-50"></div>
            <div className="text-5xl font-mono text-danger mb-2 font-bold drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">{highRisk}</div>
            <div className="text-xs text-secondary uppercase tracking-widest flex items-center"><ShieldAlert className="w-3 h-3 mr-1 text-danger"/> Critical Threats</div>
        </div>
        <div className="glass-card flex flex-col items-center justify-center py-8">
            <div className="text-5xl font-mono text-warning mb-2 font-bold drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]">{suspicious}</div>
            <div className="text-xs text-secondary uppercase tracking-widest flex items-center"><AlertOctagon className="w-3 h-3 mr-1 text-warning"/> Suspicious Signals</div>
        </div>
        <div className="glass-card flex flex-col items-center justify-center py-8">
            <div className="text-5xl font-mono text-slate-100 mb-2 font-bold">{vessels.length}</div>
            <div className="text-xs text-secondary uppercase tracking-widest flex items-center"><Globe className="w-3 h-3 mr-1"/> Active Vessels</div>
        </div>
        <div className="glass-card flex flex-col items-center justify-center py-8 relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <div className="text-5xl font-mono text-accent mb-2 font-bold focus:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">{metrics.coverage}%</div>
            <div className="text-xs text-secondary uppercase tracking-widest flex items-center"><Signal className="w-3 h-3 mr-1 text-accent"/> Sensor Coverage</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Risk Distribution Column */}
        <div className="space-y-6">
            <div className="glass-card p-6">
                <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-4 border-b border-border/50 pb-2">Fleet Risk Distribution</h3>
                <div className="flex h-12 w-full rounded overflow-hidden mt-6 mb-4">
                    <div style={{width: `${(safe/vessels.length)*100}%`}} className="bg-safe/60 hover:bg-safe transition-colors"></div>
                    <div style={{width: `${(suspicious/vessels.length)*100}%`}} className="bg-warning/60 hover:bg-warning transition-colors border-l border-background"></div>
                    <div style={{width: `${(highRisk/vessels.length)*100}%`}} className="bg-danger/60 hover:bg-danger transition-colors border-l border-background"></div>
                </div>
                <div className="flex justify-between text-xs font-mono text-secondary">
                    <span>Safe: {safe}</span>
                    <span>Suspicious: {suspicious}</span>
                    <span>Critical: {highRisk}</span>
                </div>
            </div>

            <div className="glass-card p-6">
               <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-4 border-b border-border/50 pb-2">IT/OT Surface Exposure</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-slate-400"><Server className="w-4 h-4 mr-2"/> VSAT Terminals</span>
                      <span className="font-mono text-danger font-bold">142</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-slate-400"><Database className="w-4 h-4 mr-2"/> ECDIS Instances</span>
                      <span className="font-mono text-warning font-bold">58</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-slate-400"><Zap className="w-4 h-4 mr-2"/> Engine Controllers</span>
                      <span className="font-mono text-danger font-bold">12</span>
                  </div>
               </div>
            </div>
        </div>

        {/* Intelligence Feed Column */}
        <div className="lg:col-span-2 space-y-6">
           <div className="glass-card p-6 h-full flex flex-col">
              <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-4 border-b border-border/50 pb-2 flex justify-between">
                <span><History className="inline w-4 h-4 mr-2"/> Recent Intelligence Events</span>
                <span className="text-xs text-accent cursor-pointer hover:underline">View All</span>
              </h3>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                 {intelligence.slice(0, 5).map((item: any) => (
                    <div key={item.id} className="flex flex-col bg-surface/40 p-3 text-sm border-l-2 hover:bg-surface transition-colors cursor-pointer" style={{ borderLeftColor: item.level === 'high' ? '#EF4444' : item.level === 'medium' ? '#F59E0B' : '#64748B' }}>
                       <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-slate-200">{item.vessel}</span>
                          <span className="text-[10px] text-secondary">{item.time}</span>
                       </div>
                       <div className="text-slate-300 mb-2">{item.title}</div>
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-secondary px-2 py-0.5 rounded bg-background border border-border shrink-0">{item.source}</span>
                          <span className="text-[10px] text-secondary truncate ml-4 md:block hidden">{item.details}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
