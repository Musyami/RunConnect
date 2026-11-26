"use client";

// app/mitra/profil/page.tsx
// Halaman Profil Mitra sesuai prototipe reference/Run_Connect.html baris 318 dan PRD.

import React, { useState } from "react";
import Link from "next/link";
import MitraHeader from "@/components/MitraHeader";
import { AuthGate } from "@/components/FormComponents";
import { useAuth } from "@/context/AuthContext";

export default function MitraProfilPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Darren Pratama");
  const [wa, setWa] = useState("081234567890");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Perubahan disimpan");
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
        <section className="s narrow">
          <AuthGate requiredRole="mitra">
            <h2 style={{ marginBottom: "16px" }}>Profil</h2>

            <div className="box narrow" style={{ margin: 0 }}>
              <form onSubmit={handleSave}>
                {/* Nama Lengkap */}
                <div className="fg">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email Google (Disabled) */}
                <div className="fg">
                  <label>Email (dari Google)</label>
                  <input
                    type="email"
                    value={user?.email || "darren@contoh.id"}
                    disabled
                  />
                </div>

                {/* Nomor WhatsApp */}
                <div className="fg">
                  <label>Nomor WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                  />
                </div>

                {/* Tombol Aksi Bawah */}
                <div className="fbar">
                  <Link className="btn out" href="/mitra">
                    Batal
                  </Link>
                  <button type="submit" className="btn">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </AuthGate>
        </section>
      </div>
    </main>
  );
}
