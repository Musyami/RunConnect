// data/submissions.ts
// Data contoh pengajuan mitra (Submission) sesuai prototipe Run_Connect.html baris 281

export interface SubmissionData {
  id: number;
  judul: string;
  jenis: "Event" | "Komunitas" | "Lokasi";
  status: "Menunggu review" | "Dipublikasikan" | "Ditolak";
  alasan?: string;
  tanggal_pengajuan: string;
}

export const sampleSubmissions: SubmissionData[] = [
  {
    id: 1,
    judul: "ITS Fun Run 5K",
    jenis: "Event",
    status: "Menunggu review",
    tanggal_pengajuan: "2026-11-20",
  },
  {
    id: 2,
    judul: "Pace Buddies SBY",
    jenis: "Komunitas",
    status: "Dipublikasikan",
    tanggal_pengajuan: "2026-11-15",
  },
  {
    id: 3,
    judul: "Event Contoh Lama",
    jenis: "Event",
    status: "Ditolak",
    alasan: "Poster kurang jelas",
    tanggal_pengajuan: "2026-10-28",
  },
];
