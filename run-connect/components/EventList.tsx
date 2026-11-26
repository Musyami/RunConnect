"use client";

// components/EventList.tsx
// Satu komponen daftar terpadu untuk semua variasi halaman daftar event:
// 1. /event (Semua Event)
// 2. /event/minggu-ini (Event Minggu Ini - dikelompokkan per hari)
// 3. /event/bulan-ini (Event Bulan Ini - kalender tanpa navigasi bulan)
// 4. /event/kalender/[tahun] (Kalender tahunan dengan navigasi bulan Januari–Desember)
// Mendukung sinkronisasi filter ke URL Search Parameters dan pelacakan track().

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import BannerCarousel from "@/components/BannerCarousel";
import FilterBar, {
  EVENT_CATEGORIES,
  AREA_OPTIONS,
  DISTANCE_OPTIONS,
} from "@/components/FilterBar";
import EventCard from "@/components/EventCard";
import CalendarGrid from "@/components/CalendarGrid";
import { EmptyState } from "@/components/StateDisplay";
import { EventData, sampleBanners } from "@/data";
import { track } from "@/lib/track";

export type EventListMode = "semua" | "minggu-ini" | "bulan-ini" | "kalender";

interface EventListProps {
  initialEvents: EventData[];
  mode: EventListMode;
  year?: number;
}

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function EventList({
  initialEvents,
  mode,
  year: propYear,
}: EventListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Ambil nilai filter dari URL Search Params
  const paramJenis = searchParams.get("jenis") || "Semua";
  const paramArea = searchParams.get("area") || "Semua lokasi";
  const paramGratis = searchParams.get("gratis") === "true";
  const paramBuka = searchParams.get("buka") === "true";
  const paramJarak = searchParams.get("jarak") || "Semua jarak";

  // State kalender
  const today = useMemo(() => new Date(), []);
  const initialYear = propYear || today.getFullYear();
  const calYear = initialYear;
  const [calMonth, setCalMonth] = useState(mode === "kalender" && propYear === 2027 ? 0 : today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Pelacakan halaman saat pertama dimuat
  useEffect(() => {
    track("view_event_page", { mode, pathname });
  }, [mode, pathname]);

  // Fungsi memperbarui URL parameter secara mulus
  const updateParams = useCallback(
    (key: string, value: string | boolean) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (
        !value ||
        value === "Semua" ||
        value === "Semua lokasi" ||
        value === "Semua jarak"
      ) {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.replace(`${pathname}${query}`, { scroll: false });

      // Catat penggunaan filter
      track("use_filter", { filter: key, value });
    },
    [searchParams, pathname, router]
  );

  // Filter event sesuai kriteria aktif
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((ev) => {
      // 1. Filter Kategori (Jenis)
      if (paramJenis !== "Semua" && ev.jenis !== paramJenis) {
        return false;
      }
      // 2. Filter Area / Lokasi
      if (paramArea !== "Semua lokasi") {
        if (paramArea === "Kampus ITS") {
          if (!ev.alamat.toLowerCase().includes("its") && ev.area !== "Kampus ITS") {
            return false;
          }
        } else if (ev.area !== paramArea) {
          return false;
        }
      }
      // 3. Filter Gratis
      if (paramGratis) {
        const isFree = ev.biaya.some((b) => b.nominal === 0);
        if (!isFree) return false;
      }
      // 4. Filter Pendaftaran Dibuka
      if (paramBuka && ev.status !== "buka") {
        return false;
      }
      // 5. Filter Jarak
      if (paramJarak !== "Semua jarak") {
        const hasDistance = ev.kategori_jarak.some((k) => k.includes(paramJarak));
        if (!hasDistance) return false;
      }
      return true;
    }).sort((a, b) => new Date(a.tgl_mulai).getTime() - new Date(b.tgl_mulai).getTime());
  }, [initialEvents, paramJenis, paramArea, paramGratis, paramBuka, paramJarak]);

  // Reset semua filter
  const handleResetFilter = () => {
    router.replace(pathname, { scroll: false });
    setSelectedDay(null);
  };

  // Helper rentang tanggal minggu berjalan
  const { monday, sunday, fullWeekString } = useMemo(() => {
    const dayOfWeek = (today.getDay() + 6) % 7; // 0 = Senin, 6 = Minggu
    const mon = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek);
    const sun = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 6);

    const fmt = (d: Date) =>
      d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

    return {
      monday: mon,
      sunday: sun,
      fullWeekString: `${fmt(mon)} – ${fmt(sun)} ${sun.getFullYear()}`,
    };
  }, [today]);

  // Event khusus minggu ini (untuk mode minggu-ini)
  const weekEvents = useMemo(() => {
    return filteredEvents.filter((ev) => {
      const d = new Date(ev.tgl_mulai);
      return d >= monday && d <= new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 23, 59, 59);
    });
  }, [filteredEvents, monday, sunday]);

  // Kelompokkan per hari untuk mode minggu-ini
  const groupedWeekEvents = useMemo(() => {
    const groups: { dateString: string; dateObj: Date; items: EventData[] }[] = [];
    weekEvents.forEach((ev) => {
      const d = new Date(ev.tgl_mulai);
      const ds = d.toDateString();
      let grp = groups.find((g) => g.dateString === ds);
      if (!grp) {
        grp = { dateString: ds, dateObj: d, items: [] };
        groups.push(grp);
      }
      grp.items.push(ev);
    });
    return groups;
  }, [weekEvents]);

  // Event untuk mode bulan-ini atau kalender
  const monthEvents = useMemo(() => {
    const targetY = mode === "bulan-ini" ? today.getFullYear() : calYear;
    const targetM = mode === "bulan-ini" ? today.getMonth() : calMonth;
    return filteredEvents.filter((ev) => {
      const d = new Date(ev.tgl_mulai);
      return d.getFullYear() === targetY && d.getMonth() === targetM;
    });
  }, [filteredEvents, mode, today, calYear, calMonth]);

  // Event untuk tanggal terpilih di kalender
  const selectedDayEvents = useMemo(() => {
    if (selectedDay === null) return [];
    return monthEvents.filter((ev) => {
      return new Date(ev.tgl_mulai).getDate() === selectedDay;
    });
  }, [monthEvents, selectedDay]);

  // Render konten sesuai mode
  return (
    <main>
      {/* Banner Carousel Event */}
      <BannerCarousel slides={sampleBanners.event} />

      <div className="w">
        <section className="s">
          {/* Header Judul Halaman */}
          {mode === "semua" && (
            <h2 style={{ marginBottom: "12px" }}>Semua Event</h2>
          )}

          {mode === "minggu-ini" && (
            <>
              <h2>Jadwal event minggu ini</h2>
              <p className="mut" style={{ margin: "6px 0 14px" }}>
                {fullWeekString} · {weekEvents.length} event
              </p>
            </>
          )}

          {mode === "bulan-ini" && (
            <h2 style={{ marginBottom: "12px" }}>
              Event {MONTH_NAMES[today.getMonth()]} {today.getFullYear()}
            </h2>
          )}

          {mode === "kalender" && (
            <h2 style={{ marginBottom: "12px" }}>Kalender {calYear}</h2>
          )}

          {/* Bar Filter & Chip (Komponen Reusable) */}
          <FilterBar
            categories={EVENT_CATEGORIES}
            selectedCategory={paramJenis}
            onSelectCategory={(cat) => updateParams("jenis", cat)}
            isFree={paramGratis}
            onToggleFree={(f) => updateParams("gratis", f)}
            isOpen={paramBuka}
            onToggleOpen={(o) => updateParams("buka", o)}
            locations={AREA_OPTIONS}
            selectedLocation={paramArea}
            onSelectLocation={(l) => updateParams("area", l)}
            distances={DISTANCE_OPTIONS}
            selectedDistance={paramJarak}
            onSelectDistance={(d) => updateParams("jarak", d)}
          />

          {/* Konten Mode: Minggu Ini (tanpa kalender, dikelompokkan per hari) */}
          {mode === "minggu-ini" && (
            <>
              {groupedWeekEvents.length > 0 ? (
                groupedWeekEvents.map((grp) => (
                  <div key={grp.dateString}>
                    <h3 className="dh">
                      {grp.dateObj.toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </h3>
                    <div className="grid">
                      {grp.items.map((ev, i) => (
                        <EventCard
                          key={ev.id}
                          colorIndex={i}
                          event={{
                            id: ev.id,
                            slug: ev.slug,
                            title: ev.judul,
                            date: ev.tgl_mulai,
                            category: ev.jenis,
                            location: ev.alamat,
                            area: ev.area,
                            distances: ev.kategori_jarak.join(" · "),
                            price: ev.biaya[0]?.nominal ?? 0,
                            isOpen: ev.status === "buka",
                            isPast: ev.status === "selesai",
                            description: ev.deskripsi,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="Belum ada event minggu ini"
                  message="Coba lihat event di bulan ini atau hapus filter yang dipilih."
                  actionText="Lihat Bulan Ini"
                  onAction={() => router.push("/event/bulan-ini")}
                />
              )}
            </>
          )}

          {/* Konten Mode: Bulan Ini & Kalender Tahunan */}
          {(mode === "bulan-ini" || mode === "kalender") && (
            <>
              <CalendarGrid
                year={mode === "bulan-ini" ? today.getFullYear() : calYear}
                month={mode === "bulan-ini" ? today.getMonth() : calMonth}
                events={filteredEvents}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
                allowMonthChange={mode === "kalender"}
                onPrevMonth={() => {
                  setSelectedDay(null);
                  setCalMonth((m) => Math.max(0, m - 1));
                }}
                onNextMonth={() => {
                  setSelectedDay(null);
                  setCalMonth((m) => Math.min(11, m + 1));
                }}
              />

              {/* Bila tanggal dipilih, munculkan kartu event tanggal tersebut */}
              {selectedDay !== null ? (
                <>
                  <h3 className="dh">
                    Event tanggal {selectedDay}{" "}
                    {MONTH_NAMES[mode === "bulan-ini" ? today.getMonth() : calMonth]}{" "}
                    {mode === "bulan-ini" ? today.getFullYear() : calYear}
                  </h3>
                  {selectedDayEvents.length > 0 ? (
                    <div className="grid">
                      {selectedDayEvents.map((ev, i) => (
                        <EventCard
                          key={ev.id}
                          colorIndex={i}
                          event={{
                            id: ev.id,
                            slug: ev.slug,
                            title: ev.judul,
                            date: ev.tgl_mulai,
                            category: ev.jenis,
                            location: ev.alamat,
                            area: ev.area,
                            distances: ev.kategori_jarak.join(" · "),
                            price: ev.biaya[0]?.nominal ?? 0,
                            isOpen: ev.status === "buka",
                            isPast: ev.status === "selesai",
                            description: ev.deskripsi,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="Tidak ada event di tanggal ini"
                      message="Silakan pilih tanggal lain yang memiliki lencana angka event."
                    />
                  )}
                </>
              ) : (
                /* Jika tidak ada tanggal yang diklik, tampilkan daftar event di bulan itu */
                <>
                  {monthEvents.length > 0 ? (
                    <div className="grid">
                      {monthEvents.map((ev, i) => (
                        <EventCard
                          key={ev.id}
                          colorIndex={i}
                          event={{
                            id: ev.id,
                            slug: ev.slug,
                            title: ev.judul,
                            date: ev.tgl_mulai,
                            category: ev.jenis,
                            location: ev.alamat,
                            area: ev.area,
                            distances: ev.kategori_jarak.join(" · "),
                            price: ev.biaya[0]?.nominal ?? 0,
                            isOpen: ev.status === "buka",
                            isPast: ev.status === "selesai",
                            description: ev.deskripsi,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="Belum ada event di bulan ini"
                      message="Coba ubah atau reset filter untuk melihat event lainnya."
                      actionText="Reset Filter"
                      onAction={handleResetFilter}
                    />
                  )}
                </>
              )}
            </>
          )}

          {/* Konten Mode: Semua Event */}
          {mode === "semua" && (
            <>
              {filteredEvents.length > 0 ? (
                <div className="grid">
                  {filteredEvents.map((ev, i) => (
                    <EventCard
                      key={ev.id}
                      colorIndex={i}
                      event={{
                        id: ev.id,
                        slug: ev.slug,
                        title: ev.judul,
                        date: ev.tgl_mulai,
                        category: ev.jenis,
                        location: ev.alamat,
                        area: ev.area,
                        distances: ev.kategori_jarak.join(" · "),
                        price: ev.biaya[0]?.nominal ?? 0,
                        isOpen: ev.status === "buka",
                        isPast: ev.status === "selesai",
                        description: ev.deskripsi,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Belum ada hasil yang cocok"
                  message="Coba ubah atau hapus filter untuk menemukan event lari."
                  actionText="Reset filter"
                  onAction={handleResetFilter}
                />
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
