"use client";

// components/CalendarGrid.tsx
// Komponen kalender event bulanan (Sen–Min) sesuai prototipe reference/Run_Connect.html baris 229-231.
// Menampilkan jumlah event per tanggal, penanda hari ini berlingkar oranye,
// dan klik tanggal untuk menampilkan kartu event tanggal tersebut di bawah kalender.

import React from "react";
import { EventData } from "@/data";

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const DAY_NAMES = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

interface CalendarGridProps {
  year: number;
  month: number; // 0-11
  events: EventData[];
  selectedDay: number | null;
  onSelectDay: (day: number | null) => void;
  allowMonthChange?: boolean;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

export default function CalendarGrid({
  year,
  month,
  events,
  selectedDay,
  onSelectDay,
  allowMonthChange = false,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) {
  const today = new Date();
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Offset hari pertama (Senin = 0, Minggu = 6)
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;

  // Hitung jumlah event per tanggal untuk bulan dan tahun ini
  const eventCounts: Record<number, number> = {};
  events.forEach((ev) => {
    const d = new Date(ev.tgl_mulai);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const dateNum = d.getDate();
      eventCounts[dateNum] = (eventCounts[dateNum] || 0) + 1;
    }
  });

  const handleDayClick = (day: number, count: number) => {
    if (count === 0) return;
    if (selectedDay === day) {
      onSelectDay(null); // Klik lagi untuk batal
    } else {
      onSelectDay(day);
    }
  };

  return (
    <div className="cal">
      {/* Header Bulan & Tombol Navigasi */}
      <div className="ch">
        {allowMonthChange ? (
          <button
            type="button"
            className="cn"
            onClick={onPrevMonth}
            disabled={month === 0}
            aria-label="Bulan sebelumnya"
          >
            ‹
          </button>
        ) : (
          <span />
        )}
        <h3>
          {MONTH_NAMES[month]} {year}
        </h3>
        {allowMonthChange ? (
          <button
            type="button"
            className="cn"
            onClick={onNextMonth}
            disabled={month === 11}
            aria-label="Bulan berikutnya"
          >
            ›
          </button>
        ) : (
          <span />
        )}
      </div>

      {/* Grid Hari dan Tanggal */}
      <div className="cg">
        {/* Nama-nama Hari (Senin - Minggu) */}
        {DAY_NAMES.map((d) => (
          <div key={d} className="dn">
            {d}
          </div>
        ))}

        {/* Kotak kosong untuk offset hari pertama */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Tanggal 1 s.d. totalDays */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const count = eventCounts[day] || 0;
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              className={`cd ${count === 0 ? "z" : ""} ${isToday ? "td" : ""} ${isSelected ? "sel" : ""}`}
              onClick={() => handleDayClick(day, count)}
              disabled={count === 0}
              aria-label={`Tanggal ${day} ${MONTH_NAMES[month]} ${year}, ${count} event`}
            >
              <span>{day}</span>
              {count > 0 && <i>{count}</i>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
