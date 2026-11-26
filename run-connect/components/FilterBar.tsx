"use client";

// components/FilterBar.tsx
// Bar filter dan chips untuk daftar event / direktori sesuai prototipe
// Sesuai reference/Run_Connect.html baris 225-226

import React from "react";

// Opsi filter standar sesuai AGENTS.md dan PRD
export const AREA_OPTIONS = [
  "Semua lokasi",
  "Surabaya Pusat",
  "Surabaya Barat",
  "Surabaya Timur",
  "Surabaya Utara",
  "Surabaya Selatan",
  "Kampus ITS",
];

export const DISTANCE_OPTIONS = [
  "Semua jarak",
  "5K",
  "10K",
  "21K",
  "42K",
];

export const EVENT_CATEGORIES = [
  "Semua",
  "Fun Run",
  "Marathon",
  "Half Marathon",
  "Trail Run",
  "Ultra Marathon",
];

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function Chip({ label, active = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      className={`chip ${active ? "on" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

interface ChipsProps {
  items: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
}

export function Chips({ items, selectedItem, onSelect }: ChipsProps) {
  return (
    <div className="chips">
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          active={selectedItem === item}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}

interface FilterBarProps {
  // Filter kategori chip di atas
  categories?: string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;

  // Filter bar di bawah
  isFree?: boolean;
  onToggleFree?: (free: boolean) => void;

  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;

  locations?: string[];
  selectedLocation?: string;
  onSelectLocation?: (loc: string) => void;

  distances?: string[];
  selectedDistance?: string;
  onSelectDistance?: (dist: string) => void;
}

export default function FilterBar({
  categories = EVENT_CATEGORIES,
  selectedCategory = "Semua",
  onSelectCategory,

  isFree = false,
  onToggleFree,

  isOpen = false,
  onToggleOpen,

  locations = AREA_OPTIONS,
  selectedLocation = "Semua lokasi",
  onSelectLocation,

  distances = DISTANCE_OPTIONS,
  selectedDistance = "Semua jarak",
  onSelectDistance,
}: FilterBarProps) {
  return (
    <div>
      {/* Baris Chip Kategori (bisa digeser di layar kecil) */}
      {onSelectCategory && (
        <Chips
          items={categories}
          selectedItem={selectedCategory}
          onSelect={onSelectCategory}
        />
      )}

      {/* Baris Filter Checkbox & Select */}
      <div className="bar">
        {/* Checkbox Gratis */}
        {onToggleFree && (
          <label className="tgl">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => onToggleFree(e.target.checked)}
            />
            Gratis
          </label>
        )}

        {/* Checkbox Pendaftaran Dibuka */}
        {onToggleOpen && (
          <label className="tgl">
            <input
              type="checkbox"
              checked={isOpen}
              onChange={(e) => onToggleOpen(e.target.checked)}
            />
            Pendaftaran dibuka
          </label>
        )}

        {/* Select Lokasi / Area */}
        {onSelectLocation && (
          <select
            value={selectedLocation}
            onChange={(e) => onSelectLocation(e.target.value)}
            aria-label="Pilih lokasi"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        )}

        {/* Select Jarak */}
        {onSelectDistance && (
          <select
            value={selectedDistance}
            onChange={(e) => onSelectDistance(e.target.value)}
            aria-label="Pilih jarak"
          >
            {distances.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
