import type { Config } from "tailwindcss";

// Konfigurasi Tailwind CSS v3
// Token warna, gradasi, dan tipografi sesuai prototipe (reference/Run_Connect.html)
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- Token warna dari prototipe (Run_Connect.html baris 8-9) ---
      colors: {
        // Biru
        "b0": "#0B2E7A",   // biru tua / navbar
        "b1": "#1D63D8",   // biru utama / link / chip aktif
        "b2": "#2F8BFF",   // biru terang
        "bl": "#E8F1FF",   // biru lembut / background chip
        // Oranye (hanya tombol aksi utama)
        "o1": "#E85D04",   // oranye tua
        "o2": "#FF9A3D",   // oranye terang
        // Hijau (status & footer)
        "g0": "#0F7A45",   // hijau tua
        "g1": "#1FA85A",   // hijau utama
        "gl": "#E3F6EA",   // hijau lembut
        // Netral
        "bg": "#F6F9FF",   // background halaman
        "card": "#FFFFFF", // background kartu
        "ln": "#E3E9F4",   // garis pemisah
        "tx": "#0F1B33",   // teks utama
        "tx2": "#5B6B85",  // teks sekunder / muted
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "card": "16px",
        "chip": "999px",
        "btn": "999px",
      },
      boxShadow: {
        "card": "0 4px 16px rgba(15,27,51,0.08)",
        "card-hover": "0 10px 28px rgba(15,27,51,0.14)",
      },
      backgroundImage: {
        "nav-blue": "linear-gradient(90deg, #0B2E7A 0%, #1D63D8 60%, #2F8BFF 100%)",
        "btn-orange": "linear-gradient(135deg, #FF9A3D, #E85D04)",
        "btn-green": "linear-gradient(135deg, #34C77B, #0F7A45)",
        "btn-blue": "linear-gradient(135deg, #1D63D8, #0B2E7A)",
        "footer-green": "linear-gradient(180deg, #0F7A45, #0A5A33)",
        "splash-blue": "linear-gradient(160deg, #0B2E7A, #1D63D8 60%, #2F8BFF)",
        "splash-bar": "linear-gradient(90deg, #FF9A3D, #E85D04)",
        "ph1": "linear-gradient(135deg, #1D63D8, #2F8BFF)",
        "ph2": "linear-gradient(135deg, #0F7A45, #34C77B)",
        "ph3": "linear-gradient(135deg, #E85D04, #FF9A3D)",
        "ph4": "linear-gradient(135deg, #0B2E7A, #1D63D8)",
      },
      maxWidth: {
        "content": "1200px",
        "narrow": "760px",
      },
    },
  },
  plugins: [],
};

export default config;
