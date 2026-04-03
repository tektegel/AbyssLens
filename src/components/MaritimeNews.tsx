import { Newspaper, Globe2, ExternalLink, AlertTriangle, TrendingDown, Minus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getScenario, type DemoNews } from '../data/demoScenarios';

export default function MaritimeNews() {
  const { mode, activeScenario } = useAppContext();
  const scenario = getScenario(activeScenario);
  const news: DemoNews[] = mode === 'demo' ? scenario.news : [];

  return (
    <div className="p-8 h-full flex flex-col w-full overflow-y-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
          <Newspaper className="w-6 h-6 mr-3 text-accent" /> Maritime News Intelligence
        </h2>
        <p className="text-secondary font-mono text-sm mt-1">
          {mode === 'live' ? 'Live maritime security news via NewsData.io' : `Demo Scenario: ${scenario.codename}`}
        </p>
      </header>

      {mode === 'live' && news.length === 0 && (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <Globe2 className="w-12 h-12 text-secondary/30 mb-4" />
          <h3 className="text-lg text-slate-300 font-mono mb-2">Configure NewsData.io API</h3>
          <p className="text-sm text-secondary max-w-md">Add your NewsData.io API key in Settings to receive live maritime security news feeds.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {news.map(item => (
          <div key={item.id} className="glass-card p-6 group hover:border-accent/50 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${item.sentiment === 'negative' ? 'bg-danger' : item.sentiment === 'positive' ? 'bg-safe' : 'bg-warning'}`} />
                <span className="text-[10px] font-mono uppercase text-secondary">{item.source}</span>
                <span className="text-[10px] text-secondary">•</span>
                <span className="text-[10px] font-mono text-secondary">{item.date}</span>
              </div>
              <div className={`flex items-center text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                item.sentiment === 'negative' ? 'text-danger border-danger/30 bg-danger/10' : 
                item.sentiment === 'positive' ? 'text-safe border-safe/30 bg-safe/10' : 
                'text-warning border-warning/30 bg-warning/10'
              }`}>
                {item.sentiment === 'negative' ? <TrendingDown className="w-3 h-3 mr-1" /> : 
                 item.sentiment === 'positive' ? <AlertTriangle className="w-3 h-3 mr-1" /> : 
                 <Minus className="w-3 h-3 mr-1" />}
                {item.sentiment}
              </div>
            </div>
            <h3 className="text-base font-bold text-slate-200 mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">{item.summary}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.relatedVessels.map(v => (
                  <span key={v} className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{v}</span>
                ))}
                {item.relatedVessels.length === 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-secondary border border-border">{item.region}</span>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-secondary group-hover:text-accent transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
