"use client";

// app/tempat-lari/page.tsx
// Halaman Peta Tempat Lari di Surabaya sesuai spesifikasi PRD Halaman 14 dan prototipe reference/Run_Connect.html.
// Menggunakan Leaflet + Esri World Street Map dengan tata letak dua panel:
// Sidebar daftar di kiri dan peta dunia nyata di kanan. Card detail lengkap di bawah peta.

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import BannerCarousel from "@/components/BannerCarousel";
import { Chips } from "@/components/FilterBar";
import { sampleTempatLari, sampleBanners, TempatLariData } from "@/data";
import { useAuth } from "@/context/AuthContext";

// Import peta Leaflet secara dinamis (ssr: false) agar tidak dieksekusi di server
const TempatLariMap = dynamic(() => import("@/components/TempatLariMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        minHeight: "360px",
        display: "grid",
        placeItems: "center",
        background: "#DCEBFA",
        color: "var(--b1)",
        fontWeight: 600,
      }}
    >
      Memuat peta Surabaya...
    </div>
  ),
});

const KERAMAIAN_CHIPS = ["Semua", "Sepi", "Sedang", "Ramai"];
const AREA_CHIPS = [
  "Semua Area",
  "Surabaya Barat",
  "Surabaya Timur",
  "Surabaya Pusat",
  "Surabaya Selatan",
  "Surabaya Utara",
];

const KERAMAIAN_COLORS: Record<string, string> = {
  sepi: "#1FA85A",
  sedang: "#1D63D8",
  ramai: "#E85D04",
};

