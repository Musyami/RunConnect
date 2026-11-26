"use client";

// app/blog/[slug]/page.tsx
// Halaman Detail Artikel Blog sesuai prototipe reference/Run_Connect.html baris 310 dan PRD.
// Menyajikan tata letak lebar (maks. 1100 px), gambar hero 21/9, kartu artikel lebar (960 px)
// dengan teks 18 px jarak baris 1.8, gambar dalam artikel 16/9, tombol Bagikan (+ toast), dan artikel terkait.

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Share2 } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { sampleArticles } from "@/data";

export default function DetailBlogPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Cari artikel berdasarkan slug atau ID
  const article =
    sampleArticles.find((a) => a.slug === slug || String(a.id) === slug) ||
    sampleArticles[0];

  // Toast notifikasi salin link
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Tautan artikel disalin ke papan klip!");
    }
  };

  // Format tanggal Indonesia: 20 November 2026
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T06:00:00");
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Artikel terkait (3 artikel lain)
  const relatedArticles = sampleArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <main>
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Kontainer Lebar Khusus Blog (Maks. 1100 px) */}
      <div className="wb">
        {/* Remah Roti */}
        <div className="bc">
          <Link href="/">Beranda</Link> / <Link href="/blog">Blog</Link> /{" "}
          <span>{article.judul}</span>
        </div>

        {/* Gambar Utama Selebar Penuh (Hero 21/9) */}
        <div
          className={`hero ${article.gambar}`}
          role="img"
          aria-label={`Gambar utama ${article.judul}`}
        >
          📰
        </div>

        {/* Kartu Artikel Putih Lebar (Maks. 960 px, margin -36px) */}
        <article className="art">
          <div>
            <span className="lb g">{article.kategori}</span>
            <span className="loc">
              {formatDate(article.tanggal_publikasi)} · {article.perkiraan_baca}{" "}
              menit baca
            </span>
          </div>

          <h1>{article.judul}</h1>

          {/* Paragraf Pembuka */}
          <p>{article.isi[0]}</p>

          {/* Gambar di Dalam Artikel Selebar Kolom (16/9) */}
          <div
            className="ph ph1"
            role="img"
            aria-label="Ilustrasi pelari di dalam artikel"
          >
            🖼️
          </div>

          {/* Paragraf Lanjutan */}
          {article.isi.slice(1).map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          {/* Tombol Bagikan Biru */}
          <div style={{ marginTop: "24px" }}>
            <button
              type="button"
              className="btn bl"
              onClick={handleShare}
              aria-label="Bagikan artikel ini"
            >
              <Share2 size={18} aria-hidden="true" />
              Bagikan
            </button>
          </div>
        </article>

        {/* Seksi Artikel Terkait */}
        <section className="s">
          <h2 style={{ marginBottom: "16px" }}>Artikel terkait</h2>
          <div className="grid">
            {relatedArticles.map((art, i) => (
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
      </div>
    </main>
  );
}
