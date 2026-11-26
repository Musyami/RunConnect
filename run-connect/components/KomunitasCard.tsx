// components/KomunitasCard.tsx
// Kartu komunitas lari sesuai prototipe reference/Run_Connect.html baris 221
// Menampilkan foto bersama, nama, lokasi kecamatan/area, jumlah anggota, keterbukaan, dan deskripsi.

import React from "react";
import Link from "next/link";

export interface KomunitasItem {
  id?: number | string;
  slug?: string;
  name: string;
  area: string; // Surabaya Timur, dll.
  kecamatan: string; // Sukolilo, dll.
  memberCount: number;
  membershipType: "umum" | "khusus"; // 'umum' atau 'khusus'
  description: string;
}

interface KomunitasCardProps {
  komunitas: KomunitasItem;
  colorIndex?: number;
}

const BG_GRADIENTS = ["ph1", "ph2", "ph3", "ph4"];

export default function KomunitasCard({
  komunitas,
  colorIndex = 0,
}: KomunitasCardProps) {
  const href = komunitas.slug
    ? `/komunitas/${komunitas.slug}`
    : `/komunitas/${komunitas.id ?? 1}`;
  const bgClass = BG_GRADIENTS[colorIndex % BG_GRADIENTS.length];

  return (
    <article className="card">
      <Link href={href} style={{ color: "inherit", display: "contents" }}>
        {/* Gambar Komunitas (rasio 4:3) */}
        <div
          className={`im ${bgClass}`}
          role="img"
          aria-label={`Foto bersama ${komunitas.name}`}
        >
          👥
        </div>

        {/* Konten Kartu */}
        <div className="cb">
          {/* Judul Komunitas */}
          <h3>{komunitas.name}</h3>

          {/* Lokasi Kecamatan dan Area */}
          <span className="loc">
            📍 Kec. {komunitas.kecamatan} · {komunitas.area}
          </span>

          {/* Label Jumlah Anggota & Keterbukaan */}
          <div>
            <span className="lb">{komunitas.memberCount} anggota</span>
            {komunitas.membershipType === "umum" ? (
              <span className="lb g">Terbuka untuk umum</span>
            ) : (
              <span className="lb o">Khusus</span>
            )}
          </div>

          {/* Deskripsi Singkat */}
          <p>{komunitas.description}</p>

          {/* Tombol Aksi */}
          <span className="btn sm">Lihat Selengkapnya</span>
        </div>
      </Link>
    </article>
  );
}
