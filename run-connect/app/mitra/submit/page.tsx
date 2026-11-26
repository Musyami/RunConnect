"use client";

// app/mitra/submit/page.tsx
// Halaman Submit Mitra sesuai prototipe reference/Run_Connect.html baris 316 dan PRD.
// Menyajikan pilihan pengajuan: Event Lari dan Komunitas Lari (Lokasi hanya untuk Pengguna Lari).

import React from "react";
import Link from "next/link";
import MitraHeader from "@/components/MitraHeader";
import { AuthGate } from "@/components/FormComponents";

export default function MitraSubmitPage() {
  const submitOptions = [
    {
      key: "event",
      icon: "📅",
      title: "Event Lari",
      desc: "Isi formulir event lari.",
      href: "/daftar/event",
    },
    {
      key: "komunitas",
      icon: "👥",
      title: "Komunitas Lari",
      desc: "Isi formulir komunitas lari.",
      href: "/daftar/komunitas",
    },
  ];

  return (
    <main>
      <MitraHeader />

      <div className="w">
        <section className="s">
          <AuthGate requiredRole="mitra">
            <h2 style={{ marginBottom: "8px" }}>Submit</h2>
            <p className="mut" style={{ marginTop: 0, marginBottom: "20px" }}>
              Pilih jenis, lalu isi formulir yang sama seperti halaman Daftarkan.
              Lokasi hanya untuk Pengguna Lari.
            </p>

            <div className="grid">
              {submitOptions.map((opt) => (
                <Link key={opt.key} className="card" href={opt.href}>
                  <div className="cb">
                    <h3>
                      {opt.icon} {opt.title}
                    </h3>
                    <p>{opt.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </AuthGate>
        </section>
      </div>
    </main>
  );
}
