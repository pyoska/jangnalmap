'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { isOpenToday } from '@/utils/dateUtils';

// Helper component to programmatically pan/zoom Leaflet map
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// State tracker component to listen to map movements/zooming
function MapStateTracker({ onZoomChange, onBoundsChange }) {
  const map = useMap();

  useEffect(() => {
    // Collect initial view state
    onZoomChange(map.getZoom());
    onBoundsChange(map.getBounds());

    const handleMapChange = () => {
      onZoomChange(map.getZoom());
      onBoundsChange(map.getBounds());
    };

    map.on('zoomend', handleMapChange);
    map.on('moveend', handleMapChange);

    return () => {
      map.off('zoomend', handleMapChange);
      map.off('moveend', handleMapChange);
    };
  }, [map, onZoomChange, onBoundsChange]);

  return null;
}

export default function Map({ markets, activeMarket, onSelectMarket }) {
  const [isMounted, setIsMounted] = useState(false);
  const [mapCenter, setMapCenter] = useState([36.5, 127.8]); // Default center of South Korea
  const [mapZoom, setMapZoom] = useState(7);

  // Dynamic zoom & bounds tracking state
  const [currentZoom, setCurrentZoom] = useState(7);
  const [mapBounds, setMapBounds] = useState(null);
  const [markersLoaded, setMarkersLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setMarkersLoaded(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  // Update map center when active market changes
  useEffect(() => {
    if (activeMarket && activeMarket.latitude && activeMarket.longitude) {
      setMapCenter([activeMarket.latitude, activeMarket.longitude]);
      setMapZoom(14);
      setCurrentZoom(14);
    }
  }, [activeMarket]);

  const handleZoomChange = useCallback((zoom) => {
    setCurrentZoom(zoom);
  }, []);

  const handleBoundsChange = useCallback((bounds) => {
    setMapBounds(bounds);
  }, []);

  // Compute province clusters for zoomed-out view (zoom < 9)
  const provinceClusters = useMemo(() => {
    const provinces = {};
    markets.forEach((m) => {
      if (!m.latitude || !m.longitude) return;
      const prov = m.address.split(' ')[0] || '기타';
      if (!provinces[prov]) {
        provinces[prov] = {
          name: prov,
          latSum: 0,
          lngSum: 0,
          count: 0,
          todayCount: 0
        };
      }
      provinces[prov].latSum += Number(m.latitude);
      provinces[prov].lngSum += Number(m.longitude);
      provinces[prov].count += 1;
      if (isOpenToday(m.opening_cycle)) {
        provinces[prov].todayCount += 1;
      }
    });

    return Object.values(provinces).map((p) => ({
      name: p.name,
      lat: p.latSum / p.count,
      lng: p.lngSum / p.count,
      count: p.count,
      todayCount: p.todayCount
    }));
  }, [markets]);

  // Filter visible markets when zoomed-in (zoom >= 9) to eliminate DOM overhead
  const visibleMarkets = useMemo(() => {
    return markets.filter((m) => {
      if (!m.latitude || !m.longitude) return false;
      if (!mapBounds) return true;
      return mapBounds.contains([m.latitude, m.longitude]);
    });
  }, [markets, mapBounds]);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-[#F3F4F6] flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">지도를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  // Create custom markers (Emerald Green for regular, Vivid Orange for today)
  const createNormalIcon = () => {
    if (typeof window === 'undefined') return null;
    return L.divIcon({
      html: `<div class="w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>`,
      className: 'custom-pin-normal',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -7]
    });
  };

  const createTodayIcon = () => {
    if (typeof window === 'undefined') return null;
    return L.divIcon({
      html: `
        <div class="relative flex items-center justify-center w-6 h-6">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75"></span>
          <div class="relative w-4 h-4 bg-[#FF5A1F] border-2 border-white rounded-full shadow-[0_0_10px_rgba(255,90,31,0.6)]"></div>
        </div>
      `,
      className: 'custom-pin-today',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  // Create cluster icon displaying province name and total count
  const createClusterIcon = (name, count, todayCount) => {
    if (typeof window === 'undefined') return null;
    const isTodayActive = todayCount > 0;
    return L.divIcon({
      html: `
        <div class="relative flex items-center justify-center w-11 h-11 rounded-full border-2 border-white text-white font-extrabold text-[11px] shadow-lg transition-transform duration-200 hover:scale-110 ${
          isTodayActive 
            ? 'bg-[#FF5A1F] shadow-[0_0_12px_rgba(255,90,31,0.5)] animate-pulse' 
            : 'bg-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.4)]'
        }">
          <div class="flex flex-col items-center justify-center leading-none">
            <span class="text-[8px] font-bold tracking-tight opacity-90">${name}</span>
            <span class="text-xs mt-0.5 font-black">${count}</span>
          </div>
        </div>
      `,
      className: 'custom-cluster-icon',
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });
  };

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        zoomControl={true}
        className="w-full h-full"
      >
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <MapStateTracker onZoomChange={handleZoomChange} onBoundsChange={handleBoundsChange} />
        
        {/* CartoDB Voyager Light tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={18}
        />

        {/* Zoom Level < 9: Render Province Clusters for best performance */}
        {markersLoaded && currentZoom < 9 &&
          provinceClusters.map((cluster) => (
            <Marker
              key={cluster.name}
              position={[cluster.lat, cluster.lng]}
              icon={createClusterIcon(cluster.name, cluster.count, cluster.todayCount)}
              eventHandlers={{
                click: () => {
                  setMapCenter([cluster.lat, cluster.lng]);
                  setMapZoom(10);
                  setCurrentZoom(10);
                }
              }}
            />
          ))}

        {/* Zoom Level >= 9: Render individual markers filtered by map bounding box */}
        {markersLoaded && currentZoom >= 9 &&
          visibleMarkets.map((market) => {
            const todayOpen = isOpenToday(market.opening_cycle);

            return (
              <Marker
                key={market.id}
                position={[market.latitude, market.longitude]}
                icon={todayOpen ? createTodayIcon() : createNormalIcon()}
                eventHandlers={{
                  click: () => {
                    onSelectMarket(market);
                  }
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1 font-sans text-left">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="font-bold text-sm text-gray-900">{market.market_name}</span>
                      {todayOpen ? (
                        <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/20 text-[10px] px-1.5 py-0.5 rounded font-semibold">
                          오늘 개장
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] px-1.5 py-0.5 rounded font-medium">
                          {market.opening_cycle}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{market.address}</p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-2">
                      {market.parking_yn === 'Y' && (
                        <span className="text-[10px] text-[#10B981] font-semibold flex items-center gap-0.5">
                          🚗 주차장 있음
                        </span>
                      )}
                      <Link
                        href={`/market/${market.id}`}
                        className="text-[10px] font-semibold text-[#FF5A1F] hover:underline"
                      >
                        상세 정보 보기 &rarr;
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
