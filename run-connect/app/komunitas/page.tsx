"use client";

// app/komunitas/page.tsx
// Halaman Direktori Komunitas Lari sesuai prototipe reference/Run_Connect.html baris 304 dan PRD.
// Menyajikan banner carousel, pencarian nama komunitas, satu filter Area, dan grid kartu komunitas.

import React, { useState, useMemo } from "react";
import BannerCarousel from "@/components/BannerCarousel";
import KomunitasCard from "@/components/KomunitasCard";
import { EmptyState } from "@/components/StateDisplay";
import { sampleKomunitas, sampleBanners } from "@/data";

const AREA_OPTIONS = [
  "Semua area",
  "Surabaya Barat",
  "Surabaya Timur",
  "Surabaya Pusat",
  "Surabaya Selatan",
  "Surabaya Utara",
];

export default function KomunitasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("Semua area");

  // Filter komunitas berdasarkan nama dan area
  const filteredKomunitas = useMemo(() => {
    return sampleKomunitas.filter((k) => {
      // Filter Area
      if (selectedArea !== "Semua area" && k.area !== selectedArea) {
        return false;
      }
      // Filter Pencarian Nama
      if (
        searchQuery.trim() !== "" &&
        !k.nama.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedArea]);

  return (
    <main>
      {/* Banner Carousel Komunitas */}
      <BannerCarousel slides={sampleBanners.komunitas} />

      <div className="w">
        <section className="s">
          <h2 style={{ marginBottom: "12px" }}>Komunitas Lari</h2>

          {/* Bar Pencarian Nama & Satu Filter Area */}
          <div className="bar">
            <input
              type="text"
              className="in"
              placeholder="Cari nama komunitas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari nama komunitas"
              style={{ flex: "1", minWidth: "200px" }}
            />
            <select
              className="in"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              aria-label="Pilih area"
            >
              {AREA_OPTIONS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Grid Kartu Komunitas */}
          {filteredKomunitas.length > 0 ? (
            <div className="grid">
              {filteredKomunitas.map((kom, i) => (
                <KomunitasCard
                  key={kom.id}
                  colorIndex={i}
                  komunitas={{
                    id: kom.id,
                    slug: kom.slug,
                    name: kom.nama,
                    area: kom.area,
                    kecamatan: kom.kecamatan,
                    memberCount: kom.jumlah_anggota,
                    membershipType: kom.keanggotaan,
                    description: kom.deskripsi,
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Tidak ada komunitas yang cocok"
              message="Coba ubah kata kunci pencarian atau ganti pilihan area."
              actionText="Reset Pencarian"
              onAction={() => {
                setSearchQuery("");
                setSelectedArea("Semua area");
              }}
            />
          )}
        </section>
      </div>
    </main>
  );
}
