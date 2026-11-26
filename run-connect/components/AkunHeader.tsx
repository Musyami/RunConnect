"use client";

// components/AkunHeader.tsx
// Header judul dan tab navigasi Akun Saya (Pengguna Lari) sesuai prototipe Run_Connect.html baris 280

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AkunHeader() {
  const pathname = usePathname();

  const tabs = [
    { label: "Disimpan", href: "/akun/disimpan" },
    { label: "Profil", href: "/akun/profil" },
  ];

  return (
    <div className="pg">
      <div className="w">
        <h1>Akun Saya</h1>
        <div className="tabs">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                className={isActive ? "on" : ""}
                href={tab.href}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
