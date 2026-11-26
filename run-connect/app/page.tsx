"use client";

// app/page.tsx
// Halaman Beranda Run Connect sesuai spesifikasi PRD bagian Beranda dan prototipe reference/Run_Connect.html.
// Urutan seksi:
// 1. Banner carousel besar (Embla)
// 2. Strip statistik oranye (Event, Komunitas, Tempat Lari)
// 3. Event yang sedang buka pendaftaran + total + tombol
// 4. Jadwal event minggu ini + rentang tanggal + tombol
// 5. Seksi Komunitas (dua kolom, poin centang, kolase miring bertumpuk, gelombang pembatas)
// 6. Seksi Tempat Lari (panel gradien biru, ilustrasi peta SVG, tiga pin goyang)
// 7. Seksi Daftarkan (poster miring, 3 langkah bernomor, tombol daftarkan)
// 8. Blog terbaru (3 kartu blog)
// 9. FAQ (akordeon satu terbuka pada satu waktu)

import { useState } from "react";
import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";
import EventCard from "@/components/EventCard";
import BlogCard from "@/components/BlogCard";
import {
  getSampleEvents,
  sampleKomunitas,
  sampleTempatLari,
  sampleArticles,
  sampleFAQ,
  sampleBanners,
} from "@/data";

export default function BerandaPage() {
  // Ambil data contoh dinamis
  const events = getSampleEvents();
  const openEvents = events.filter((e) => e.status === "buka");

  // Hitung rentang tanggal minggu berjalan
  const today = new Date();
  const dayOfWeek = (today.getDay() + 6) % 7; // 0 = Senin, 6 = Minggu
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek);
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);

  // Filter event di minggu berjalan
  const thisWeekEvents = events.filter((e) => {
    const d = new Date(e.tgl_mulai);
    return d >= monday && d <= new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 23, 59, 59);
  });

  // Format tanggal Indonesia: Senin, 23 November 2026
  const formatFullDate = (d: Date) => {
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  // State untuk FAQ (akordeon, hanya 1 terbuka pada satu waktu)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main>
      {/* 1. Banner Carousel Besar */}
      <BannerCarousel slides={sampleBanners.beranda} big={true} />

      <div className="w">
        {/* 2. Strip Statistik Oranye */}
        <div className="ss">
          <div>
            <span>
              <b>{events.length}+</b>
              Event
            </span>
          </div>
          <div>
            <span>
              <b>{sampleKomunitas.length}+</b>
              Komunitas
            </span>
          </div>
          <div>
            <span>
              <b>{sampleTempatLari.length}+</b>
              Tempat Lari
            </span>
          </div>
        </div>

        {/* 3. Event yang sedang buka pendaftaran */}
        <section className="s">
          <div className="h">
            <h2>Event yang sedang buka pendaftaran</h2>
            <p className="mut" style={{ margin: "6px 0 0" }}>
              Total {openEvents.length} event sedang buka pendaftaran
            </p>
          </div>
          <div className="grid">
            {openEvents.slice(0, 6).map((ev, i) => (
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
          <div className="mid">
            <Link href="/event" className="btn">
              Lihat Semua Event
            </Link>
          </div>
        </section>

        {/* 4. Jadwal event minggu ini */}
        <section className="s" style={{ paddingTop: 0 }}>
          <div className="h">
            <h2>Jadwal event minggu ini</h2>
            <p className="mut" style={{ margin: "6px 0 0" }}>
              {formatFullDate(monday)} – {formatFullDate(sunday)}{" "}
              {sunday.getFullYear()} · {thisWeekEvents.length} event
            </p>
          </div>
          <div className="grid">
            {thisWeekEvents.slice(0, 6).map((ev, i) => (
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
          <div className="mid">
            <Link href="/event/minggu-ini" className="btn">
              Lihat Semua
            </Link>
          </div>
        </section>
      </div>

      {/* 5. Seksi Komunitas (dengan latar hijau muda dan gelombang bertepi) */}
      {/* Gelombang pembatas atas */}
      <svg
        className="wv"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 22Q180 0 360 22T720 22T1080 22T1440 22V40H0Z"
          fill="var(--gl)"
        />
      </svg>

      <div className="band">
        <div className="w">
          <div className="kom">
            {/* Kolom Kiri: Teks Ajakan & Poin */}
            <div>
              <span className="pl2">Komunitas Lari</span>
              <h2>Mau lari bareng biar lebih semangat?</h2>
              <p className="mut">
                Yuk kenali komunitas lari di Surabaya dan gabung yang paling cocok
                denganmu.
              </p>
              <ul className="ck">
                <li>Temukan komunitas di areamu</li>
                <li>Lihat jadwal latihan, jarak, dan pace</li>
                <li>Terbuka untuk umum atau khusus</li>
              </ul>
              <Link href="/komunitas" className="btn gr">
                Lihat Komunitas Lari
              </Link>
            </div>

            {/* Kolom Kanan: Kolase Foto Miring Bertumpuk */}
            <div className="col">
              <div className="p ph1">👥</div>
              <div className="p ph2">👟</div>
              <div className="p ph3">🤝</div>
              <span className="bd">{sampleKomunitas.length} komunitas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gelombang pembatas bawah (terbalik) */}
      <svg
        className="wv f"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 22Q180 0 360 22T720 22T1080 22T1440 22V40H0Z"
          fill="var(--gl)"
        />
      </svg>

      <div className="w">
        {/* 6. Seksi Tempat Lari (Panel Gradien Biru dengan Ilustrasi Peta SVG) */}
        <section className="s">
          <div className="mpn">
            {/* Ilustrasi Peta SVG dengan Tiga Pin Goyang */}
            <div className="il">
              <svg
                viewBox="0 0 400 260"
                role="img"
                aria-label="Ilustrasi peta tempat lari Surabaya"
              >
                {/* Garis jalan & kisi */}
                <g stroke="rgba(255,255,255,0.18)" strokeWidth="2">
                  <path d="M0 60H400M0 130H400M0 200H400M80 0V260M180 0V260M300 0V260" />
                </g>
                {/* Rute oranye putus-putus */}
                <path
                  d="M20 230C110 190 170 130 380 50"
                  stroke="#FF9A3D"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                />
                {/* Tiga Pin Bergoyang (Wobble) */}
                <g transform="translate(100 170)">
                  <g className="wob" style={{ animationDelay: "0s" }}>
                    <path
                      d="M0 0C-14-18-14-36 0-36S14-18 0 0Z"
                      fill="#1FA85A"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                    <circle cy="-24" r="4" fill="#fff" />
                  </g>
                </g>
                <g transform="translate(200 110)">
                  <g className="wob" style={{ animationDelay: "0.6s" }}>
                    <path
                      d="M0 0C-14-18-14-36 0-36S14-18 0 0Z"
                      fill="#1D63D8"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                    <circle cy="-24" r="4" fill="#fff" />
                  </g>
                </g>
                <g transform="translate(300 150)">
                  <g className="wob" style={{ animationDelay: "1.2s" }}>
                    <path
                      d="M0 0C-14-18-14-36 0-36S14-18 0 0Z"
                      fill="#E85D04"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                    <circle cy="-24" r="4" fill="#fff" />
                  </g>
                </g>
              </svg>
            </div>

            {/* Teks Penjelasan & Tombol */}
            <div>
              <span className="pl2">Tempat Lari</span>
              <h2>Bingung cari tempat lari yang cocok di sekitar Surabaya?</h2>
              <p>
                Yuk lihat peta tempat lari dengan tingkat keramaian, jam buka, dan
                parkir.
              </p>
              <Link href="/tempat-lari" className="btn">
                Buka Peta Tempat Lari
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Seksi Daftarkan (Poster Miring Berbingkai Putus-putus) */}
        <section className="s" style={{ paddingTop: 0 }}>
          <div className="pst">
            {/* Judul Pita Miring Oranye */}
            <div>
              <span className="rb">
                Event atau komunitasmu belum ada di Run Connect?
              </span>
            </div>

            {/* Tiga Langkah Bernomor */}
            <div>
              <div className="stp">
                <b>1</b>
                <span>Masuk dengan Google sebagai Mitra</span>
              </div>
              <div className="stp">
                <b>2</b>
                <span>Isi formulir</span>
              </div>
              <div className="stp">
                <b>3</b>
                <span>Diperiksa tim lalu tayang</span>
              </div>
              <Link
                href="/daftar/event"
                className="btn"
                style={{ marginTop: "8px" }}
              >
                + Daftarkan
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Blog Terbaru */}
        <section className="s">
          <div className="h" style={{ textAlign: "center" }}>
            <span className="pl2">Artikel Terbaru</span>
            <h2>Blog terbaru</h2>
          </div>
          <div className="grid">
            {sampleArticles.slice(0, 3).map((art, i) => (
              <BlogCard
                key={art.id}
                colorIndex={i}
                article={{
                  id: art.id,
                  slug: art.slug,
                  title: art.judul,
                  category: art.kategori,
                  publishedDate: art.tanggal_publikasi,
                  readingTimeMinutes: art.perkiraan_baca,
                  summary: art.ringkasan,
                }}
              />
            ))}
          </div>
        </section>

        {/* 9. FAQ (Pertanyaan Umum - Akordeon) */}
        <section className="s">
          <div className="h" style={{ textAlign: "center" }}>
            <span className="pl2">Pertanyaan Umum</span>
            <h2>Ada pertanyaan?</h2>
          </div>
          <div className="faq">
            {sampleFAQ.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={faq.id} className={`fq ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
                    {faq.pertanyaan}
                    <span aria-hidden="true">{isOpen ? "−" : "＋"}</span>
                  </button>
                  <div className="fa">{faq.jawaban}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
