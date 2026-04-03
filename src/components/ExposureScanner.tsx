import { Target, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getScenario, type DemoExposure } from '../data/demoScenarios';

export default function ExposureScanner() {
  const { mode, activeScenario } = useAppContext();
  const scenario = getScenario(activeScenario);
  const exposures: DemoExposure[] = mode === 'demo' ? scenario.exposures : [];

  const severityColor = (s: string) => {
    switch (s) { case 'critical': return 'text-danger'; case 'high': return 'text-warning'; case 'medium': return 'text-accent'; default: return 'text-safe'; }
  };

  return (
    <div className="p-8 h-full flex flex-col w-full">
       <header className="mb-6">
           <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
               <Target className="w-6 h-6 mr-3 text-accent" /> 
               Exposure Scanner
           </h2>
           <p className="text-secondary font-mono text-sm mt-1">Continuous active/passive scanning of fleet IT/OT infrastructure</p>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
           {/* Scan Setup Panel */}
           <div className="glass-card flex flex-col p-6 h-full border-r-0 rounded-r-none">
              <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-6 border-b border-border/50 pb-2">New Global Scan Task</h3>
              
              <div className="space-y-5">
                  <div>
                      <label className="block text-xs font-mono text-secondary uppercase mb-2">Target Scope</label>
                      <select className="w-full bg-surface border border-border text-slate-200 text-sm p-2 rounded outline-none font-mono focus:border-accent transition-colors">
                          <option>Entire Monitored Fleet</option>
                          <option>High Risk Vessels Only</option>
                          <option>Specific Operator</option>
                      </select>
                  </div>
                  <div>
                      <label className="block text-xs font-mono text-secondary uppercase mb-2">Scan Vectors</label>
                      <div className="flex flex-col space-y-2">
                         <label className="flex items-center text-sm text-slate-300 font-mono"><input type="checkbox" defaultChecked className="mr-2 accent-accent"/> PulseDive Integration</label>
                         <label className="flex items-center text-sm text-slate-300 font-mono"><input type="checkbox" defaultChecked className="mr-2 accent-accent"/> AbuseIPDB Lookup</label>
                         <label className="flex items-center text-sm text-slate-300 font-mono"><input type="checkbox" defaultChecked className="mr-2 accent-accent"/> OTX Threat Correlation</label>
                         <label className="flex items-center text-sm text-slate-300 font-mono"><input type="checkbox" defaultChecked className="mr-2 accent-accent"/> Common Maritime Ports (80, 443, 8080, 102)</label>
                         <label className="flex items-center text-sm text-slate-300 font-mono"><input type="checkbox" className="mr-2 accent-accent"/> Deep Web Leak Cross-Reference</label>
                      </div>
                  </div>
              </div>
              
              <div className="mt-auto pt-6">
                  <button className="w-full bg-accent text-[#0A0F1A] font-bold font-mono tracking-widest uppercase py-3 rounded hover:bg-white transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                     Initialize Scan Sequence
                  </button>
              </div>
           </div>
           
           {/* Latest Scans Results */}
           <div className="glass-card lg:col-span-2 p-0 flex flex-col h-full rounded-l-none border-l-0 overflow-hidden">
               <div className="p-6 border-b border-border/50 bg-background/50 flex justify-between items-center shrink-0">
                  <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase">Recent Scan Results</h3>
                  <div className="relative">
                     <Search className="w-4 h-4 text-secondary absolute left-3 top-2.5"/>
                     <input type="text" placeholder="Search IP, Port, Banner..." className="bg-surface border border-border/50 pl-9 pr-3 py-1.5 text-xs rounded outline-none font-mono text-slate-200 w-64 focus:border-accent"/>
                  </div>
               </div>
               
               <div className="flex-1 overflow-y-auto p-2">
                  <table className="w-full text-left font-mono text-xs text-slate-300">
                     <thead className="text-secondary uppercase border-b border-border/50 sticky top-0 bg-panel/80 backdrop-blur-md">
                        <tr>
                            <th className="p-3">Severity</th>
                            <th className="p-3">Asset IP</th>
                            <th className="p-3">Port/Service</th>
                            <th className="p-3">Identified System</th>
                            <th className="p-3">Vessel Association</th>
                            <th className="p-3 text-right">Confidence</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border/30">
                        {exposures.map((exp, i) => (
                          <tr key={i} className="hover:bg-surface/50 transition-colors cursor-pointer">
                            <td className="p-3">
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                                exp.severity === 'critical' ? 'text-danger border-danger/30 bg-danger/10' :
                                exp.severity === 'high' ? 'text-warning border-warning/30 bg-warning/10' :
                                exp.severity === 'medium' ? 'text-accent border-accent/30 bg-accent/10' :
                                'text-safe border-safe/30 bg-safe/10'
                              }`}>{exp.severity}</span>
                            </td>
                            <td className={`p-3 ${severityColor(exp.severity)}`}>{exp.ip}</td>
                            <td className="p-3">{exp.port} / {exp.service}</td>
                            <td className="p-3 font-bold text-slate-100">{exp.system}</td>
                            <td className="p-3">{exp.vessel}</td>
                            <td className="p-3 text-right">{exp.confidence}%</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
           </div>
       </div>
    </div>
  );
}
