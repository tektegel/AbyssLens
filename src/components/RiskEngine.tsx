import { ShieldAlert, TrendingUp, AlertTriangle, Cpu } from 'lucide-react';

export default function RiskEngine({ vessels }: any) {
  return (
    <div className="p-8 h-full flex flex-col w-full">
       <header className="mb-6">
           <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
               <ShieldAlert className="w-6 h-6 mr-3 text-danger" /> 
               Proprietary Risk Engine
           </h2>
           <p className="text-secondary font-mono text-sm mt-1">Multi-vector Cyber-Physical threat scoring model</p>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
           
           <div className="glass-card flex flex-col p-6 space-y-6 overflow-y-auto">
               <div>
                  <h3 className="text-lg font-mono tracking-widest text-slate-200 uppercase mb-2 flex items-center">
                     <Cpu className="w-5 h-5 mr-2 text-accent"/> Scoring Algorithm Weights
                  </h3>
                  <p className="text-secondary text-sm mb-4">The (R) score is calculated using three primary vectors correlated in real-time.</p>
                  
                  <div className="space-y-4">
                      <div className="p-4 bg-surface/50 border border-border/50 rounded">
                          <div className="flex justify-between items-center mb-1">
                             <span className="font-mono text-slate-300">W1: Digital Identity Leaks</span>
                             <span className="text-accent font-bold font-mono">45%</span>
                          </div>
                          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                             <div className="h-full bg-accent w-[45%]"></div>
                          </div>
                      </div>
                      <div className="p-4 bg-surface/50 border border-border/50 rounded">
                          <div className="flex justify-between items-center mb-1">
                             <span className="font-mono text-slate-300">W2: Infrastructure Exposure</span>
                             <span className="text-warning font-bold font-mono">30%</span>
                          </div>
                          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                             <div className="h-full bg-warning w-[30%]"></div>
                          </div>
                      </div>
                      <div className="p-4 bg-surface/50 border border-border/50 rounded">
                          <div className="flex justify-between items-center mb-1">
                             <span className="font-mono text-slate-300">W3: Telemetry Anomalies</span>
                             <span className="text-danger font-bold font-mono">25%</span>
                          </div>
                          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                             <div className="h-full bg-danger w-[25%] animate-pulse"></div>
                          </div>
                      </div>
                  </div>
               </div>
               
               <div className="glass-card bg-danger/10 border-danger/30 p-4">
                  <h4 className="flex items-center text-danger font-bold uppercase tracking-widest mb-2 text-sm">
                     <AlertTriangle className="w-4 h-4 mr-2"/> Automated Intervention Active
                  </h4>
                  <p className="text-xs text-danger/80">If R-Score exceeds 80 (0.80), the system automatically alerts ship owners and initiates network segmentation protocols via satellite API where supported.</p>
               </div>
           </div>

           <div className="glass-card flex flex-col p-0 overflow-hidden">
               <div className="p-6 border-b border-border/50 flex justify-between items-center bg-background/50">
                   <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase">Top Risk Assets</h3>
                   <TrendingUp className="w-4 h-4 text-danger"/>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-2">
                   {vessels.sort((a:any, b:any) => b.rScore - a.rScore).slice(0, 10).map((v:any, idx:number) => (
                       <div key={v.id} className="flex justify-between items-center p-3 hover:bg-surface/50 border border-transparent hover:border-border/50 rounded transition-colors group">
                           <div className="flex items-center">
                              <span className="w-6 h-6 rounded bg-surface border border-border flex items-center justify-center text-xs text-secondary font-mono mr-3">
                                 {idx + 1}
                              </span>
                              <div>
                                 <div className="font-mono font-bold text-slate-200 group-hover:text-accent transition-colors">{v.name}</div>
                                 <div className="text-[10px] text-secondary uppercase tracking-wider">{v.type} • {v.flag}</div>
                              </div>
                           </div>
                           <div className="flex flex-col items-end">
                               <div className={`font-mono text-lg font-bold ${v.rScore > 0.7 ? 'text-danger drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : v.rScore > 0.4 ? 'text-warning' : 'text-safe'}`}>
                                   {(v.rScore * 100).toFixed(0)}
                               </div>
                               <div className="flex space-x-1 mt-1">
                                   <div className={`w-2 h-2 rounded-full ${v.rScore > 0.3 ? 'bg-accent' : 'bg-surface'}`}></div>
                                   <div className={`w-2 h-2 rounded-full ${v.rScore > 0.6 ? 'bg-warning' : 'bg-surface'}`}></div>
                                   <div className={`w-2 h-2 rounded-full ${v.rScore > 0.8 ? 'bg-danger animate-pulse' : 'bg-surface'}`}></div>
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>

       </div>
    </div>
  );
}
