import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

// Create custom icons using standard leaflet with tactical colors
const createCustomIcon = (status: string) => {
  let color = '#10B981'; // safe
  if (status === 'suspicious') color = '#F59E0B'; // warning
  if (status === 'high-risk') color = '#EF4444'; // danger

  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative flex h-6 w-6 items-center justify-center -ml-3 -mt-3">
        ${(status !== 'safe') ? `<span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40" style="background-color: ${color}"></span>` : ''}
        <span class="relative inline-flex rounded-full h-3 w-3 border border-white/50" style="background-color: ${color}; box-shadow: 0 0 10px ${color}"></span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function TacticalMap({ vessels, onSelectVessel }: any) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0A0F1A]">
      <MapContainer 
        center={[20, 0]} 
        zoom={3} 
        style={{ height: '100%', width: '100%', background: '#0A0F1A' }}
        zoomControl={false}
        attributionControl={false}
        minZoom={2}
        worldCopyJump={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          opacity={0.5}
        />

        {vessels.map((v: any, i: number) => (
          <Marker 
            key={i} 
            position={[v.lat, v.lng]} 
            icon={createCustomIcon(v.status)}
            eventHandlers={{
              click: () => onSelectVessel(v),
            }}
          >
             {/* Optional tooltip on hover */}
          </Marker>
        ))}
      </MapContainer>

      {/* Crosshairs overly and sweep */}
      <div className="absolute inset-0 pointer-events-none z-[400] overflow-hidden">
         <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-accent/10"></div>
         <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-accent/10"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,15,26,0.8)_100%)]"></div>
      </div>
    </div>
  );
}
