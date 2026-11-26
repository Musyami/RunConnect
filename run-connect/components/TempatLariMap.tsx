"use client";

// components/TempatLariMap.tsx
// Komponen Peta Leaflet + Esri World Street Map dunia nyata sesuai PRD dan AGENTS.md.
// Menggunakan react-leaflet, pin bulat berwarna tepi putih (hijau sepi, biru sedang, oranye ramai),
// animasi terbang (flyTo) zoom 15 saat pin atau item sidebar diklik.

import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TempatLariData } from "@/data";

interface TempatLariMapProps {
  places: TempatLariData[];
  selectedPlace: TempatLariData | null;
  onSelectPlace: (place: TempatLariData) => void;
  onSuggestChange: (place: TempatLariData) => void;
}

// Warna pin keramaian
const PIN_COLORS: Record<string, string> = {
  sepi: "#1FA85A",
  sedang: "#1D63D8",
  ramai: "#E85D04",
};

// Fungsi membuat DivIcon kustom bulat tepi putih
function createMarkerIcon(keramaian: string, isSelected: boolean) {
  const color = PIN_COLORS[keramaian] || "#1D63D8";
  const size = isSelected ? 28 : 22;
  const borderWidth = isSelected ? 3.5 : 3;

  return L.divIcon({
    className: "custom-leaflet-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      border: ${borderWidth}px solid #ffffff;
      box-shadow: 0 3px 8px rgba(0,0,0,0.35);
      cursor: pointer;
      transition: transform 0.2s;
    "></div>`,
  });
}

// Komponen helper untuk menganimasikan peta saat lokasi terpilih berubah
function MapController({
  selectedPlace,
}: {
  selectedPlace: TempatLariData | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.lat, selectedPlace.lng], 15, {
        duration: 1.2,
      });
    }
  }, [selectedPlace, map]);

  return null;
}

export default function TempatLariMap({
  places,
  selectedPlace,
  onSelectPlace,
  onSuggestChange,
}: TempatLariMapProps) {
  // Pusat peta Surabaya sesuai PRD: -7.2756, 112.7378
  const defaultCenter: [number, number] = [-7.2756, 112.7378];

  // Batas wilayah Surabaya agar navigasi tetap terfokus
  const surabayaBounds = useMemo(() => {
    return L.latLngBounds(
      L.latLng(-7.45, 112.55), // Barat Daya
      L.latLng(-7.15, 112.95)  // Timur Laut
    );
  }, []);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      minZoom={11}
      maxZoom={18}
      maxBounds={surabayaBounds}
      maxBoundsViscosity={0.8}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%", minHeight: "360px", zIndex: 1 }}
    >
      {/* Tile Esri World Street Map dunia nyata sesuai PRD */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, METI, TomTom'
      />

      <MapController selectedPlace={selectedPlace} />

      {/* Marker Pin untuk setiap Tempat Lari */}
      {places.map((place) => {
        const isSelected = selectedPlace?.id === place.id;
        const icon = createMarkerIcon(place.keramaian, isSelected);

        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onSelectPlace(place),
            }}
          >
            {/* Popup Peta Sesuai PRD & Prototipe */}
            <Popup>
              <div style={{ minWidth: "180px", color: "var(--tx)" }}>
                <h3 style={{ fontSize: "16px", margin: "0 0 2px" }}>
                  {place.nama}
                </h3>
                <small style={{ color: "var(--tx2)", display: "block" }}>
                  {place.alamat}
                </small>
                <div style={{ fontSize: "13px", margin: "4px 0" }}>
                  <b>Jam:</b> {place.jam_buka}–{place.jam_tutup}
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    className="btn sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={place.link_maps}
                    style={{ fontSize: "12px", padding: "4px 10px", minHeight: "32px" }}
                  >
                    Petunjuk Arah
                  </a>
                  <button
                    type="button"
                    className="btn sm out"
                    onClick={() => onSuggestChange(place)}
                    style={{ fontSize: "12px", padding: "4px 10px", minHeight: "32px" }}
                  >
                    Sarankan Perubahan
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
