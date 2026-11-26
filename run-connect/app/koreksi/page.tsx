"use client";

// app/koreksi/page.tsx
// Halaman formulir Laporkan Koreksi Data (khusus Mitra) sesuai prototipe dan PRD.

import React, { useState } from "react";
import Link from "next/link";
import { AuthGate, SubmissionDone } from "@/components/FormComponents";

export default function KoreksiPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [bagianSalah, setBagianSalah] = useState("");
  const [isiBenar, setIsiBenar] = useState("");
  const [catatan, setCatatan] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const options = [
    "Judul / nama",
    "Tanggal",
    "Lokasi",
    "Kategori dan biaya",
    "Kontak",
    "Lainnya",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (!bagianSalah || !isiBenar.trim()) {
      showToast("Lengkapi kolom yang wajib diisi");
      return;
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Header Halaman */}
      <div className="pg">
        <div className="w">
          <h1>Laporkan Koreksi Data</h1>
        </div>
      </div>

      <div className="w">
        <section className="s narrow">
          <AuthGate requiredRole="mitra">
            {isSubmitted ? (
              <SubmissionDone />
            ) : (
              <div className="box">
                <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
                  Laporkan Koreksi Data
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Bagian yang salah */}
                  <div className="fg">
                    <label>Bagian yang salah *</label>
                    <select
                      value={bagianSalah}
                      onChange={(e) => setBagianSalah(e.target.value)}
                    >
                      <option value="">Pilih bagian yang salah...</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {showErrors && !bagianSalah && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib dipilih.
                      </div>
                    )}
                  </div>

                  {/* Isi yang benar */}
                  <div className="fg">
                    <label>Isi yang benar *</label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan data yang benar..."
                      value={isiBenar}
                      onChange={(e) => setIsiBenar(e.target.value)}
                    />
                    {showErrors && !isiBenar.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Catatan tambahan (opsional) */}
                  <div className="fg">
                    <label>Catatan tambahan (opsional)</label>
                    <textarea
                      rows={2}
                      placeholder="Tambahkan catatan jika diperlukan..."
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                    />
                  </div>

                  {/* Tombol Aksi Bawah */}
                  <div className="fbar">
                    <Link className="btn out" href="/mitra/submission">
                      Kembali
                    </Link>
                    <button type="submit" className="btn">
                      Kirim untuk Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </AuthGate>
        </section>
      </div>
    </main>
  );
}
