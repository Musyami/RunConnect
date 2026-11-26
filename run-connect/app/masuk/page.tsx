"use client";

// app/masuk/page.tsx
// Halaman Masuk dengan Google simulasi sesuai prototipe reference/Run_Connect.html baris 312 dan PRD.
// Langkah 1: Pilih peran (Sebagai Mitra atau Sebagai Pengguna Lari)
// Langkah 2: Tombol putih pil Masuk dengan Google (logo Google 4 warna)

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";

function MasukContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, returnUrl } = useAuth();

  // Ambil peran default dari URL query jika ada (?role=mitra atau ?role=lari)
  const initialRole = (searchParams?.get("role") as UserRole) || null;
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialRole);

  const handleGoogleLogin = () => {
    if (!selectedRole) return;

    // Login simulasi
    login(selectedRole);

    // Cek target redirect
    const returnTarget = searchParams?.get("return") || returnUrl;
    if (returnTarget && returnTarget !== "/masuk" && returnTarget !== "/") {
      router.push(returnTarget);
    } else {
      // Default: Mitra ke Dashboard Mitra, Pengguna Lari ke Disimpan
      if (selectedRole === "mitra") {
        router.push("/mitra");
      } else {
        router.push("/akun/disimpan");
      }
    }
  };

  return (
    <main>
      {/* Header Halaman Masuk */}
      <div className="pg">
        <div className="w">
          <h1>Masuk</h1>
        </div>
      </div>

      <div className="w">
        <section className="s narrow">
          {/* Langkah 1: Pilih Peran */}
          <h2 style={{ marginBottom: "6px" }}>1. Pilih peran</h2>
          <p className="mut" style={{ marginTop: 0 }}>
            Satu akun Google bisa dipakai untuk kedua peran. Peran dipilih setiap kali masuk.
          </p>

          <div className="rolec">
            {/* Kartu Sebagai Mitra */}
            <button
              type="button"
              className={`role ${selectedRole === "mitra" ? "on" : ""}`}
              onClick={() => setSelectedRole("mitra")}
            >
              <span className="ic">🏢</span>
              <h3>Sebagai Mitra</h3>
              <span className="mut">Penyelenggara event dan komunitas</span>
            </button>

            {/* Kartu Sebagai Pengguna Lari */}
            <button
              type="button"
              className={`role ${selectedRole === "lari" ? "on" : ""}`}
              onClick={() => setSelectedRole("lari")}
            >
              <span className="ic">🏃‍♂️</span>
              <h3>Sebagai Pengguna Lari</h3>
              <span className="mut">Simpan event dan kirim lokasi lari</span>
            </button>
          </div>

          {/* Langkah 2: Masuk dengan Google */}
          {selectedRole && (
            <div className="box lc" style={{ marginTop: "20px" }}>
              <h2 style={{ fontSize: "20px" }}>
                2. Masuk sebagai {selectedRole === "mitra" ? "Mitra" : "Pengguna Lari"}
              </h2>
              <button
                type="button"
                className="btn gg"
                onClick={handleGoogleLogin}
              >
                <svg
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  width={20}
                  height={20}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.400 2.600 13.200l7.900 6.100C12.400 13.600 17.700 9.500 24 9.500z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.500 24.500c0-1.600-.1-3.100-.4-4.500H24v9h12.700c-.6 3-2.200 5.500-4.700 7.200l7.500 5.800c4.400-4.100 7-10.100 7-17.500z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.500 28.700c-.5-1.500-.8-3-.8-4.700s.3-3.200.8-4.700l-7.900-6.100C.9 16.400 0 20.100 0 24s.9 7.600 2.600 10.800l7.900-6.100z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.500-5.800c-2.100 1.400-4.800 2.300-8.400 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z"
                  />
                </svg>
                Masuk dengan Google
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function MasukPage() {
  return (
    <Suspense fallback={<div className="w" style={{ padding: "80px 16px", textAlign: "center" }}>Memuat...</div>}>
      <MasukContent />
    </Suspense>
  );
}
