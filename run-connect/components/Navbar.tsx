"use client";

// components/Navbar.tsx
// Navbar global untuk laptop dan HP sesuai prototipe reference/Run_Connect.html
// Dilengkapi dropdown menu, panel samping untuk HP, dan tombol Daftarkan/Masuk.

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  ClipboardList,
  User,
  Bookmark,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Tipe data pengguna simulasi
export interface UserSession {
  role: "mitra" | "lari";
  name: string;
  email: string;
}

interface NavbarProps {
  user?: UserSession | null;
  onLogout?: () => void;
}

export default function Navbar({ user: propUser, onLogout: propLogout }: NavbarProps) {
  const auth = useAuth();
  const user = propUser !== undefined ? propUser : auth.user;
  const onLogout = propLogout || auth.logout;
  const pathname = usePathname();
  // State untuk panel samping HP
  const [mobileOpen, setMobileOpen] = useState(false);
  // State untuk dropdown "+ Daftarkan" (terbuka saat klik)
  const [daftarDropdownOpen, setDaftarDropdownOpen] = useState(false);
  // State untuk dropdown akun jika sudah login (terbuka saat klik)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const daftarRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Menutup panel samping dan dropdown saat berpindah rute
  useEffect(() => {
    setMobileOpen(false);
    setDaftarDropdownOpen(false);
    setAccountDropdownOpen(false);
  }, [pathname]);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (daftarRef.current && !daftarRef.current.contains(target)) {
        setDaftarDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setDaftarDropdownOpen(false);
        setAccountDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Menentukan tab aktif berdasarkan URL saat ini
  const isEventActive =
    pathname.startsWith("/event");
  const isDirektoriActive =
    pathname.startsWith("/komunitas") || pathname.startsWith("/tempat-lari");
  const isBlogActive = pathname.startsWith("/blog");
  const isTentangActive = pathname === "/tentang";
  const isBerandaActive = pathname === "/";

  // Inisial avatar pengguna
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <nav>
        <div className="w">
          {/* Logo Run Connect */}
          <Link href="/" className="logo">
            <span className="lgl">
              <Image
                src="/brand/run-connect-logo.svg"
                alt="Run Connect"
                width={36}
                height={36}
                priority
              />
            </span>
            Run Connect
          </Link>

          {/* Menu Navigasi Laptop */}
          <div className="menu">
            {/* Beranda */}
            <div className={`mi ${isBerandaActive ? "on" : ""}`}>
              <Link href="/">Beranda</Link>
            </div>

            {/* Event (Dropdown hover/fokus) */}
            <div className={`mi ${isEventActive ? "on" : ""}`}>
              <span tabIndex={0}>Event ▾</span>
              <div className="dd">
                <Link href="/event">Semua Event</Link>
                <Link href="/event/minggu-ini">Minggu Ini</Link>
                <Link href="/event/bulan-ini">Bulan Ini</Link>
                <Link href="/event/kalender/2026">Kalender 2026</Link>
                <Link href="/event/kalender/2027">Kalender 2027</Link>
              </div>
            </div>

            {/* Direktori (Dropdown hover/fokus) */}
            <div className={`mi ${isDirektoriActive ? "on" : ""}`}>
              <span tabIndex={0}>Direktori ▾</span>
              <div className="dd">
                <Link href="/komunitas">Komunitas Lari</Link>
                <Link href="/tempat-lari">Tempat Lari</Link>
              </div>
            </div>

            {/* Blog */}
            <div className={`mi ${isBlogActive ? "on" : ""}`}>
              <Link href="/blog">Blog</Link>
            </div>

            {/* Tentang */}
            <div className={`mi ${isTentangActive ? "on" : ""}`}>
              <Link href="/tentang">Tentang</Link>
            </div>
          </div>

          {/* Bagian Kanan Laptop (Daftarkan + Masuk / Akun) */}
          <div className="nr">
            {/* Tombol + Daftarkan (Terbuka saat KLIK) */}
            <div className={`rg ${daftarDropdownOpen ? "open" : ""}`} ref={daftarRef}>
              <button
                type="button"
                className="btn sm"
                onClick={() => setDaftarDropdownOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={daftarDropdownOpen}
              >
                + Daftarkan ▾
              </button>
              <div className="dd">
                <Link href="/daftar/event">Event Lari</Link>
                <Link href="/daftar/komunitas">Komunitas Lari</Link>
                <Link href="/daftar/lokasi">Lokasi Lari</Link>
              </div>
            </div>

            {/* Status Akun: Belum Login vs Sudah Login */}
            {user ? (
              <div className={`rg ${accountDropdownOpen ? "open" : ""}`} ref={accountRef}>
                <button
                  type="button"
                  className="acb"
                  onClick={() => setAccountDropdownOpen((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={accountDropdownOpen}
                >
                  <span className="av">{initial}</span>
                  <span className="n">{user.name}</span> ▾
                </button>
                <div className="dd" style={{ minWidth: "260px" }}>
                  {/* Info profil pengguna */}
                  <div className="pf">
                    <span className="av">{initial}</span>
                    <div>
                      <b>{user.name}</b>
                      <small>{user.email}</small>
                      <small>
                        {user.role === "mitra" ? "Mitra" : "Pengguna Lari"}
                      </small>
                    </div>
                  </div>

                  {/* Menu sesuai peran */}
                  {user.role === "mitra" ? (
                    <>
                      <Link href="/mitra">
                        <LayoutDashboard size={18} aria-hidden="true" />
                        Dashboard Mitra
                      </Link>
                      <Link href="/mitra/submit">
                        <Upload size={18} aria-hidden="true" />
                        Submit
                      </Link>
                      <Link href="/mitra/submission">
                        <ClipboardList size={18} aria-hidden="true" />
                        Submission
                      </Link>
                      <Link href="/mitra/profil">
                        <User size={18} aria-hidden="true" />
                        Profil
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/akun/disimpan">
                        <Bookmark size={18} aria-hidden="true" />
                        Disimpan
                      </Link>
                      <Link href="/akun/profil">
                        <User size={18} aria-hidden="true" />
                        Profil
                      </Link>
                    </>
                  )}

                  {/* Tombol Keluar */}
                  <button
                    type="button"
                    className="lo"
                    style={{
                      width: "100%",
                      border: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    <LogOut size={18} aria-hidden="true" />
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/masuk" className="btn sm wh">
                Masuk
              </Link>
            )}
          </div>

          {/* Tombol Hamburger HP */}
          <button
            type="button"
            className="burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Lapisan Gelap HP (Overlay) */}
      <div
        id="ov"
        className={mobileOpen ? "open" : ""}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel Navigasi Samping HP */}
      <aside
        id="panel"
        className={mobileOpen ? "open" : ""}
        aria-label="Menu navigasi"
      >
        <button
          type="button"
          className="px"
          onClick={() => setMobileOpen(false)}
          aria-label="Tutup menu"
        >
          ✕
        </button>
        <div style={{ clear: "both" }} />

        {/* Menu Beranda */}
        <Link href="/" className="l">
          Beranda
        </Link>

        {/* Menu Event */}
        <details>
          <summary>Event ▾</summary>
          <div>
            <Link href="/event">Semua Event</Link>
            <Link href="/event/minggu-ini">Minggu Ini</Link>
            <Link href="/event/bulan-ini">Bulan Ini</Link>
            <Link href="/event/kalender/2026">Kalender 2026</Link>
            <Link href="/event/kalender/2027">Kalender 2027</Link>
          </div>
        </details>

        {/* Menu Direktori */}
        <details>
          <summary>Direktori ▾</summary>
          <div>
            <Link href="/komunitas">Komunitas Lari</Link>
            <Link href="/tempat-lari">Tempat Lari</Link>
          </div>
        </details>

        {/* Menu Blog */}
        <Link href="/blog" className="l">
          Blog
        </Link>

        {/* Menu Tentang */}
        <Link href="/tentang" className="l">
          Tentang
        </Link>

        {/* Menu Daftarkan */}
        <details>
          <summary>+ Daftarkan ▾</summary>
          <div>
            <Link href="/daftar/event">Event Lari</Link>
            <Link href="/daftar/komunitas">Komunitas Lari</Link>
            <Link href="/daftar/lokasi">Lokasi Lari</Link>
          </div>
        </details>

        {/* Bagian Akun / Masuk di HP */}
        {user ? (
          <>
            <details open style={{ marginTop: "12px" }}>
              <summary>{user.name}</summary>
              <div className="pf">
                <span className="av">{initial}</span>
                <div>
                  <b>{user.name}</b>
                  <small>{user.email}</small>
                  <small>
                    {user.role === "mitra" ? "Mitra" : "Pengguna Lari"}
                  </small>
                </div>
              </div>
              {user.role === "mitra" ? (
                <>
                  <Link href="/mitra">Dashboard Mitra</Link>
                  <Link href="/mitra/submit">Submit</Link>
                  <Link href="/mitra/submission">Submission</Link>
                  <Link href="/mitra/profil">Profil</Link>
                </>
              ) : (
                <>
                  <Link href="/akun/disimpan">Disimpan</Link>
                  <Link href="/akun/profil">Profil</Link>
                </>
              )}
            </details>
            <button
              type="button"
              className="lo l"
              style={{
                width: "100%",
                border: 0,
                cursor: "pointer",
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onClick={() => {
                setMobileOpen(false);
                if (onLogout) onLogout();
              }}
            >
              <LogOut size={18} aria-hidden="true" />
              Keluar
            </button>
          </>
        ) : (
          <Link href="/masuk" className="btn">
            Masuk
          </Link>
        )}
      </aside>
    </>
  );
}
