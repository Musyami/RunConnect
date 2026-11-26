"use client";

// app/tentang/page.tsx
// Halaman Tentang Run Connect sesuai prototipe reference/Run_Connect.html baris 311 dan PRD.
// Menampilkan header gradasi biru tanpa banner carousel, informasi profil proyek,
// tujuan, visi misi, tim pengembang mahasiswa SI ITS, kontak tombol sosial berlogo,
// serta CTA Daftarkan kegiatanmu.

import React, { useState } from "react";
import Link from "next/link";
import SocialButton from "@/components/SocialButton";
import { sampleTeam } from "@/data";

export default function TentangPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const sections = [
    {
      title: "Mengapa kami ada",
      desc: "Informasi lari sering tersebar di media sosial dan grup percakapan. Kami melihat tiga hal yang berulang: sulit menemukan info di satu tempat, sulit menemukan komunitas dan teman lari yang cocok, dan sulit menemukan tempat lari yang nyaman.",
    },
    {
      title: "Apa yang bisa kamu temukan",
      desc: "Kalender event lari, direktori komunitas, dan peta tempat lari.",
    },
    {
      title: "Cara kami menyusun data",
      desc: "Data berasal dari penyelenggara, komunitas, dan pelari, lalu diperiksa tim sebelum ditayangkan. Kalau ada informasi yang keliru, mitra bisa melaporkan koreksi lewat halaman Submission.",
    },
    {
      title: "Tentang proyek ini",
      desc: "Run Connect dikembangkan oleh mahasiswa Sistem Informasi ITS sebagai bagian dari pembelajaran Design Thinking, berangkat dari wawancara langsung dengan pelari dan pendiri komunitas.",
    },
  ];

  return (
    <main>
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Header Halaman Sederhana (Gradasi Biru tanpa carousel) */}
      <div className="pg">
        <div className="w">
          <h1>Tentang Run Connect</h1>
        </div>
      </div>

      {/* Konten Halaman Tentang */}
      <div className="w">
        <section className="s narrow">
          {/* Paragraf Pembuka */}
          <p style={{ fontSize: "18px" }}>
            Run Connect mengumpulkan event lari, profil komunitas, jadwal latihan,
            dan tempat lari di Surabaya dalam satu tempat, supaya mencari kegiatan
            lari terasa mudah.
          </p>

          {/* Seksi Penjelasan */}
          {sections.map((sec) => (
            <React.Fragment key={sec.title}>
              <h2 style={{ margin: "28px 0 8px", fontSize: "22px" }}>
                {sec.title}
              </h2>
              <p>{sec.desc}</p>
            </React.Fragment>
          ))}

          {/* Tujuan Kami */}
          <h2 style={{ margin: "28px 0 8px", fontSize: "22px" }}>
            Tujuan kami
          </h2>
          <ol className="mv">
            <li>Memusatkan informasi event, komunitas, dan tempat lari dalam satu platform.</li>
            <li>Memudahkan pelari pemula menemukan jadwal, komunitas, dan teman latihan.</li>
            <li>Menyediakan informasi lokasi lari yang nyaman di Surabaya.</li>
            <li>Membantu penyelenggara, komunitas, dan pelaku usaha lari lokal lebih mudah ditemukan.</li>
          </ol>

          {/* Visi (draf) */}
          <h2 style={{ margin: "28px 0 8px", fontSize: "22px" }}>
            Visi (draf)
          </h2>
          <p>
            Menjadi wadah informasi lari yang lengkap dan tepercaya di Surabaya, yang
            menghubungkan pelari, komunitas, penyelenggara, dan pelaku usaha lari lokal.
          </p>

          {/* Misi (draf) */}
          <h2 style={{ margin: "28px 0 8px", fontSize: "22px" }}>
            Misi (draf)
          </h2>
          <ul className="mv">
            <li>Memusatkan informasi kegiatan lari.</li>
            <li>Mempermudah pelari menemukan jadwal latihan dan event.</li>
            <li>Membantu pelari pemula menemukan komunitas yang sesuai.</li>
            <li>Menyediakan informasi lokasi dan rekomendasi tempat lari.</li>
            <li>Membangun keterhubungan antar pelari dan komunitas di Surabaya.</li>
          </ul>

          {/* Tim Pengembang 4 orang */}
          <h2 style={{ margin: "28px 0 12px", fontSize: "22px" }}>
            Tim Pengembang
          </h2>
          <div className="team">
            {sampleTeam.map((member) => (
              <div key={member.id} className="box">
                <i style={{ background: member.warna }}>{member.inisial}</i>
                <b>{member.nama}</b>
              </div>
            ))}
          </div>

          {/* Hubungi Kami */}
          <h2 style={{ margin: "28px 0 12px", fontSize: "22px" }}>
            Hubungi Kami
          </h2>
          <div className="sbr">
            <SocialButton
              type="ig"
              text="Instagram"
              onClick={() => showToast("Akun resmi diisi sebelum tayang")}
            />
            <SocialButton
              type="wa"
              text="WhatsApp"
              onClick={() => showToast("Akun resmi diisi sebelum tayang")}
            />
            <SocialButton
              type="ml"
              text="Email tim"
              onClick={() => showToast("Email resmi diisi sebelum tayang")}
            />
          </div>

          {/* Banner Ajakan CTA */}
          <div className="cta" style={{ marginTop: "28px" }}>
            <div>
              <h2>Untuk penyelenggara dan komunitas</h2>
              <p>Daftarkan kegiatanmu, gratis untuk saat ini.</p>
            </div>
            <Link className="btn" href="/daftar/event">
              Daftarkan sekarang
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
