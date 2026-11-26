// components/Footer.tsx
// Footer global dengan gradasi hijau dan ilustrasi lintasan lari SVG di atasnya
// Sesuai prototipe reference/Run_Connect.html baris 179-180 dan baris 342

import Link from "next/link";
import SocialButton from "@/components/SocialButton";

export default function Footer() {
  return (
    <>
      {/* Ilustrasi lintasan lari SVG di atas footer */}
      <svg
        className="tr"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 40 C240 100 420 0 720 40 S1200 90 1440 30 L1440 110 L0 110Z"
          fill="#0F7A45"
        />
        <path
          d="M0 42 C240 102 420 2 720 42 S1200 92 1440 32"
          stroke="#E85D04"
          strokeWidth="22"
          fill="none"
        />
        <path
          d="M0 42 C240 102 420 2 720 42 S1200 92 1440 32"
          stroke="#fff"
          strokeWidth="2"
          strokeDasharray="14 12"
          fill="none"
        />
      </svg>

      {/* Bagian utama footer */}
      <footer id="ft">
        <div className="w">
          {/* Kolom 1: Tentang Run Connect */}
          <div>
            <h3>Run Connect</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Event, komunitas, dan tempat lari di Surabaya dalam satu tempat.
            </p>
          </div>

          {/* Kolom 2: Menu cepat */}
          <div>
            <h3>Menu cepat</h3>
            <Link href="/event">Semua Event</Link>
            <Link href="/komunitas">Komunitas</Link>
            <Link href="/tempat-lari">Tempat Lari</Link>
            <Link href="/blog">Blog</Link>
          </div>

          {/* Kolom 3: Daftarkan */}
          <div>
            <h3>Daftarkan</h3>
            <Link href="/daftar/event">Event Lari</Link>
            <Link href="/daftar/komunitas">Komunitas Lari</Link>
            <Link href="/daftar/lokasi">Lokasi Lari</Link>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h3>Kontak</h3>
            <div className="sbr" style={{ margin: 0 }}>
              <SocialButton
                type="ig"
                text="Instagram"
                href="https://instagram.com"
              />
              <SocialButton
                type="wa"
                text="WhatsApp"
                href="https://wa.me"
              />
              <SocialButton
                type="ml"
                text="Email"
                href="mailto:halo@runconnect.id"
              />
            </div>
          </div>

          {/* Hak Cipta paling bawah rata tengah */}
          <div className="cp">
            © 2026 Run Connect · Proyek mahasiswa Sistem Informasi ITS
          </div>
        </div>
      </footer>
    </>
  );
}