export default function TempatLariPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeramaian, setSelectedKeramaian] = useState("Semua");
  const [selectedArea, setSelectedArea] = useState("Semua Area");
  const [selectedPlace, setSelectedPlace] = useState<TempatLariData | null>(
    sampleTempatLari[0] || null
  );

  // Status buka/tutup sidebar (terbuka di laptop >= 1024px, tertutup di HP)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toast pesan notifikasi
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Pada saat pertama dimuat di client, cek lebar layar
    if (typeof window !== "undefined") {
      setSidebarOpen(window.innerWidth >= 1024);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Filter daftar tempat lari
  const filteredPlaces = useMemo(() => {
    return sampleTempatLari.filter((p) => {
      // Filter Keramaian
      if (
        selectedKeramaian !== "Semua" &&
        p.keramaian.toLowerCase() !== selectedKeramaian.toLowerCase()
      ) {
        return false;
      }
      // Filter Area
      if (selectedArea !== "Semua Area" && p.area !== selectedArea) {
        return false;
      }
      // Pencarian Teks Nama
      if (
        searchQuery.trim() !== "" &&
        !p.nama.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedKeramaian, selectedArea]);

  // Handler tombol "Sarankan Perubahan"
  const handleSuggestChange = (place: TempatLariData) => {
    if (user && user.role === "lari") {
      router.push(`/saran?nama=${encodeURIComponent(place.nama)}`);
    } else {
      showToast("Masuk sebagai Pengguna Lari dulu.");
      router.push(
        `/masuk?role=lari&return=${encodeURIComponent(`/saran?nama=${place.nama}`)}`
      );
    }
  };

  return (
    <main>
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Banner Carousel Tempat Lari */}
      <BannerCarousel slides={sampleBanners.tempat} />

      <div className="w">
        <section className="s">
          {/* Wadah Dua Panel: Sidebar di Kiri, Peta di Kanan */}
          <div className={`tl ${sidebarOpen ? "" : "nosb"}`}>
            {/* Sidebar Daftar Tempat Lari */}
            <aside className="sb">
              {/* Header Sidebar dengan Lencana Jumlah */}
              <div className="sbh">
                <h2>Tempat Lari di Surabaya</h2>
                <span className="bdg">{filteredPlaces.length}</span>
              </div>

              {/* Input Pencarian */}
              <input
                type="text"
                className="in"
                placeholder="Cari tempat lari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari tempat lari"
              />

              {/* Chip Filter Keramaian */}
              <Chips
                items={KERAMAIAN_CHIPS}
                selectedItem={selectedKeramaian}
                onSelect={setSelectedKeramaian}
              />

              {/* Chip Filter Area */}
              <Chips
                items={AREA_CHIPS}
                selectedItem={selectedArea}
                onSelect={setSelectedArea}
              />

              {/* Daftar Scroll Tempat Lari */}
              <div className="pl">
                {filteredPlaces.length > 0 ? (
                  filteredPlaces.map((p) => {
                    const isSelected = selectedPlace?.id === p.id;
                    return (
                      <div
                        key={p.id}
                        className={`pi ${isSelected ? "sel" : ""}`}
                        onClick={() => setSelectedPlace(p)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Pilih ${p.nama}`}
                      >
                        {/* Lingkaran Warna Keramaian */}
                        <span
                          className="ic2"
                          style={{
                            background:
                              KERAMAIAN_COLORS[p.keramaian] || "#1D63D8",
                          }}
                        >
                          📍
                        </span>
                        <div>
                          <b>{p.nama}</b>
                          <small>{p.alamat}</small>
                          <div style={{ marginTop: "4px" }}>
                            <span
                              className={`lb ${p.keramaian === "sepi" ? "g" : p.keramaian === "ramai" ? "o" : ""}`}
                            >
                              {p.keramaian}
                            </span>
                            <span className="lb">
                              {p.jam_buka}–{p.jam_tutup}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty" style={{ padding: "20px 8px" }}>
                    Tidak ada tempat yang cocok.
                  </div>
                )}
              </div>
            </aside>

            {/* Panel Peta Dunia Nyata (react-leaflet + Esri) */}
            <div className="map">
              {/* Tombol Menu ☰ untuk Buka/Tutup Sidebar di Layar HP/Laptop */}
              <button
                type="button"
                className="mb"
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label="Buka atau tutup daftar tempat lari"
              >
                ☰
              </button>

              <TempatLariMap
                places={filteredPlaces}
                selectedPlace={selectedPlace}
                onSelectPlace={(p) => setSelectedPlace(p)}
                onSuggestChange={handleSuggestChange}
              />
            </div>
          </div>

          {/* Card Detail Tempat Lari Terpilih di Bawah Peta */}
          {selectedPlace && (
            <div className="box dc">
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {/* Foto / Ilustrasi Tempat */}
                <div
                  className={`im ${selectedPlace.foto}`}
                  style={{
                    width: "220px",
                    borderRadius: "12px",
                    aspectRatio: "4/3",
                    flexShrink: 0,
                  }}
                  role="img"
                  aria-label={`Foto ${selectedPlace.nama}`}
                >
                  🌳
                </div>

                {/* Rincian Tempat Lari */}
                <div style={{ flex: "1", minWidth: "260px" }}>
                  <h2 style={{ fontSize: "24px", marginBottom: "6px" }}>
                    {selectedPlace.nama}
                  </h2>

                  {/* Badge Keramaian */}
                  <div style={{ marginBottom: "10px" }}>
                    <span
                      className={`lb ${selectedPlace.keramaian === "sepi" ? "g" : selectedPlace.keramaian === "ramai" ? "o" : ""}`}
                    >
                      Keramaian: {selectedPlace.keramaian}
                    </span>
                  </div>

                  {/* Alamat & Link Google Maps */}
                  <div className="row">
                    <b>Alamat</b>
                    <span>
                      {selectedPlace.alamat}{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selectedPlace.link_maps}
                      >
                        Link Google Maps
                      </a>
                    </span>
                  </div>

                  {/* Area & Wilayah */}
                  <div className="row">
                    <b>Area</b>
                    <span>
                      {selectedPlace.area} · Kec. {selectedPlace.kecamatan}
                    </span>
                  </div>

                  {/* Jam Buka */}
                  <div className="row">
                    <b>Jam</b>
                    <span>
                      {selectedPlace.jam_buka}–{selectedPlace.jam_tutup}
                    </span>
                  </div>

                  {/* Parkir */}
                  <div className="row">
                    <b>Parkir</b>
                    <span>
                      {selectedPlace.parkir_tipe === "Gratis"
                        ? "Gratis"
                        : `Berbayar Rp ${selectedPlace.parkir_tarif.toLocaleString("id-ID")}${selectedPlace.parkir_stnk ? " · perlu STNK" : " · tanpa STNK"}`}
                    </span>
                  </div>

                  {/* Fasilitas Berpoin */}
                  <div className="row">
                    <b>Fasilitas</b>
                    <ul style={{ margin: 0, paddingLeft: "18px" }}>
                      {selectedPlace.fasilitas.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Catatan */}
                  {selectedPlace.catatan && (
                    <div className="row">
                      <b>Catatan</b>
                      <span>{selectedPlace.catatan}</span>
                    </div>
                  )}

                  {/* Tombol Aksi di Bawah Detail */}
                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      className="btn sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={selectedPlace.link_maps}
                    >
                      Petunjuk Arah
                    </a>
                    <button
                      type="button"
                      className="btn sm out"
                      onClick={() => handleSuggestChange(selectedPlace)}
                    >
                      Sarankan Perubahan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
