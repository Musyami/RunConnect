"use client";

// app/saran/page.tsx
// Halaman formulir Sarankan Perubahan tempat lari (khusus Pengguna Lari) sesuai prototipe dan PRD.

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthGate, SubmissionDone } from "@/components/FormComponents";

function SaranContent() {
  const searchParams = useSearchParams();
  const namaTempatParam = searchParams?.get("nama") || "Taman Bungkul";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [penjelasan, setPenjelasan] = useState("");
  const [bukti, setBukti] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const options = [
    "Nama",
    "Alamat",
    "Jam buka–tutup",
    "Keramaian",
    "Parkir",
    "Fasilitas",
    "Foto",
    "Lainnya",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const togglePart = (item: string) => {
    if (selectedParts.includes(item)) {
      setSelectedParts(selectedParts.filter((p) => p !== item));
    } else {
      setSelectedParts([...selectedParts, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (selectedParts.length === 0 || !penjelasan.trim()) {
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
          <h1>Sarankan Perubahan</h1>
        </div>
      </div>

      <div className="w">
        <section className="s narrow">
          <AuthGate requiredRole="lari">
            {isSubmitted ? (
              <SubmissionDone />
            ) : (
              <div className="box">
                <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
                  Sarankan Perubahan Tempat Lari
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Nama Tempat (Disabled) */}
                  <div className="fg">
                    <label>Nama Tempat</label>
                    <input
                      type="text"
                      disabled
                      value={namaTempatParam}
                    />
                  </div>

                  {/* Bagian yang perlu diubah */}
                  <div className="fg">
                    <label>Bagian yang perlu diubah *</label>
                    <div className="mc">
                      {options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`chip ${selectedParts.includes(opt) ? "on" : ""}`}
                          onClick={() => togglePart(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showErrors && selectedParts.length === 0 && (
                      <div className="err" style={{ display: "block" }}>
                        Pilih minimal satu bagian yang perlu diperbaiki.
                      </div>
                    )}
                  </div>

                  {/* Penjelasan Perubahan */}
                  <div className="fg">
                    <label>Penjelasan perubahan *</label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan data apa yang keliru dan apa data yang benar..."
                      value={penjelasan}
                      onChange={(e) => setPenjelasan(e.target.value)}
                    />
                    {showErrors && !penjelasan.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Bukti (opsional) */}
                  <div className="fg">
                    <label>Bukti (link atau foto, opsional)</label>
                    <input
                      type="text"
                      placeholder="Link Google Maps atau tautan bukti lain"
                      value={bukti}
                      onChange={(e) => setBukti(e.target.value)}
                    />
                  </div>

                  {/* Tombol Aksi Bawah */}
                  <div className="fbar">
                    <Link className="btn out" href="/tempat-lari">
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

export default function SaranPage() {
  return (
    <Suspense fallback={<div className="w" style={{ padding: "80px 16px", textAlign: "center" }}>Memuat...</div>}>
      <SaranContent />
    </Suspense>
  );
}
