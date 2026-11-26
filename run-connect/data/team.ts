// data/team.ts
// Data tim pengembang mahasiswa Sistem Informasi ITS sesuai prototipe dan PRD.

export interface TeamMember {
  id: number;
  nama: string;
  peran: string;
  inisial: string;
  warna: string;
}

export const sampleTeam: TeamMember[] = [
  {
    id: 1,
    nama: "Joshua Gamaliel",
    peran: "Mahasiswa Sistem Informasi ITS",
    inisial: "JG",
    warna: "#1D63D8",
  },
  {
    id: 2,
    nama: "Rheynody Ezekielano L",
    peran: "Mahasiswa Sistem Informasi ITS",
    inisial: "RE",
    warna: "#E85D04",
  },
  {
    id: 3,
    nama: "Azzahra Maulin Qiromah",
    peran: "Mahasiswa Sistem Informasi ITS",
    inisial: "AM",
    warna: "#0F7A45",
  },
  {
    id: 4,
    nama: "Muhammad Rasya Islami",
    peran: "Mahasiswa Sistem Informasi ITS",
    inisial: "MR",
    warna: "#0B2E7A",
  },
];
