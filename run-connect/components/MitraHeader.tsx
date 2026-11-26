"use client";

// components/MitraHeader.tsx
// Header judul dan tab navigasi Dashboard Mitra sesuai prototipe Run_Connect.html baris 280

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MitraHeader() {
  const pathname = usePathname();

  const tabs = [
    { label: "Dashboard", href: "/mitra" },
    { label: "Submit", href: "/mitra/submit" },
    { label: "Submission", href: "/mitra/submission" },
    { label: "Profil", href: "/mitra/profil" },
  ];

  return (
    <div className="pg">
      <div className="w">
        <h1>Dashboard Mitra</h1>
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
