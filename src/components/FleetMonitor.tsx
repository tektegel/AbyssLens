import { Ship, Filter, Search } from 'lucide-react';

export default function FleetMonitor({ vessels, onSelectVessel }: any) {
  return (
    <div className="p-8 h-full flex flex-col w-full">
      <header className="mb-6 flex items-center justify-between shrink-0">
        <div>
           <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
               <Ship className="w-6 h-6 mr-3 text-accent" /> 
               Fleet Monitor
           </h2>
           <p className="text-secondary font-mono text-sm mt-1">Real-time status of monitored assets</p>
        </div>
        <div className="flex space-x-3">
           <button className="glass-card px-4 py-2 flex items-center text-sm font-mono text-secondary hover:text-slate-200">
             <Filter className="w-4 h-4 mr-2"/> Filter
           </button>
           <div className="relative">
              <input type="text" placeholder="Search Fleet..." className="glass-card pl-9 pr-4 py-2 text-sm font-mono text-slate-200 w-64 focus:border-accent outline-none"/>
              <Search className="w-4 h-4 text-secondary absolute left-3 top-3"/>
           </div>
        </div>
      </header>

      <div className="glass-card flex-1 overflow-hidden flex flex-col p-0 border-border/40">
        <div className="grid grid-cols-8 gap-4 p-4 border-b border-border/50 text-xs font-mono font-bold text-secondary uppercase bg-surface/30 px-6 shrink-0">
           <div className="col-span-2">Vessel Name</div>
           <div className="col-span-1">IMO</div>
           <div className="col-span-1">Type</div>
           <div className="col-span-1 border-l border-border/50 pl-4">Speed</div>
           <div className="col-span-1">Destination</div>
           <div className="col-span-1">Risk (R)</div>
           <div className="col-span-1 text-right">Status</div>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1">
           {vessels.sort((a:any,b:any) => b.rScore - a.rScore).map((v: any) => (
             <div 
               key={v.id} 
               onClick={() => onSelectVessel(v)}
               className="grid grid-cols-8 gap-4 px-4 py-3 text-sm font-mono hover:bg-surface/50 border border-transparent hover:border-border/50 rounded cursor-pointer transition-colors group"
             >
               <div className="col-span-2 text-slate-200 font-bold group-hover:text-accent transition-colors">{v.name}</div>
               <div className="col-span-1 text-slate-400">{v.id}</div>
               <div className="col-span-1 text-slate-400 truncate">{v.type}</div>
               <div className="col-span-1 border-l border-border/50 pl-4 text-slate-300">{v.speed.toFixed(1)} kn</div>
               <div className="col-span-1 text-slate-400 truncate">{v.dest}</div>
               <div className={`col-span-1 font-bold ${v.rScore > 0.7 ? 'text-danger' : v.rScore > 0.4 ? 'text-warning' : 'text-safe'}`}>
                 {(v.rScore * 100).toFixed(0)}
               </div>
               <div className="col-span-1 text-right flex justify-end">
                   <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded border ${v.status === 'high-risk' ? 'bg-danger/20 border-danger/50 text-danger' : v.status === 'suspicious' ? 'bg-warning/20 border-warning/50 text-warning' : 'bg-safe/20 border-safe/50 text-safe'}`}>
                     {v.status}
                   </span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
