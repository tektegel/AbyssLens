import { Radio, Wifi, WifiOff, Activity, Zap, BarChart3, Terminal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';

const SAMPLE_NMEA = [
  '!AIVDM,1,1,,B,177KQJ5000G?tO`K>RA1wUbN0TKH,0*5C',
  '!AIVDM,1,1,,A,13u@Dt002s000000000000000000,0*40',
  '!AIVDM,1,1,,B,15MrVH0P01G?2>0N5C7QKB7l08Cc,0*5F',
  '!AIVDM,1,1,,A,13aEOj@P00Ogdr<5SK9CE?vN2D0S,0*38',
  '!AIVDM,2,1,3,B,55P5TL01VIaAL@7WKO@mBplU,0*3E',
  '!AIVDM,1,1,,A,15N0MH0P00G@t0pN4GMTD?v`0000,0*6B',
  '!AIVDM,1,1,,B,13HOI:0P00G<1A<N55P0000000,0*7B',
  '!AIVDM,1,1,,A,15NTES0P01G?nNHN60r068v@0<0B,0*2E',
];

export default function HardwareGateway() {
  const { hardware } = useAppContext();
  const [nmeaLog, setNmeaLog] = useState<{ ts: string; msg: string }[]>([]);
  const [msgCount, setMsgCount] = useState(0);

  // Simulate NMEA stream in demo
  useEffect(() => {
    const interval = setInterval(() => {
      const msg = SAMPLE_NMEA[Math.floor(Math.random() * SAMPLE_NMEA.length)];
      const ts = new Date().toLocaleTimeString();
      setNmeaLog(prev => [{ ts, msg }, ...prev.slice(0, 49)]);
      setMsgCount(c => c + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeDevices = hardware.filter(d => d.enabled);
  const signalStrength = 72 + Math.floor(Math.random() * 15);

  return (
    <div className="p-8 h-full flex flex-col w-full overflow-hidden">
      <header className="mb-6 shrink-0">
        <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
          <Radio className="w-6 h-6 mr-3 text-accent" /> RF / Hardware Gateway
        </h2>
        <p className="text-secondary font-mono text-sm mt-1">AIS receiver, SDR device monitoring, and NMEA sentence decoder</p>
      </header>

      {/* Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <div className="glass-card p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center"><Wifi className="w-5 h-5 text-accent" /></div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-100">{activeDevices.length}</div>
            <div className="text-[10px] text-secondary uppercase tracking-wider">Active Devices</div>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-safe/20 flex items-center justify-center"><Activity className="w-5 h-5 text-safe" /></div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-100">{msgCount}</div>
            <div className="text-[10px] text-secondary uppercase tracking-wider">Messages Decoded</div>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-warning/20 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-warning" /></div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-100">{signalStrength}%</div>
            <div className="text-[10px] text-secondary uppercase tracking-wider">Signal Quality</div>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center"><Zap className="w-5 h-5 text-accent" /></div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-100">2</div>
            <div className="text-[10px] text-secondary uppercase tracking-wider">AIS Channels</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Device List */}
        <div className="glass-card p-6 flex flex-col">
          <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase mb-4 border-b border-border/50 pb-2">Connected Devices</h3>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {hardware.map(device => (
              <div key={device.id} className={`p-3 rounded border ${device.enabled ? 'border-accent/30 bg-accent/5' : 'border-border/50 bg-surface/30'} transition-colors`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-slate-200">{device.name}</span>
                  {device.enabled ? <Wifi className="w-3 h-3 text-safe" /> : <WifiOff className="w-3 h-3 text-secondary" />}
                </div>
                <div className="text-[10px] text-secondary font-mono">
                  {Object.entries(device.config).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                </div>
                <div className="text-[10px] mt-1 font-mono">
                  {device.enabled ? <span className="text-safe">● Active</span> : <span className="text-secondary">○ Disabled</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Channel Monitor */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <h4 className="text-[10px] font-mono text-secondary uppercase mb-2">AIS Channel Monitor</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">CH-A 161.975 MHz</span>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`w-1.5 h-${3 + i} rounded-full ${i < 4 ? 'bg-safe' : 'bg-safe/30'}`} style={{ height: `${6 + i * 3}px` }} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">CH-B 162.025 MHz</span>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`w-1.5 rounded-full ${i < 3 ? 'bg-accent' : 'bg-accent/30'}`} style={{ height: `${6 + i * 3}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NMEA Live Feed */}
        <div className="glass-card lg:col-span-2 p-0 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-background/50 flex items-center justify-between shrink-0">
            <h3 className="text-sm font-mono tracking-widest text-slate-300 uppercase flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-accent" /> NMEA Sentence Feed
            </h3>
            <span className="text-[10px] font-mono text-safe animate-pulse">● LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-[#050810] font-mono text-xs space-y-0.5">
            {nmeaLog.map((entry, i) => (
              <div key={i} className={`flex ${i === 0 ? 'text-accent' : 'text-slate-500'} transition-colors`}>
                <span className="text-secondary/50 mr-3 shrink-0">[{entry.ts}]</span>
                <span className="break-all">{entry.msg}</span>
              </div>
            ))}
            {nmeaLog.length === 0 && (
              <div className="text-secondary text-center py-12">Waiting for NMEA data...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
