import { Suspense } from "react";
import EventList from "@/components/EventList";
import { getSampleEvents } from "@/data";

// Halaman Event Minggu Ini (/event/minggu-ini)
export default function MingguIniPage() {
  const events = getSampleEvents();

  return (
    <Suspense fallback={<div className="w s"><div className="empty">Memuat event minggu ini...</div></div>}>
      <EventList initialEvents={events} mode="minggu-ini" />
    </Suspense>
  );
}
