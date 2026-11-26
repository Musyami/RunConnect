"use client";

// SplashScreen: tampil 5 detik saat pertama kali buka browser dalam satu sesi.
// Setelah 5 detik, fade out lalu hilang. Tidak muncul lagi sampai browser ditutup.
// Desain: latar gradasi biru, kotak oranye berisi logo sepatu, progress bar oranye.
// Sesuai prototipe baris 95-101 dan baris 369-370.

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  // "visible": apakah splash masih ditampilkan
  // "fading": apakah sedang dalam proses fade out
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Cek apakah splash sudah ditampilkan di sesi ini
    // Dibungkus try/catch karena sessionStorage bisa gagal (mode privat, dll)
    try {
      if (sessionStorage.getItem("rc-sp")) {
        // Sudah pernah tampil di sesi ini, langsung skip
        return;
      }
      // Tandai bahwa splash sudah ditampilkan di sesi ini
      sessionStorage.setItem("rc-sp", "1");
    } catch {
      // Kalau sessionStorage gagal, tetap tampilkan splash
    }

    // Tampilkan splash
    setVisible(true);

    // Mulai fade out setelah 5 detik
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 5000);

    // Sembunyikan total setelah 5.6 detik (5 detik + 0.6 detik transisi)
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Kalau tidak perlu ditampilkan, return null (tidak render apapun)
  if (!visible) return null;

  return (
    <div
      id="sp"
      className={fading ? "out" : ""}
      role="status"
      aria-label="Memuat Run Connect"
    >
      {/* Kotak oranye berisi logo sepatu */}
      <div className="lgbox">
        <Image
          src="/brand/run-connect-shoe-white.svg"
          alt="Logo Run Connect"
          width={58}
          height={62}
          priority
        />
      </div>

      {/* Progress bar dengan sepatu bergerak */}
      <div className="spb">
        {/* Sepatu bergerak dari kiri ke kanan */}
        <div className="sh" aria-hidden="true">
          <Image
            src="/brand/run-connect-shoe-white.svg"
            alt=""
            width={22}
            height={24}
          />
        </div>
        {/* Jalur progress bar */}
        <div className="t0">
          <div className="fi" />
        </div>
      </div>

      {/* Teks nama brand */}
      <p
        style={{
          color: "#fff",
          font: "700 20px 'Plus Jakarta Sans'",
          margin: 0,
        }}
      >
        Run Connect
      </p>
    </div>
  );
}
