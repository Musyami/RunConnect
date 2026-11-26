// components/EventCard.tsx
// Kartu event lari sesuai prototipe reference/Run_Connect.html baris 214 & 220
// Menampilkan poster, tanggal, tag status, judul, lokasi, dan tombol selengkapnya.

import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { EventData } from "@/data/events";

export interface EventItem {
  id?: number | string;
  slug?: string;
  title: string;
  date: string | Date; // ISO string atau Date object
  category: string; // Fun Run, Marathon, dll.
  location: string;
  area: string;
  distances: string; // Mis. '5K · 10K'
  price: number; // 0 jika gratis
  isOpen: boolean; // Apakah pendaftaran masih dibuka
  isPast?: boolean; // Apakah event sudah lewat
  description?: string;
}

export function formatEventToItem(ev: EventData): EventItem {
  return {
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
  };
}

interface EventCardProps {
  event: EventItem | EventData;
  colorIndex?: number;
}

const BG_GRADIENTS = ["ph1", "ph2", "ph3", "ph4"];

export default function EventCard({ event: rawEvent, colorIndex = 0 }: EventCardProps) {
  const event: EventItem = "judul" in rawEvent ? formatEventToItem(rawEvent) : rawEvent;

  // Format tanggal: Min, 24 Nov 2026
  const dateObj = typeof event.date === "string" ? new Date(event.date) : event.date;
  const daysShort = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const monthsShort = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];

  const formattedDate = !isNaN(dateObj.getTime())
    ? `${daysShort[dateObj.getDay()]}, ${dateObj.getDate()} ${monthsShort[dateObj.getMonth()]} ${dateObj.getFullYear()}`
    : String(event.date);

  const href = event.slug ? `/event/${event.slug}` : `/event/${event.id ?? 1}`;
  const bgClass = BG_GRADIENTS[colorIndex % BG_GRADIENTS.length];

  return (
    <article className="card">
      <Link href={href} style={{ color: "inherit", display: "contents" }}>
        {/* Poster Event (rasio 4:5) */}
        <div
          className={`poster ${bgClass}`}
          role="img"
          aria-label={`Poster ${event.title}`}
        >
          🏁
        </div>

        {/* Konten Kartu */}
        <div className="cb">
          {/* Badge Tanggal */}
          <span className="dp">
            <Calendar size={14} aria-hidden="true" />
            {formattedDate}
          </span>

          {/* Label Status & Kategori */}
          <div>
            <span className="lb">{event.category}</span>
            {event.price === 0 && <span className="lb g">Gratis</span>}
            {event.isPast ? (
              <span className="lb x">Selesai</span>
            ) : event.isOpen ? (
              <span className="lb g">Pendaftaran dibuka</span>
            ) : null}
          </div>

          {/* Judul Event */}
          <h3>{event.title}</h3>

          {/* Lokasi & Deskripsi Singkat */}
          <p>
            {event.location}, {event.area}.{" "}
            {event.description ||
              "Event contoh dengan suasana santai untuk semua level pelari."}
          </p>

          {/* Tombol Aksi */}
          <span className="btn sm">Lihat Selengkapnya</span>
        </div>
      </Link>
    </article>
  );
}
