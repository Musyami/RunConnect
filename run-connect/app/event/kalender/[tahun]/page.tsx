import { Suspense } from "react";
import EventList from "@/components/EventList";
import { getSampleEvents } from "@/data";

interface Props {
  params: Promise<{ tahun: string }>;
}

export function generateStaticParams() {
  return [{ tahun: "2026" }, { tahun: "2027" }];
}

// Halaman Kalender per tahun (/event/kalender/[tahun])
export default async function KalenderTahunanPage({ params }: Props) {
  const { tahun } = await params;
  const yearNumber = parseInt(tahun, 10) || 2026;
  const events = getSampleEvents();

  return (
    <Suspense fallback={<div className="w s"><div className="empty">Memuat kalender...</div></div>}>
      <EventList
        initialEvents={events}
        mode="kalender"
        year={yearNumber}
      />
    </Suspense>
  );
}
