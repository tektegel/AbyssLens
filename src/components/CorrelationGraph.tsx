import { Network } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getScenario } from '../data/demoScenarios';

const NODE_COLORS: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
  vessel: { bg: 'bg-accent/20', border: 'border-accent', text: 'text-accent', shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.5)]' },
  ip: { bg: 'bg-danger/20', border: 'border-danger', text: 'text-danger', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]' },
  credential: { bg: 'bg-warning/20', border: 'border-warning', text: 'text-warning', shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]' },
  ioc: { bg: 'bg-danger/20', border: 'border-danger', text: 'text-danger', shadow: 'shadow-[0_0_12px_rgba(239,68,68,0.4)]' },
  news: { bg: 'bg-slate-500/20', border: 'border-slate-400', text: 'text-slate-300', shadow: '' },
  sensor: { bg: 'bg-safe/20', border: 'border-safe', text: 'text-safe', shadow: 'shadow-[0_0_12px_rgba(34,197,94,0.4)]' },
  threat: { bg: 'bg-warning/20', border: 'border-warning', text: 'text-warning', shadow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]' },
};

export default function CorrelationGraphMockup() {
  const { activeScenario } = useAppContext();
  const scenario = getScenario(activeScenario);
  const { correlationNodes: nodes, correlationEdges: edges } = scenario;

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden">
      <header className="mb-4 shrink-0">
        <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
          <Network className="w-6 h-6 mr-3 text-accent" /> Correlation Graph
        </h2>
        <p className="text-secondary font-mono text-sm mt-1">{scenario.codename} — Cross-domain entity relationship visualization</p>
      </header>

      <div className="flex-1 glass-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-0 pointer-events-none" />
        
        {/* SVG Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const color = edge.type === 'compromised' ? '#EF4444' : edge.type === 'detected' ? '#22C55E' : edge.type === 'reported' ? '#94A3B8' : '#F59E0B';
            return (
              <g key={i}>
                <line x1={`${fromNode.x}%`} y1={`${fromNode.y}%`} x2={`${toNode.x}%`} y2={`${toNode.y}%`} stroke={color} strokeWidth="1.5" strokeDasharray="6" className="animate-pulse opacity-60" />
                <text x={`${(fromNode.x + toNode.x) / 2}%`} y={`${(fromNode.y + toNode.y) / 2 - 1}%`} fill={color} fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.7">{edge.label}</text>
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const colors = NODE_COLORS[node.type] || NODE_COLORS.threat;
          const size = node.type === 'vessel' ? 'w-20 h-20 rounded-full' : 'w-16 h-16 rounded-lg';
          return (
            <div key={node.id} className={`absolute z-20 ${size} ${colors.bg} border-2 ${colors.border} ${colors.shadow} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
              style={{ left: `calc(${node.x}% - 2.5rem)`, top: `calc(${node.y}% - 2.5rem)` }}>
              <span className={`text-[8px] font-mono ${colors.text} font-bold uppercase text-center leading-tight px-1`}>{node.label}</span>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-3">
          {Object.entries(NODE_COLORS).map(([type, c]) => (
            <div key={type} className="flex items-center space-x-1.5">
              <div className={`w-3 h-3 rounded-sm border ${c.border} ${c.bg}`} />
              <span className="text-[9px] font-mono text-secondary uppercase">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
