// components/BlogCard.tsx
// Kartu artikel blog sesuai prototipe reference/Run_Connect.html baris 223
// Menampilkan gambar ilustrasi, kategori, tanggal publikasi, judul, dan ringkasan.

import React from "react";
import Link from "next/link";

export interface BlogItem {
  id?: number | string;
  slug?: string;
  title: string;
  category: string; // Panduan, Tips, Cerita, dll.
  publishedDate: string | Date;
  readingTimeMinutes?: number;
  summary?: string;
}

interface BlogCardProps {
  article: BlogItem;
  colorIndex?: number;
}

const BG_GRADIENTS = ["ph1", "ph2", "ph3", "ph4"];

export default function BlogCard({ article, colorIndex = 0 }: BlogCardProps) {
  // Format tanggal: 20 Nov 2026
  const dateObj =
    typeof article.publishedDate === "string"
      ? new Date(article.publishedDate)
      : article.publishedDate;
  const daysShort = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const monthsShort = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];

  const formattedDate = !isNaN(dateObj.getTime())
    ? `${daysShort[dateObj.getDay()]}, ${dateObj.getDate()} ${monthsShort[dateObj.getMonth()]} ${dateObj.getFullYear()}`
    : String(article.publishedDate);

  const href = article.slug ? `/blog/${article.slug}` : `/blog/${article.id ?? 1}`;
  const bgClass = BG_GRADIENTS[(colorIndex + 1) % BG_GRADIENTS.length];

  return (
    <article className="card">
      <Link href={href} style={{ color: "inherit", display: "contents" }}>
        {/* Gambar Ilustrasi Artikel (rasio 4:3) */}
        <div
          className={`im ${bgClass}`}
          role="img"
          aria-label={`Ilustrasi ${article.title}`}
        >
          📰
        </div>

        {/* Konten Kartu */}
        <div className="cb">
          {/* Label Kategori & Tanggal Publikasi */}
          <div>
            <span className="lb g">{article.category}</span>
            <span className="loc">{formattedDate}</span>
          </div>

          {/* Judul Artikel */}
          <h3>{article.title}</h3>

          {/* Ringkasan Singkat */}
          <p>
            {article.summary ||
              "Ringkasan artikel singkat untuk pelari di Surabaya."}
          </p>

          {/* Tombol Aksi */}
          <span className="btn sm">Lihat Selengkapnya</span>
        </div>
      </Link>
    </article>
  );
}
