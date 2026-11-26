"use client";

// app/akun/profil/page.tsx
// Halaman Profil Pengguna Lari sesuai prototipe reference/Run_Connect.html baris 320-321 dan PRD.

import React, { useState } from "react";
import AkunHeader from "@/components/AkunHeader";
import { AuthGate } from "@/components/FormComponents";
import { useAuth } from "@/context/AuthContext";

export default function AkunProfilPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Darren Pratama");
  const [wa, setWa] = useState("");
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

      <AkunHeader />

      <div className="w">
        <section className="s narrow">
          <AuthGate requiredRole="lari">
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

                {/* Nomor WhatsApp (opsional) */}
                <div className="fg">
                  <label>Nomor WhatsApp (opsional)</label>
                  <input
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                  />
                </div>

                {/* Tombol Simpan Perubahan */}
                <div className="fbar">
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
