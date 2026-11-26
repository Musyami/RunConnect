"use client";

// app/komunitas/[slug]/page.tsx
// Halaman Detail Komunitas sesuai prototipe reference/Run_Connect.html baris 305-306 dan PRD.
// Menyajikan foto bersama, logo, nama, lokasi berhuruf besar (20px), penjelasan keanggotaan,
// jadwal latihan rutin (nilai Fleksibel tampil apa adanya), titik kumpul, tombol sosial, dan event mendatang.

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import EventCard from "@/components/EventCard";
import SocialButton from "@/components/SocialButton";
import { sampleKomunitas, getSampleEvents } from "@/data";

export default function DetailKomunitasPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Cari komunitas berdasarkan slug atau ID
  const komunitas =
    sampleKomunitas.find((k) => k.slug === slug || String(k.id) === slug) ||
    sampleKomunitas[0];

  const events = getSampleEvents();
  // Event yang akan datang (terbuka)
  const upcomingEvents = events.filter((e) => e.status === "buka").slice(0, 3);

  return (
    <main>
      <div className="w">
        {/* Remah Roti (Breadcrumb) */}
        <div className="bc">
          <Link href="/">Beranda</Link> / <Link href="/komunitas">Komunitas</Link> /{" "}
          <span>{komunitas.nama}</span>
        </div>

        {/* Tata Letak 2 Kolom (Konten Kiri 2fr, Panel Kanan 1fr) */}
        <div className="dg">
          {/* Kolom Kiri: Foto, Nama, Lokasi, Deskripsi, Status Anggota */}
          <div>
            {/* Foto Komunitas (rasio 16:9) */}
            <div
              className={`im ${komunitas.foto}`}
              style={{
                borderRadius: "16px",
                aspectRatio: "16/9",
              }}
              role="img"
              aria-label={`Foto bersama ${komunitas.nama}`}
            >
              👥
            </div>

            {/* Kotak Informasi Komunitas */}
            <div className="box" style={{ marginTop: "20px" }}>
              {/* Header: Logo Bulat + Nama + Lokasi Besar */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span
                  className="lgc"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "linear-gradient(135deg, #1D63D8, #2F8BFF)",
                    fontSize: "26px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  👟
                </span>
                <div>
                  <h1 style={{ fontSize: "30px", margin: 0 }}>
                    {komunitas.nama}
                  </h1>
                  {/* Lokasi dengan huruf lebih besar (sekitar 20px) sesuai PRD */}
                  <span style={{ fontSize: "20px", fontWeight: 600, color: "var(--tx)" }}>
                    📍 Kec. {komunitas.kecamatan}, {komunitas.area}
                  </span>
                </div>
              </div>

              {/* Deskripsi */}
              <p className="mut" style={{ marginTop: "14px", lineHeight: "1.7" }}>
                {komunitas.deskripsi} Komunitas ini berlatih rutin dan menyambut
                anggota baru dari berbagai latar belakang.
              </p>

              {/* Label Jumlah Anggota & Keterbukaan */}
              <div style={{ margin: "12px 0 8px" }}>
                <span className="lb">{komunitas.jumlah_anggota} anggota</span>
                {komunitas.keanggotaan === "umum" ? (
                  <span className="lb g">Terbuka untuk umum</span>
                ) : (
                  <span className="lb o">Khusus</span>
                )}
              </div>

              {/* Penjelasan Keanggotaan */}
              <p className="mut" style={{ fontSize: "14px", margin: "4px 0 0" }}>
                {komunitas.keanggotaan === "umum"
                  ? "Terbuka untuk umum: siapa pun boleh bergabung tanpa syarat keanggotaan awal."
                  : komunitas.keanggotaan_ket || "Khusus kalangan tertentu."}
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Jadwal Latihan Rutin, Titik Kumpul, Kontak */}
          <aside className="box" style={{ alignSelf: "start" }}>
            <h3 style={{ marginBottom: "10px" }}>Jadwal latihan rutin</h3>

            <div className="row">
              <b>Hari</b>
              <span>
                {komunitas.jadwal.hari_dari === komunitas.jadwal.hari_sampai
                  ? komunitas.jadwal.hari_dari
                  : `${komunitas.jadwal.hari_dari} – ${komunitas.jadwal.hari_sampai}`}
              </span>
            </div>

            <div className="row">
              <b>Jam</b>
              <span>
                {komunitas.jadwal.jam_mulai} – {komunitas.jadwal.jam_selesai}
              </span>
            </div>

            <div className="row">
              <b>Jarak</b>
              <span>{komunitas.jadwal.jarak_km}</span>
            </div>

            {/* Nilai Fleksibel ditampilkan apa adanya sesuai PRD */}
            <div className="row">
              <b>Pace</b>
              <span>{komunitas.jadwal.pace}</span>
            </div>

            {/* Lokasi Kumpul */}
            <div className="row">
              <b>Kumpul</b>
              <span>
                {komunitas.lokasi_kumpul_alamat}
                <br />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={komunitas.lokasi_kumpul_maps}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "4px",
                  }}
                >
                  <MapPin size={14} aria-hidden="true" />
                  Buka di Google Maps
                </a>
              </span>
            </div>

            {/* Tombol Media Sosial Berlogo */}
            <div className="sbr">
              {komunitas.kontak.instagram && (
                <SocialButton
                  type="ig"
                  text="Instagram"
                  href={komunitas.kontak.instagram}
                />
              )}
              {komunitas.kontak.whatsapp && (
                <SocialButton
                  type="wa"
                  text="WhatsApp"
                  href={komunitas.kontak.whatsapp}
                />
              )}
              {komunitas.kontak.email && (
                <SocialButton
                  type="ml"
                  text="Email"
                  href={`mailto:${komunitas.kontak.email}`}
                />
              )}
              {komunitas.kontak.website && (
                <SocialButton
                  type="wb"
                  text="Website"
                  href={komunitas.kontak.website}
                />
              )}
            </div>
          </aside>
        </div>

        {/* Seksi Event yang Akan Datang */}
        <section className="s">
          <h2 style={{ marginBottom: "16px" }}>Event yang akan datang</h2>
          <div className="grid">
            {upcomingEvents.map((ev, i) => (
              <EventCard
                key={ev.id}
                colorIndex={i}
                event={{
                  id: ev.id,
                  slug: ev.slug,
                  title: ev.judul,
                  date: ev.tgl_mulai,
                  category: ev.jenis,
                  location: ev.alamat,
                  area: ev.area,
                  distances: ev.kategori_jarak.join(" · "),
                  price: ev.biaya[0]?.nominal ?? 0,
                  isOpen: ev.status === "buka",
                  isPast: ev.status === "selesai",
                  description: ev.deskripsi,
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
