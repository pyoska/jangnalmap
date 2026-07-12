'use client';

import { useEffect, useState } from 'react';
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

export default function Map({ markets, activeMarket, onSelectMarket }) {
  const [isMounted, setIsMounted] = useState(false);
  const [mapCenter, setMapCenter] = useState([36.5, 127.8]); // Default center of South Korea
  const [mapZoom, setMapZoom] = useState(7);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update map center when active market changes
  useEffect(() => {
    if (activeMarket && activeMarket.latitude && activeMarket.longitude) {
      setMapCenter([activeMarket.latitude, activeMarket.longitude]);
      setMapZoom(14);
    }
  }, [activeMarket]);

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

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        zoomControl={true}
        className="w-full h-full"
      >
        <ChangeView center={mapCenter} zoom={mapZoom} />
        {/* CartoDB Voyager Light tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={18}
        />
        {markets
          .filter((m) => m.latitude && m.longitude)
          .map((market) => {
            const todayOpen = isOpenToday(market.opening_cycle);

            return (
              <Marker
                key={market.id}
                position={[market.latitude, market.longitude]}
                icon={todayOpen ? createTodayIcon() : createNormalIcon()}
                eventHandlers={{
                  click: () => {
                    onSelectMarket(market);
                  },
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1 font-sans text-left">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="font-bold text-sm text-gray-900">{market.market_name}</span>
                      {todayOpen ? (
                        <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/20 text-[10px] px-1.5 py-0.5 rounded font-semibold animate-pulse">
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
