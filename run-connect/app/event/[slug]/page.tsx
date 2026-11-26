"use client";

// app/event/[slug]/page.tsx
// Halaman Detail Event sesuai spesifikasi PRD dan prototipe reference/Run_Connect.html baris 296-303.
// Menyajikan informasi lengkap event, tabel biaya, tombol daftar (dicatat click_register_link),
// tombol guidebook (bila ada), tombol simpan, tombol bagikan URL (+ toast), dan event serupa.

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bookmark, Share2, MapPin } from "lucide-react";
import EventCard from "@/components/EventCard";
import SocialButton from "@/components/SocialButton";
import { getSampleEvents } from "@/data";
import { track } from "@/lib/track";
import { useAuth } from "@/context/AuthContext";

export default function DetailEventPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { user, isEventSaved, toggleSaveEvent } = useAuth();
  const events = getSampleEvents();

  // Cari event berdasarkan slug atau ID
  const event = events.find((e) => e.slug === slug || String(e.id) === slug) || events[0];

  // State toast notifikasi
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // Status tersimpan dari AuthContext
  const isSaved = isEventSaved(event.id);

  // Catat pelacakan tampilan halaman detail
  useEffect(() => {
    track("view_event_page", { slug: event.slug, title: event.judul });
  }, [event]);

  // Tampilkan toast selama 2.5 detik
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Format tanggal: Min, 24 Nov 2026
  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Format Rupiah
  const formatRupiah = (num: number) => {
    if (num === 0) return "Gratis";
    return `Rp ${num.toLocaleString("id-ID")}`;
  };

  // Handler klik Bagikan (Salin URL ke clipboard + toast)
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Tautan disalin ke papan klip!");
    }
  };

  // Handler klik Simpan (Bookmark)
  const handleSave = () => {
    if (!user || user.role !== "lari") {
      showToast("Masuk sebagai Pengguna Lari dulu.");
      return;
    }
    const res = toggleSaveEvent(event.id);
    if (res.saved) {
      showToast("Event disimpan");
    } else {
      showToast("Dihapus dari Disimpan");
    }
  };

  // Handler klik pendaftaran
  const handleRegisterClick = () => {
    track("click_register_link", { slug: event.slug, title: event.judul, url: event.link_daftar });
  };

  // Cek apakah pendaftaran ditutup atau event selesai
  const isClosed = event.status === "tutup" || event.status === "selesai";

  // Event serupa (3 event selain event yang sedang dibuka)
  const similarEvents = events.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <main>
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      <div className="w">
        {/* Remah Roti (Breadcrumb) */}
        <div className="bc">
          <Link href="/">Beranda</Link> / <Link href="/event">Event</Link> /{" "}
          <span>{event.judul}</span>
        </div>

        {/* Tata Letak Detail 2 Kolom (Konten Kiri 2fr, Panel Kanan 1fr) */}
        <div className="dg">
          {/* Kolom Kiri: Poster, Judul, Benefit, Kontak */}
          <div>
            {/* Poster Utuh (rasio 4:5, max-width: 420px) */}
            <div
              className={`poster ${event.poster}`}
              style={{
                borderRadius: "16px",
                maxWidth: "420px",
                aspectRatio: "4/5",
              }}
              role="img"
              aria-label={`Poster ${event.judul}`}
            >
              🏁
            </div>

            {/* Kotak Informasi Utama */}
            <div className="box" style={{ marginTop: "20px" }}>
              {/* Tag Jenis, Status, & Kategori Jarak */}
              <div>
                <span className="lb">{event.jenis}</span>
                {event.biaya[0]?.nominal === 0 && (
                  <span className="lb g">Gratis</span>
                )}
                {event.status === "selesai" ? (
                  <span className="lb x">Selesai</span>
                ) : event.status === "buka" ? (
                  <span className="lb g">Pendaftaran dibuka</span>
                ) : (
                  <span className="lb o">Pendaftaran ditutup</span>
                )}
                {event.kategori_jarak.map((kat) => (
                  <span key={kat} className="lb">
                    {kat}
                  </span>
                ))}
              </div>

              {/* Judul Event */}
              <h1 style={{ fontSize: "30px", margin: "10px 0" }}>
                {event.judul}
              </h1>

              {/* Deskripsi */}
              <p className="mut">{event.deskripsi}</p>

              {/* Fasilitas dan Benefit Berpoin */}
              <h3 style={{ margin: "18px 0 6px" }}>Fasilitas dan benefit</h3>
              <ul className="mv">
                {event.benefit.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              {/* Kontak dan Media Sosial */}
              <h3 style={{ margin: "18px 0 6px" }}>Kontak dan media sosial</h3>
              <div className="sbr">
                {event.kontak.whatsapp && (
                  <SocialButton
                    type="wa"
                    text="WhatsApp"
                    href={event.kontak.whatsapp}
                  />
                )}
                {event.kontak.instagram && (
                  <SocialButton
                    type="ig"
                    text="Instagram"
                    href={event.kontak.instagram}
                  />
                )}
                {event.kontak.tiktok && (
                  <SocialButton
                    type="tt"
                    text="TikTok"
                    href={event.kontak.tiktok}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Rincian Jadwal, Lokasi, Biaya, Tombol Daftar & Aksi */}
          <aside className="box" style={{ alignSelf: "start" }}>
            {/* Waktu Event */}
            <div className="row">
              <b>Event</b>
              <span>{formatDate(event.tgl_mulai)}, 06.00 WIB (selesai)</span>
            </div>

            {/* Rentang Pendaftaran */}
            <div className="row">
              <b>Pendaftaran</b>
              <span>
                {formatDate(event.tgl_buka_daftar)} –{" "}
                {formatDate(event.tgl_tutup_daftar)}
              </span>
            </div>

            {/* Lokasi */}
            <div className="row">
              <b>Lokasi</b>
              <span>
                {event.alamat}
                <br />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={event.link_maps}
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

            {/* Area & Kecamatan */}
            <div className="row">
              <b>Area</b>
              <span>
                {event.area} · Kec. {event.kecamatan}, {event.kabupaten}
              </span>
            </div>

            {/* Penyelenggara */}
            <div className="row">
              <b>Organizer</b>
              <span>{event.organizer}</span>
            </div>

            {/* Tabel Kategori Jarak dan Biaya */}
            <table
              style={{
                width: "100%",
                margin: "12px 0",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 0" }}>
                    Kategori
                  </th>
                  <th style={{ textAlign: "right", padding: "6px 0" }}>Biaya</th>
                </tr>
              </thead>
              <tbody>
                {event.biaya.map((b) => (
                  <tr key={b.kategori} style={{ borderTop: "1px solid var(--ln)" }}>
                    <td style={{ padding: "8px 0" }}>{b.kategori}</td>
                    <td style={{ textAlign: "right", padding: "8px 0" }}>
                      {formatRupiah(b.nominal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Tombol Utama Oranye Daftar di Situs Penyelenggara */}
            {isClosed ? (
              <button
                type="button"
                className="btn"
                style={{ width: "100%" }}
                disabled
              >
                Pendaftaran ditutup
              </button>
            ) : (
              <a
                className="btn"
                style={{ width: "100%" }}
                href={event.link_daftar}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleRegisterClick}
              >
                Daftar di situs penyelenggara
              </a>
            )}

            {/* Tombol Guidebook / Ketentuan (Hanya bila ada link) */}
            {event.link_guidebook && (
              <a
                className="btn out"
                style={{ width: "100%", marginTop: "8px" }}
                href={event.link_guidebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Guidebook / Ketentuan
              </a>
            )}

            {/* Tombol Aksi: Simpan (Bookmark) & Bagikan */}
            <div className="act">
              {/* Tombol Simpan */}
              <button
                type="button"
                className={`bmb ${isSaved ? "on" : ""}`}
                onClick={handleSave}
                aria-label={isSaved ? "Hapus dari disimpan" : "Simpan event"}
              >
                <Bookmark
                  size={24}
                  fill={isSaved ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </button>

              {/* Tombol Bagikan */}
              <button
                type="button"
                className="btn bl"
                onClick={handleShare}
                aria-label="Bagikan event"
              >
                <Share2 size={18} aria-hidden="true" />
                Bagikan
              </button>
            </div>
          </aside>
        </div>

        {/* Event Serupa di Bawah Halaman */}
        <section className="s">
          <h2 style={{ marginBottom: "16px" }}>Event serupa</h2>
          <div className="grid">
            {similarEvents.map((ev, i) => (
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
