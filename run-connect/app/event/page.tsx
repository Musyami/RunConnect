import { Suspense } from "react";
import EventList from "@/components/EventList";
import { getSampleEvents } from "@/data";

// Halaman Semua Event (/event)
export default function SemuaEventPage() {
  const events = getSampleEvents();

  return (
    <Suspense fallback={<div className="w s"><div className="empty">Memuat event...</div></div>}>
      <EventList initialEvents={events} mode="semua" />
    </Suspense>
  );
}
