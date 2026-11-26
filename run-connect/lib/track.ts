// lib/track.ts
// Fungsi pelacakan pengunjung anonim.
// Saat ini hanya mencatat ke konsol — belum ada layanan analitik sungguhan.
// Sesuai AGENTS.md: event yang dilacak: view_event_page, use_filter, click_register_link.

// Buat atau ambil ID pengunjung anonim yang disimpan di localStorage
function getVisitorId(): string {
  try {
    const key = "rc-vid";
    let id = localStorage.getItem(key);
    if (!id) {
      // Buat ID acak baru (16 karakter hex)
      id = Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    // localStorage tidak tersedia (mode privat, dll) — pakai ID sementara
    return "anonymous";
  }
}

// Tipe event yang diizinkan (sesuai AGENTS.md)
type TrackEvent =
  | "view_event_page"
  | "use_filter"
  | "click_register_link";

// Fungsi utama pelacakan
// eventName: nama event, metadata: data tambahan (opsional)
export function track(eventName: TrackEvent, metadata?: Record<string, unknown>): void {
  const visitorId = getVisitorId();
  // Hanya catat ke konsol untuk Tahap 1
  console.log("[RC Track]", {
    event: eventName,
    visitorId,
    timestamp: new Date().toISOString(),
    ...metadata,
  });
}
