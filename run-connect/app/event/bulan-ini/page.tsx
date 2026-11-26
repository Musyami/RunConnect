import { Suspense } from "react";
import EventList from "@/components/EventList";
import { getSampleEvents } from "@/data";

// Halaman Event Bulan Ini (/event/bulan-ini)
export default function BulanIniPage() {
  const events = getSampleEvents();

  return (
    <Suspense fallback={<div className="w s"><div className="empty">Memuat event bulan ini...</div></div>}>
      <EventList initialEvents={events} mode="bulan-ini" />
    </Suspense>
  );
}
