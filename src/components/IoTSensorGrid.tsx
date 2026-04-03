import { Plug, Fuel, Activity, Waves, Navigation, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getScenario, type DemoSensor } from '../data/demoScenarios';

const ICON_MAP: Record<string, any> = { fuel: Fuel, vibration: Activity, bilge: Waves, gps: Navigation };
const LABEL_MAP: Record<string, string> = { fuel: 'Fuel Level', vibration: 'Engine Vibration', bilge: 'Bilge Water', gps: 'GPS Offset' };

export default function IoTSensorGrid() {
  const { mode, activeScenario } = useAppContext();
  const scenario = getScenario(activeScenario);
  const sensors: DemoSensor[] = mode === 'demo' ? scenario.sensors : [];

  const alarming = sensors.filter(s => s.alarm);

  return (
    <div className="p-8 h-full flex flex-col w-full overflow-y-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-mono text-slate-100 uppercase tracking-widest font-bold flex items-center">
          <Plug className="w-6 h-6 mr-3 text-accent" /> IoT Fleet Sensor Grid
        </h2>
        <p className="text-secondary font-mono text-sm mt-1">Real-time fleet sensor monitoring — fuel, vibration, bilge, GPS integrity</p>
      </header>

      {/* Alarm Banner */}
      {alarming.length > 0 && (
        <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-lg flex items-center space-x-3 animate-pulse">
          <AlertTriangle className="w-6 h-6 text-danger shrink-0" />
          <div>
            <div className="text-sm font-bold text-danger">{alarming.length} ACTIVE SENSOR ALARM{alarming.length > 1 ? 'S' : ''}</div>
            <div className="text-xs text-danger/70 font-mono">
              {alarming.map(s => `${s.vesselName} — ${LABEL_MAP[s.sensorType]}: ${s.value}${s.unit} (threshold: ${s.threshold}${s.unit})`).join(' | ')}
            </div>
          </div>
        </div>
      )}

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.map((sensor, idx) => {
          const Icon = ICON_MAP[sensor.sensorType] || Activity;
          const pct = sensor.sensorType === 'gps'
            ? Math.min((sensor.value / 1000) * 100, 100)
            : (sensor.value / (sensor.threshold * 2)) * 100;
          const isAlarm = sensor.alarm;

          return (
            <div key={idx} className={`glass-card p-5 border-l-4 ${isAlarm ? 'border-l-danger' : 'border-l-accent/30'} transition-all ${isAlarm ? 'animate-pulse' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${isAlarm ? 'text-danger' : 'text-accent'}`} />
                  <span className="text-xs font-mono uppercase text-secondary tracking-wider">{LABEL_MAP[sensor.sensorType]}</span>
                </div>
                {isAlarm && <span className="text-[10px] font-mono font-bold text-danger uppercase px-2 py-0.5 rounded bg-danger/20 border border-danger/30">ALARM</span>}
              </div>
              <div className="flex items-end justify-between mb-2">
                <div className={`text-3xl font-mono font-bold ${isAlarm ? 'text-danger drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'text-slate-100'}`}>
                  {sensor.value.toLocaleString()}
                  <span className="text-sm text-secondary ml-1">{sensor.unit}</span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full transition-all ${isAlarm ? 'bg-danger' : pct > 60 ? 'bg-warning' : 'bg-accent'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-secondary">
                <span>Threshold: {sensor.threshold}{sensor.unit}</span>
                <span>{sensor.timestamp}</span>
              </div>
              <div className="text-xs font-mono text-slate-300 mt-2 pt-2 border-t border-border/30">{sensor.vesselName}</div>
            </div>
          );
        })}
      </div>

      {sensors.length === 0 && (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center mt-6">
          <Plug className="w-12 h-12 text-secondary/30 mb-4" />
          <h3 className="text-lg text-slate-300 font-mono mb-2">No IoT Sensors Active</h3>
          <p className="text-sm text-secondary max-w-md">Enable IoT MQTT bridge in Settings or switch to a Demo scenario to see fleet sensor data.</p>
        </div>
      )}
    </div>
  );
}
