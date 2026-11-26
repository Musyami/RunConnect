// components/StateDisplay.tsx
// Tampilan 3 keadaan daftar sesuai AGENTS.md:
// 1. Memuat (kerangka abu-abu / skeleton)
// 2. Kosong (pesan tidak ada data + tombol aksi)
// 3. Gagal (pesan gagal + tombol coba lagi)

import React from "react";

// Keadaan 1: Memuat (Kerangka abu-abu / Skeleton)
export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card" style={{ cursor: "default" }}>
          {/* Skeleton poster / gambar */}
          <div
            className="skeleton"
            style={{
              aspectRatio: "4/3",
              borderRadius: "16px 16px 0 0",
            }}
          />
          {/* Skeleton teks isi */}
          <div className="cb" style={{ gap: "12px", padding: "16px" }}>
            <div
              className="skeleton"
              style={{ height: "24px", width: "40%", borderRadius: "999px" }}
            />
            <div
              className="skeleton"
              style={{ height: "20px", width: "75%", borderRadius: "6px" }}
            />
            <div
              className="skeleton"
              style={{ height: "16px", width: "90%", borderRadius: "6px" }}
            />
            <div
              className="skeleton"
              style={{
                height: "36px",
                width: "120px",
                borderRadius: "999px",
                marginTop: "8px",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Keadaan 2: Kosong (Empty State)
interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "Belum ada hasil yang cocok",
  message = "Coba ubah atau hapus filter.",
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p style={{ margin: "4px 0 16px" }}>{message}</p>
      {actionText && onAction && (
        <button type="button" className="btn" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}

// Keadaan 3: Gagal (Error State)
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Gagal memuat data",
  message = "Terjadi kendala saat memuat informasi. Silakan periksa koneksi dan coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="empty">
      <h3 style={{ color: "#C62828" }}>{title}</h3>
      <p style={{ margin: "4px 0 16px" }}>{message}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Coba Lagi
        </button>
      )}
    </div>
  );
}
