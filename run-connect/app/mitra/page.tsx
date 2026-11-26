"use client";

// app/mitra/page.tsx
// Halaman Dashboard Mitra sesuai prototipe reference/Run_Connect.html baris 315 dan PRD.

import React from "react";
import Link from "next/link";
import MitraHeader from "@/components/MitraHeader";
import { AuthGate } from "@/components/FormComponents";
import EventCard from "@/components/EventCard";
import { useAuth } from "@/context/AuthContext";
import { sampleEvents } from "@/data";

export default function DashboardMitraPage() {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "Mitra";

  // Event milik mitra (data contoh 2 event pertama)
  const myEvents = sampleEvents.slice(0, 2);

  return (
    <main>
      <MitraHeader />

      <div className="w">
        <section className="s">
          <AuthGate requiredRole="mitra">
            {/* Header Sapaan dan Tombol Kirim Event Baru */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <h2>Selamat datang kembali, {firstName}</h2>
              <Link className="btn" href="/daftar/event">
                Kirim Event Baru
              </Link>
            </div>

            {/* Statistik Ringkas */}
            <div className="sc">
              <div>
                <b>3</b>
                <span>Total pengajuan</span>
              </div>
              <div>
                <b>1</b>
                <span>Menunggu review</span>
              </div>
              <div>
                <b>1</b>
                <span>Dipublikasikan</span>
              </div>
            </div>

            {/* Daftar Event Saya */}
            <h3 style={{ margin: "28px 0 12px" }}>Event Saya</h3>

            {myEvents.length > 0 ? (
              <div className="grid">
                {myEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h3>Belum ada event. Kirim event pertamamu sekarang</h3>
                <Link className="btn" href="/daftar/event" style={{ marginTop: "12px" }}>
                  Kirim Event Baru
                </Link>
              </div>
            )}
          </AuthGate>
        </section>
      </div>
    </main>
  );
}
