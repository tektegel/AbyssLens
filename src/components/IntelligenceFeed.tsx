import { Database, Filter, Search, ChevronRight } from 'lucide-react';

export default function IntelligenceFeed({ intelligence }: any) {
  return (
    <div className="p-8 h-full flex flex-col w-full">
      <header className="mb-6 flex items-center justify-between shrink-0">
        <div>
           <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
               <Database className="w-6 h-6 mr-3 text-accent" /> 
               Intelligence Feed
           </h2>
           <p className="text-secondary font-mono text-sm mt-1">Live cyber-physical threat injects and OSINT monitoring</p>
        </div>
        <div className="flex space-x-3">
           <button className="glass-card px-4 py-2 flex items-center text-sm font-mono text-secondary hover:text-slate-200">
             <Filter className="w-4 h-4 mr-2"/> Filter
           </button>
           <div className="relative">
              <input type="text" placeholder="Search Intel..." className="glass-card pl-9 pr-4 py-2 text-sm font-mono text-slate-200 w-64 focus:border-accent outline-none"/>
              <Search className="w-4 h-4 text-secondary absolute left-3 top-3"/>
           </div>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
         {intelligence.map((item: any) => (
             <div key={item.id} className="glass-card p-6 border-l-4 hover:bg-surface/50 transition-colors group cursor-pointer" style={{ borderLeftColor: item.level === 'high' ? '#EF4444' : item.level === 'medium' ? '#F59E0B' : '#10B981' }}>
                 <div className="flex items-start justify-between">
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-100 px-2 py-0.5 rounded bg-background border border-border">
                                {item.source}
                            </span>
                            <span className="text-xs text-secondary font-mono">{item.time}</span>
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border 
                                ${item.type === 'leak' ? 'text-accent border-accent/30 bg-accent/10' : item.type === 'scan' ? 'text-warning border-warning/30 bg-warning/10' : 'text-danger border-danger/30 bg-danger/10'}`
                            }>
                                Type: {item.type}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-200 mb-1">{item.title}</h3>
                        <div className="flex items-center font-mono text-sm">
                            <span className="text-secondary mr-2">Target Asset:</span> 
                            <span className="text-slate-300 border-b border-dashed border-slate-500 hover:text-accent transition-colors">{item.vessel}</span>
                        </div>
                     </div>
                     <span className={`px-3 py-1 text-xs uppercase font-bold rounded flex items-center shadow-lg
                         ${item.level === 'high' ? 'bg-danger text-white shadow-danger/20' : item.level === 'medium' ? 'bg-warning text-white shadow-warning/20' : 'bg-safe text-white shadow-safe/20'}
                     `}>
                         Severity: {item.level}
                     </span>
                 </div>
                 
                 <div className="mt-4 p-4 bg-background/50 rounded border border-border/50 text-sm text-slate-400 font-mono">
                     {item.details}
                 </div>
                 
                 <div className="mt-4 flex justify-end">
                     <button className="text-xs font-mono font-bold text-accent hover:text-white flex items-center uppercase tracking-wider group-hover:underline">
                         View Source Evidence <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                     </button>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
}
