"use client";

// components/FormComponents.tsx
// Komponen pembantu untuk formulir pengajuan, pengecekan akses (Gate),
// tampilan pengajuan terkirim, serta input interaktif berpoin dan media sosial.

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";

// Kartu Gerbang Autentikasi (Belum Login / Peran Tidak Sesuai)
export function AuthGate({
  requiredRole,
  children,
}: {
  requiredRole: UserRole;
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const pathname = usePathname();

  // 1. Belum login sama sekali
  if (!user) {
    return (
      <div className="box lc">
        <h2>Masuk dengan Google untuk melanjutkan</h2>
        <p className="mut" style={{ margin: 0 }}>
          Kamu akan memilih peran dulu, lalu masuk dengan Google.
        </p>
        <Link
          className="btn gg"
          href={`/masuk?role=${requiredRole}&return=${pathname}`}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true" width={20} height={20}>
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
        </Link>
      </div>
    );
  }

  // 2. Login tapi peran tidak sesuai
  if (user.role !== requiredRole) {
    const roleName = requiredRole === "mitra" ? "Mitra" : "Pengguna Lari";
    return (
      <div className="box lc">
        <h2>Khusus {roleName}</h2>
        <p className="mut" style={{ margin: 0 }}>
          Fitur ini hanya untuk peran {roleName}. Masuk dengan peran yang sesuai
          untuk melanjutkan.
        </p>
        <Link
          className="btn gr"
          href={`/masuk?role=${requiredRole}&return=${pathname}`}
        >
          Masuk sebagai {roleName}
        </Link>
      </div>
    );
  }

  // 3. Peran sesuai
  return <>{children}</>;
}

// Tampilan Konfirmasi Pengajuan Terkirim
export function SubmissionDone() {
  return (
    <div className="box lc">
      <h2>Pengajuan terkirim</h2>
      <span className="lb o">Menunggu review</span>
      <p className="mut" style={{ margin: 0 }}>
        Tim kami memeriksa dulu sebelum tayang. Di prototype ini data belum
        disimpan.
      </p>
      <Link className="btn" href="/">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

// Input Daftar Berpoin (Fasilitas dan Benefit / Fasilitas Tempat)
export function PoinListInput({
  placeholder,
  items,
  onChange,
}: {
  placeholder: string;
  items: string[];
  onChange: (newItems: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number, val: string) => {
    const updated = [...items];
    updated[index] = val;
    onChange(updated);
  };

  return (
    <div className="ls">
      <div className="two1">
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <button
          type="button"
          className="btn sm"
          onClick={handleAdd}
        >
          Tambah
        </button>
      </div>
      <ul className="bl">
        {items.map((item, index) => (
          <li key={index}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEdit(index, e.currentTarget.textContent || "")}
            >
              {item}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label="Hapus poin"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Input Tambah Media Sosial Tambahan
export interface SosmedItem {
  name: string;
  link: string;
}

export function SosmedListInput({
  items,
  onChange,
}: {
  items: SosmedItem[];
  onChange: (items: SosmedItem[]) => void;
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleAdd = () => {
    if (name.trim() && link.trim()) {
      onChange([...items, { name: name.trim(), link: link.trim() }]);
      setName("");
      setLink("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="ls">
      <div className="two">
        <input
          type="text"
          placeholder="Nama media sosial"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="url"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="chip"
        style={{ marginTop: "8px" }}
        onClick={handleAdd}
      >
        + Tambah Media Sosial
      </button>
      <ul className="bl">
        {items.map((item, index) => (
          <li key={index}>
            <span>
              {item.name}: {item.link}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label="Hapus media sosial"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
