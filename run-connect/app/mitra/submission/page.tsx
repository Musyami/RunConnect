"use client";

// app/mitra/submission/page.tsx
// Halaman Submission Mitra sesuai prototipe reference/Run_Connect.html baris 317 dan PRD.
// Memuat tab saringan (Semua, Event, Komunitas), daftar status pengajuan, tombol Ubah dan Laporkan Koreksi Data.

import React, { useState } from "react";
import Link from "next/link";
import MitraHeader from "@/components/MitraHeader";
import { AuthGate } from "@/components/FormComponents";
import { sampleSubmissions } from "@/data";

export default function MitraSubmissionPage() {
  const [activeTab, setActiveTab] = useState<"Semua" | "Event" | "Komunitas">("Semua");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const filteredSubmissions = sampleSubmissions.filter(
    (item) => activeTab === "Semua" || item.jenis === activeTab
  );

  const getStatusBadge = (status: string) => {
    if (status === "Dipublikasikan") return <span className="lb g">Dipublikasikan</span>;
    if (status === "Menunggu review") return <span className="lb o">Menunggu review</span>;
    return <span className="lb x">Ditolak</span>;
  };

  return (
    <main>
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      <MitraHeader />

      <div className="w">
        <section className="s">
          <AuthGate requiredRole="mitra">
            <h2 style={{ marginBottom: "12px" }}>Submission</h2>

            {/* Chip Saringan Tab */}
            <div className="chips" style={{ marginBottom: "16px" }}>
              {(["Semua", "Event", "Komunitas"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`chip ${activeTab === tab ? "on" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Daftar Pengajuan */}
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="box"
                  style={{
                    marginBottom: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <b>{sub.judul}</b> <span className="loc">{sub.jenis}</span>
                    <div style={{ marginTop: "6px" }}>
                      {getStatusBadge(sub.status)}
                      {sub.alasan && (
                        <span className="loc" style={{ marginLeft: "8px" }}>
                          Alasan: {sub.alasan}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="btn out sm"
                      onClick={() => showToast("Membuka formulir ubah")}
                    >
                      Ubah
                    </button>
                    <Link className="btn out sm" href="/koreksi">
                      Laporkan Koreksi Data
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">
                <h3>0 item ditemukan</h3>
              </div>
            )}
          </AuthGate>
        </section>
      </div>
    </main>
  );
}
