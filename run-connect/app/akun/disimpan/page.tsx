"use client";

// app/akun/disimpan/page.tsx
// Halaman Event Disimpan (khusus Pengguna Lari) sesuai prototipe reference/Run_Connect.html baris 319 dan PRD.

import React from "react";
import Link from "next/link";
import AkunHeader from "@/components/AkunHeader";
import { AuthGate } from "@/components/FormComponents";
import EventCard from "@/components/EventCard";
import { useAuth } from "@/context/AuthContext";
import { sampleEvents } from "@/data";

export default function AkunDisimpanPage() {
  const { savedEventIds } = useAuth();

  // Ambil event yang ID-nya ada di daftar tersimpan
  const savedEvents = sampleEvents.filter((event) =>
    savedEventIds.includes(event.id)
  );

  return (
    <main>
      <AkunHeader />

      <div className="w">
        <section className="s">
          <AuthGate requiredRole="lari">
            <h2 style={{ marginBottom: "16px" }}>Disimpan</h2>

            {savedEvents.length > 0 ? (
              <div className="grid">
                {savedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h3>Belum ada event tersimpan</h3>
                <p>Ketuk ikon simpan di halaman event.</p>
                <Link className="btn" href="/event" style={{ marginTop: "12px" }}>
                  Lihat Event
                </Link>
              </div>
            )}
          </AuthGate>
        </section>
      </div>
    </main>
  );
}
