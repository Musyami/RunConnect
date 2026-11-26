// data/faq.ts
// Data contoh Pertanyaan Umum (FAQ) sesuai prototipe reference/Run_Connect.html baris 207 dan PRD.

export interface FAQItem {
  id: number;
  pertanyaan: string;
  jawaban: string;
}

export const sampleFAQ: FAQItem[] = [
  {
    id: 1,
    pertanyaan: "Apa itu Run Connect?",
    jawaban:
      "Run Connect adalah website yang mengumpulkan jadwal event lari, profil dan jadwal latihan komunitas, serta peta tempat lari di Surabaya dalam satu platform terpadu.",
  },
  {
    id: 2,
    pertanyaan: "Apakah gratis dipakai?",
    jawaban:
      "Ya. Menjelajah informasi, mencari komunitas, melihat peta, dan mengajukan data kegiatan sepenuhnya gratis untuk saat ini.",
  },
  {
    id: 3,
    pertanyaan: "Bagaimana cara mendaftar ke sebuah event?",
    jawaban:
      "Buka halaman detail event yang kamu minati, lalu klik tombol 'Daftar di situs penyelenggara' untuk menuju tautan pendaftaran resmi milik penyelenggara event tersebut.",
  },
  {
    id: 4,
    pertanyaan: "Bagaimana mendaftarkan event, komunitas, atau tempat lari?",
    jawaban:
      "Klik tombol '+ Daftarkan' di navigasi atas, pilih jenis yang ingin didaftarkan, lalu masuk dengan akun Google sesuai peran (Mitra untuk event/komunitas, Pengguna Lari untuk tempat lari), kemudian lengkapi formulirnya.",
  },
  {
    id: 5,
    pertanyaan: "Apakah data diperiksa sebelum tayang?",
    jawaban:
      "Ya. Setiap formulir pengajuan akan diperiksa terlebih dahulu oleh tim Run Connect untuk memastikan kejelasan informasi sebelum dipublikasikan.",
  },
  {
    id: 6,
    pertanyaan: "Ada data yang salah, bagaimana melaporkannya?",
    jawaban:
      "Penyelenggara dan mitra dapat melaporkan koreksi melalui tombol 'Laporkan Koreksi Data' di halaman Submission. Untuk tempat lari, pengunjung dapat menggunakan tombol 'Sarankan Perubahan' yang tersedia di peta.",
  },
];
