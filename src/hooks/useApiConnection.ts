import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppContext, type ApiKeys } from '../context/AppContext';
import * as api from '../services/apiService';

type ServiceName = keyof ApiKeys;

export function useApiConnection(service: ServiceName) {
  const { apiKeys, apiStatus, setApiStatus } = useAppContext();
  const key = apiKeys[service];
  const status = apiStatus[service];

  const testConnection = useCallback(async () => {
    if (!key) {
      setApiStatus(service, { connected: false, error: 'No API key configured', loading: false });
      return false;
    }

    setApiStatus(service, { loading: true, error: null });

    try {
      let success = false;
      switch (service) {
        case 'newsdata':
          success = await api.testNewsDataConnection(key);
          break;
        case 'otx':
          success = await api.testOTXConnection(key);
          break;
        case 'abuseipdb':
          success = await api.testAbuseIPDBConnection(key);
          break;
        case 'pulsedive':
          success = await api.testPulseDiveConnection(key);
          break;
        case 'aisstream':
          // AISStream is WebSocket — test is handled by connect
          success = true;
          break;
      }

      setApiStatus(service, {
        connected: success,
        loading: false,
        error: success ? null : 'Connection test failed',
        lastSync: success ? new Date().toISOString() : null,
      });
      return success;
    } catch (err: any) {
      setApiStatus(service, {
        connected: false,
        loading: false,
        error: err.message || 'Unknown error',
      });
      return false;
    }
  }, [key, service, setApiStatus]);

  return { key, status, testConnection };
}

// --- AIS Stream Hook ---

export interface LiveVessel {
  mmsi: number;
  name: string;
  lat: number;
  lng: number;
  cog: number;
  sog: number;
  heading: number;
  status: number;
  timestamp: string;
  type?: number;
  destination?: string;
  callSign?: string;
  imo?: number;
}

export function useAISStream() {
  const { apiKeys, setApiStatus, mode } = useAppContext();
  const [vessels, setVessels] = useState<Map<number, LiveVessel>>(new Map());
  const disconnectRef = useRef<(() => void) | null>(null);

  const connect = useCallback((boundingBoxes: number[][][] = [[[-90, -180], [90, 180]]]) => {
    if (!apiKeys.aisstream) return;
    
    // Disconnect existing
    disconnectRef.current?.();

    const disconnect = api.connectAISStream(
      apiKeys.aisstream,
      boundingBoxes,
      (msg) => {
        if (msg.MetaData) {
          setVessels(prev => {
            const next = new Map(prev);
            const existing = next.get(msg.MetaData.MMSI) || {} as LiveVessel;
            
            next.set(msg.MetaData.MMSI, {
              ...existing,
              mmsi: msg.MetaData.MMSI,
              name: msg.MetaData.ShipName || existing.name || 'UNKNOWN',
              lat: msg.MetaData.latitude,
              lng: msg.MetaData.longitude,
              timestamp: msg.MetaData.time_utc,
              ...(msg.Message?.PositionReport ? {
                cog: msg.Message.PositionReport.Cog,
                sog: msg.Message.PositionReport.Sog,
                heading: msg.Message.PositionReport.TrueHeading,
                status: msg.Message.PositionReport.NavigationalStatus,
              } : {}),
              ...(msg.Message?.ShipStaticData ? {
                type: msg.Message.ShipStaticData.Type,
                destination: msg.Message.ShipStaticData.Destination,
                callSign: msg.Message.ShipStaticData.CallSign,
                imo: msg.Message.ShipStaticData.ImoNumber,
              } : {}),
            });

            // Cap at 500 vessels for performance
            if (next.size > 500) {
              const keys = Array.from(next.keys());
              for (let i = 0; i < keys.length - 500; i++) {
                next.delete(keys[i]);
              }
            }

            return next;
          });
        }
      },
      (status) => {
        setApiStatus('aisstream', { 
          connected: status.connected, 
          error: status.error, 
          loading: false,
          lastSync: status.connected ? new Date().toISOString() : null 
        });
      }
    );

    disconnectRef.current = disconnect;
  }, [apiKeys.aisstream, setApiStatus]);

  const disconnect = useCallback(() => {
    disconnectRef.current?.();
    disconnectRef.current = null;
  }, []);

  // Auto-disconnect when switching to demo mode
  useEffect(() => {
    if (mode === 'demo') {
      disconnect();
    }
  }, [mode, disconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { disconnectRef.current?.(); };
  }, []);

  return { 
    vessels: Array.from(vessels.values()), 
    vesselMap: vessels,
    connect, 
    disconnect,
    vesselCount: vessels.size 
  };
}
