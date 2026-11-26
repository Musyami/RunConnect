"use client";

// app/blog/page.tsx
// Halaman Daftar Artikel Blog sesuai prototipe reference/Run_Connect.html baris 309 dan PRD.
// Menyajikan banner carousel, chip kategori (Semua, Panduan, Tips, Cerita), dan grid kartu blog.

import React, { useState, useMemo } from "react";
import BannerCarousel from "@/components/BannerCarousel";
import { Chips } from "@/components/FilterBar";
import BlogCard from "@/components/BlogCard";
import { EmptyState } from "@/components/StateDisplay";
import { sampleArticles, sampleBanners } from "@/data";

const CATEGORY_CHIPS = ["Semua", "Panduan", "Tips", "Cerita"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Filter artikel berdasarkan kategori
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Semua") {
      return sampleArticles;
    }
    return sampleArticles.filter((art) => art.kategori === selectedCategory);
  }, [selectedCategory]);

  return (
    <main>
      {/* Banner Carousel Blog */}
      <BannerCarousel slides={sampleBanners.blog} />

      <div className="w">
        <section className="s">
          <h2 style={{ marginBottom: "12px" }}>Blog</h2>

          {/* Chip Kategori Blog */}
          <Chips
            items={CATEGORY_CHIPS}
            selectedItem={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Grid Kartu Blog */}
          {filteredArticles.length > 0 ? (
            <div className="grid">
              {filteredArticles.map((art, i) => (
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
          ) : (
            <EmptyState
              title="Belum ada artikel di kategori ini"
              message="Pilih kategori lain untuk membaca panduan, tips, dan cerita seputar lari."
              actionText="Lihat Semua Kategori"
              onAction={() => setSelectedCategory("Semua")}
            />
          )}
        </section>
      </div>
    </main>
  );
}
