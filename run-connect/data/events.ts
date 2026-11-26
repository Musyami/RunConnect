// data/events.ts
// Data contoh event lari fiktif sesuai spesifikasi PRD bagian Data Contoh.
// Tanggal dibuat dinamis relatif terhadap hari ini agar "minggu ini" dan "bulan ini" selalu terisi.

export interface EventData {
  id: number;
  slug: string;
  judul: string;
  deskripsi: string;
  poster: string; // nama kelas warna atau path gambar
  organizer: string;
  jenis: "Fun Run" | "Marathon" | "Half Marathon" | "Trail Run" | "Ultra Marathon";
  benefit: string[];
  kontak: {
    whatsapp?: string;
    instagram?: string;
    tiktok?: string;
    sosmed_lain?: { name: string; url: string }[];
  };
  tgl_buka_daftar: string; // YYYY-MM-DD
  tgl_tutup_daftar: string; // YYYY-MM-DD
  tgl_mulai: Date;
  tgl_selesai: Date;
  alamat: string;
  link_maps: string;
  area: "Surabaya Barat" | "Surabaya Timur" | "Surabaya Pusat" | "Surabaya Selatan" | "Surabaya Utara" | "Kampus ITS";
  kecamatan: string;
  kabupaten: string;
  lat: number;
  lng: number;
  kategori_jarak: string[];
  biaya: { kategori: string; nominal: number }[];
  link_daftar: string;
  link_guidebook: string | null;
  status: "buka" | "tutup" | "selesai";
}

// Fungsi bantu menambah hari dari suatu tanggal
function addDays(baseDate: Date, days: number): Date {
  const result = new Date(baseDate);
  result.setDate(result.getDate() + days);
  return result;
}

// Format YYYY-MM-DD
function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Fungsi menghasilkan daftar event contoh
export function getSampleEvents(): EventData[] {
  const now = new Date();
  // Set ke jam 06:00 pagi
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);

  // Cari hari Senin di minggu ini
  const dayOfWeek = (today.getDay() + 6) % 7; // 0 = Senin, 6 = Minggu
  const monday = addDays(today, -dayOfWeek);

  return [
    {
      id: 1,
      slug: "its-fun-run-5k",
      judul: "ITS Fun Run 5K",
      deskripsi: "Lari santai mengelilingi rute hijau Kampus ITS Sukolilo. Terbuka untuk mahasiswa, dosen, alumni, dan masyarakat umum pemula.",
      poster: "ph1",
      organizer: "ITS Running Club",
      jenis: "Fun Run",
      benefit: ["Medali Finisher Logam", "Jersey Dry-Fit Eksklusif", "Snack & Refreshment", "Dokumentasi Foto HD"],
      kontak: {
        whatsapp: "https://wa.me/6281234567801",
        instagram: "https://instagram.com/itsrunningclub",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -20)),
      tgl_tutup_daftar: toDateString(addDays(monday, 1)),
      tgl_mulai: addDays(monday, 1), // Selasa minggu ini
      tgl_selesai: addDays(monday, 1),
      alamat: "Kampus ITS, Jl. Raya ITS",
      link_maps: "https://maps.google.com/?q=-7.2819,112.7948",
      area: "Kampus ITS",
      kecamatan: "Sukolilo",
      kabupaten: "Kota Surabaya",
      lat: -7.2819,
      lng: 112.7948,
      kategori_jarak: ["5K"],
      biaya: [{ kategori: "5K", nominal: 0 }],
      link_daftar: "https://contoh-pendaftaran.id/its-fun-run",
      link_guidebook: "https://contoh-pendaftaran.id/guidebook-its.pdf",
      status: "buka",
    },
    {
      id: 2,
      slug: "surabaya-night-run",
      judul: "Surabaya Night Run",
      deskripsi: "Sensasi lari malam di bawah gemerlap lampu kota Surabaya melintasi jalur heritage Jl. Raya Darmo.",
      poster: "ph2",
      organizer: "Arek Suroboyo Run",
      jenis: "Fun Run",
      benefit: ["Glow Stick & Lampu Gelang", "Medali Finisher", "Minuman Isotonik", "Doorprize Sepatu Lari"],
      kontak: {
        whatsapp: "https://wa.me/6281234567802",
        instagram: "https://instagram.com/areksuroboyorun",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -15)),
      tgl_tutup_daftar: toDateString(addDays(monday, 4)),
      tgl_mulai: addDays(monday, 4), // Jumat minggu ini
      tgl_selesai: addDays(monday, 4),
      alamat: "Taman Bungkul, Jl. Raya Darmo",
      link_maps: "https://maps.google.com/?q=-7.2916,112.7396",
      area: "Surabaya Selatan",
      kecamatan: "Wonokromo",
      kabupaten: "Kota Surabaya",
      lat: -7.2916,
      lng: 112.7396,
      kategori_jarak: ["5K", "10K"],
      biaya: [
        { kategori: "5K", nominal: 85000 },
        { kategori: "10K", nominal: 135000 },
      ],
      link_daftar: "https://contoh-pendaftaran.id/sby-night-run",
      link_guidebook: null,
      status: "buka",
    },
    {
      id: 3,
      slug: "trail-run-putat",
      judul: "Trail Run Putat",
      deskripsi: "Tantangan jalur tanah dan tanjakan alami di kawasan Hutan Kota Putat Gede untuk penggemar trail run.",
      poster: "ph3",
      organizer: "Trail Tribe Jatim",
      jenis: "Trail Run",
      benefit: ["Medali Finisher Kayu", "Buff Trail Eksklusif", "Asuransi Peserta", "Water Station Buah Segar"],
      kontak: {
        instagram: "https://instagram.com/trailtribejatim",
        tiktok: "https://tiktok.com/@trailtribejatim",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -10)),
      tgl_tutup_daftar: toDateString(addDays(monday, 5)),
      tgl_mulai: addDays(monday, 5), // Sabtu minggu ini
      tgl_selesai: addDays(monday, 5),
      alamat: "Hutan Kota Putat Gede",
      link_maps: "https://maps.google.com/?q=-7.2751,112.7105",
      area: "Surabaya Barat",
      kecamatan: "Sukomanunggal",
      kabupaten: "Kota Surabaya",
      lat: -7.2751,
      lng: 112.7105,
      kategori_jarak: ["10K", "21K"],
      biaya: [
        { kategori: "10K", nominal: 150000 },
        { kategori: "21K", nominal: 225000 },
      ],
      link_daftar: "https://contoh-pendaftaran.id/trail-putat",
      link_guidebook: "https://contoh-pendaftaran.id/guide-putat.pdf",
      status: "buka",
    },
    {
      id: 4,
      slug: "kenjeran-half-marathon",
      judul: "Kenjeran Half Marathon",
      deskripsi: "Lari half marathon tepi pantai menyambut matahari terbit dengan pemandangan Jembatan Suroboyo.",
      poster: "ph4",
      organizer: "Kenjeran Crew",
      jenis: "Half Marathon",
      benefit: ["Jersey Finisher 21K", "Medali Logam Khusus", "Timing Chip Akurat", "Sarapan Pagi Bersama"],
      kontak: {
        whatsapp: "https://wa.me/6281234567804",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -30)),
      tgl_tutup_daftar: toDateString(addDays(monday, 6)),
      tgl_mulai: addDays(monday, 6), // Minggu ini
      tgl_selesai: addDays(monday, 6),
      alamat: "Pantai Ria Kenjeran, Jl. Sukolilo Lor",
      link_maps: "https://maps.google.com/?q=-7.2475,112.7978",
      area: "Surabaya Utara",
      kecamatan: "Bulak",
      kabupaten: "Kota Surabaya",
      lat: -7.2475,
      lng: 112.7978,
      kategori_jarak: ["21K"],
      biaya: [{ kategori: "21K", nominal: 250000 }],
      link_daftar: "https://contoh-pendaftaran.id/kenjeran-half",
      link_guidebook: "https://contoh-pendaftaran.id/guide-kenjeran.pdf",
      status: "buka",
    },
    {
      id: 5,
      slug: "sunday-social-run",
      judul: "Sunday Social Run",
      deskripsi: "Lari santai komunitas di Minggu pagi, cocok untuk menyegarkan badan dan menambah lingkaran pertemanan baru.",
      poster: "ph1",
      organizer: "Pace Buddies SBY",
      jenis: "Fun Run",
      benefit: ["Stiker Komunitas", "Air Mineral Gratis", "Foto Bareng Fotografer Lari"],
      kontak: {
        whatsapp: "https://wa.me/6281234567805",
        instagram: "https://instagram.com/pacebuddiessby",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -7)),
      tgl_tutup_daftar: toDateString(addDays(monday, 6)),
      tgl_mulai: addDays(monday, 6), // Minggu ini
      tgl_selesai: addDays(monday, 6),
      alamat: "Kampus ITS, Gerbang Utama",
      link_maps: "https://maps.google.com/?q=-7.2819,112.7948",
      area: "Surabaya Timur",
      kecamatan: "Sukolilo",
      kabupaten: "Kota Surabaya",
      lat: -7.2819,
      lng: 112.7948,
      kategori_jarak: ["5K"],
      biaya: [{ kategori: "5K", nominal: 0 }],
      link_daftar: "https://contoh-pendaftaran.id/sunday-social",
      link_guidebook: null,
      status: "buka",
    },
    {
      id: 6,
      slug: "rungkut-charity-run",
      judul: "Rungkut Charity Run",
      deskripsi: "Berlari sambil berbagi untuk pendidikan anak-anak di Surabaya Timur. Seluruh keuntungan didonasikan.",
      poster: "ph2",
      organizer: "Rungkut Peduli",
      jenis: "Fun Run",
      benefit: ["Medali Finisher Peduli", "Sertifikat Donasi", "Tote Bag Kanvas", "Kupon Bazar UMKM"],
      kontak: {
        whatsapp: "https://wa.me/6281234567806",
        instagram: "https://instagram.com/rungkutpeduli",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -10)),
      tgl_tutup_daftar: toDateString(addDays(monday, 13)),
      tgl_mulai: addDays(monday, 13), // 2 minggu lagi
      tgl_selesai: addDays(monday, 13),
      alamat: "Lapangan Rungkut, Jl. Rungkut Asri",
      link_maps: "https://maps.google.com/?q=-7.3188,112.7758",
      area: "Surabaya Timur",
      kecamatan: "Rungkut",
      kabupaten: "Kota Surabaya",
      lat: -7.3188,
      lng: 112.7758,
      kategori_jarak: ["5K"],
      biaya: [{ kategori: "5K", nominal: 75000 }],
      link_daftar: "https://contoh-pendaftaran.id/rungkut-charity",
      link_guidebook: null,
      status: "buka",
    },
    {
      id: 7,
      slug: "suroboyo-marathon-demo",
      judul: "Suroboyo Marathon Demo",
      deskripsi: "Ajang lari marathon penuh 42K melintasi arteri utama kota dari Bundaran Waru hingga Jembatan Merah.",
      poster: "ph3",
      organizer: "Surabaya Running Org",
      jenis: "Marathon",
      benefit: ["Jaket Finisher Eksklusif", "Medali Logam Berat", "Asuransi & Tim Medis Lengkap", "15 Pos Water Station"],
      kontak: {
        whatsapp: "https://wa.me/6281234567807",
        instagram: "https://instagram.com/sbyrunningorg",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -40)),
      tgl_tutup_daftar: toDateString(addDays(monday, 20)),
      tgl_mulai: addDays(monday, 20), // 3 minggu lagi
      tgl_selesai: addDays(monday, 20),
      alamat: "Jl. Ahmad Yani, Frontage Road",
      link_maps: "https://maps.google.com/?q=-7.3126,112.7381",
      area: "Surabaya Selatan",
      kecamatan: "Wonocolo",
      kabupaten: "Kota Surabaya",
      lat: -7.3126,
      lng: 112.7381,
      kategori_jarak: ["42K"],
      biaya: [{ kategori: "42K", nominal: 400000 }],
      link_daftar: "https://contoh-pendaftaran.id/suroboyo-marathon",
      link_guidebook: "https://contoh-pendaftaran.id/marathon-guide.pdf",
      status: "buka",
    },
    {
      id: 8,
      slug: "rungkut-trail-adventure",
      judul: "Rungkut Trail Adventure",
      deskripsi: "Jalur trail menembus rawa dan tambak alami di kawasan pesisir Gunung Anyar.",
      poster: "ph4",
      organizer: "Trail Tribe Jatim",
      jenis: "Trail Run",
      benefit: ["Medali Finisher Unik", "Syal Ecoprint", "Minuman Kelapa Muda"],
      kontak: {
        instagram: "https://instagram.com/trailtribejatim",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -10)),
      tgl_tutup_daftar: toDateString(addDays(monday, 27)),
      tgl_mulai: addDays(monday, 27),
      tgl_selesai: addDays(monday, 27),
      alamat: "Gunung Anyar Tambak, Kec. Gunung Anyar",
      link_maps: "https://maps.google.com/?q=-7.3364,112.8021",
      area: "Surabaya Timur",
      kecamatan: "Gunung Anyar",
      kabupaten: "Kota Surabaya",
      lat: -7.3364,
      lng: 112.8021,
      kategori_jarak: ["10K"],
      biaya: [{ kategori: "10K", nominal: 140000 }],
      link_daftar: "https://contoh-pendaftaran.id/rungkut-trail",
      link_guidebook: null,
      status: "buka",
    },
    {
      id: 9,
      slug: "run-for-mangrove",
      judul: "Run for Mangrove",
      deskripsi: "Aksi lari peduli lingkungan hidup di kawasan konservasi hutan mangrove Wonorejo.",
      poster: "ph1",
      organizer: "Mangrove Care",
      jenis: "Trail Run",
      benefit: ["1 Bibit Mangrove atas Nama Peserta", "Medali Daur Ulang", "Snack Lokal"],
      kontak: {
        whatsapp: "https://wa.me/6281234567809",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -60)),
      tgl_tutup_daftar: toDateString(addDays(monday, -5)),
      tgl_mulai: addDays(monday, 34),
      tgl_selesai: addDays(monday, 34),
      alamat: "Wonorejo Mangrove, Rungkut",
      link_maps: "https://maps.google.com/?q=-7.3077,112.8247",
      area: "Surabaya Timur",
      kecamatan: "Rungkut",
      kabupaten: "Kota Surabaya",
      lat: -7.3077,
      lng: 112.8247,
      kategori_jarak: ["10K"],
      biaya: [{ kategori: "10K", nominal: 120000 }],
      link_daftar: "https://contoh-pendaftaran.id/mangrove-run",
      link_guidebook: null,
      status: "tutup", // Pendaftaran ditutup
    },
    {
      id: 10,
      slug: "merdeka-run-surabaya",
      judul: "Merdeka Run Surabaya",
      deskripsi: "Lari kemerdekaan mengenang perjuangan arek-arek Suroboyo dengan titik kumpul di Monumen Tugu Pahlawan.",
      poster: "ph2",
      organizer: "Arek Suroboyo Run",
      jenis: "Fun Run",
      benefit: ["Medali Merah Putih", "Bendera Tangan", "Voucher Makan"],
      kontak: {
        instagram: "https://instagram.com/areksuroboyorun",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -45)),
      tgl_tutup_daftar: toDateString(addDays(monday, -20)),
      tgl_mulai: addDays(monday, -14), // Telah selesai 2 minggu lalu
      tgl_selesai: addDays(monday, -14),
      alamat: "Tugu Pahlawan, Jl. Pahlawan",
      link_maps: "https://maps.google.com/?q=-7.2458,112.7378",
      area: "Surabaya Pusat",
      kecamatan: "Bubutan",
      kabupaten: "Kota Surabaya",
      lat: -7.2458,
      lng: 112.7378,
      kategori_jarak: ["5K"],
      biaya: [{ kategori: "5K", nominal: 50000 }],
      link_daftar: "https://contoh-pendaftaran.id/merdeka-run",
      link_guidebook: null,
      status: "selesai",
    },
    {
      id: 11,
      slug: "surabaya-marathon-series",
      judul: "Surabaya Marathon Series",
      deskripsi: "Kejuaraan lari jalan raya resmi skala nasional melintasi pusat bisnis dan ikon bersejarah Surabaya.",
      poster: "ph3",
      organizer: "Surabaya Running Org",
      jenis: "Marathon",
      benefit: ["Finisher T-Shirt 42K", "Medali Edisi Khusus", "Goodie Bag Sponsor"],
      kontak: {
        whatsapp: "https://wa.me/6281234567811",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -90)),
      tgl_tutup_daftar: toDateString(addDays(monday, -40)),
      tgl_mulai: addDays(monday, -30),
      tgl_selesai: addDays(monday, -30),
      alamat: "Jl. Basuki Rahmat, Embong Kaliasin",
      link_maps: "https://maps.google.com/?q=-7.2654,112.7423",
      area: "Surabaya Pusat",
      kecamatan: "Genteng",
      kabupaten: "Kota Surabaya",
      lat: -7.2654,
      lng: 112.7423,
      kategori_jarak: ["21K", "42K"],
      biaya: [
        { kategori: "21K", nominal: 250000 },
        { kategori: "42K", nominal: 350000 },
      ],
      link_daftar: "https://contoh-pendaftaran.id/marathon-series",
      link_guidebook: null,
      status: "selesai",
    },
    {
      id: 12,
      slug: "sumpah-pemuda-run",
      judul: "Sumpah Pemuda Run",
      deskripsi: "Peringatan hari Sumpah Pemuda untuk generasi muda pelari Surabaya.",
      poster: "ph4",
      organizer: "ITS Running Club",
      jenis: "Fun Run",
      benefit: ["Medali Finisher Pemuda", "Kaos Peserta", "Doorprize"],
      kontak: {
        instagram: "https://instagram.com/itsrunningclub",
      },
      tgl_buka_daftar: toDateString(addDays(monday, -60)),
      tgl_tutup_daftar: toDateString(addDays(monday, -35)),
      tgl_mulai: addDays(monday, -28),
      tgl_selesai: addDays(monday, -28),
      alamat: "Kampus ITS, Jl. Raya ITS",
      link_maps: "https://maps.google.com/?q=-7.2819,112.7948",
      area: "Surabaya Timur",
      kecamatan: "Sukolilo",
      kabupaten: "Kota Surabaya",
      lat: -7.2819,
      lng: 112.7948,
      kategori_jarak: ["5K"],
      biaya: [{ kategori: "5K", nominal: 0 }],
      link_daftar: "https://contoh-pendaftaran.id/sumpah-pemuda-run",
      link_guidebook: null,
      status: "selesai",
    },
    {
      id: 13,
      slug: "new-year-run-2027",
      judul: "New Year Run 2027",
      deskripsi: "Awali tahun baru 2027 dengan langkah sehat dan resolusi bugar di Taman Flora Bratang.",
      poster: "ph1",
      organizer: "Flora Runners",
      jenis: "Fun Run",
      benefit: ["Medali Kalender 2027", "Sarapan Pagi Sehat", "Doorprize Menarik"],
      kontak: {
        whatsapp: "https://wa.me/6281234567813",
      },
      tgl_buka_daftar: "2026-11-01",
      tgl_tutup_daftar: "2026-12-28",
      tgl_mulai: new Date("2027-01-01T06:00:00"),
      tgl_selesai: new Date("2027-01-01T09:00:00"),
      alamat: "Taman Flora, Jl. Manyar Kertoadi",
      link_maps: "https://maps.google.com/?q=-7.2899,112.7667",
      area: "Surabaya Pusat",
      kecamatan: "Tegalsari",
      kabupaten: "Kota Surabaya",
      lat: -7.2899,
      lng: 112.7667,
      kategori_jarak: ["5K"],
      biaya: [{ kategori: "5K", nominal: 60000 }],
      link_daftar: "https://contoh-pendaftaran.id/new-year-2027",
      link_guidebook: null,
      status: "buka",
    },
    {
      id: 14,
      slug: "surabaya-half-2027",
      judul: "Surabaya Half 2027",
      deskripsi: "Kejuaraan Half Marathon awal tahun di rute Ahmad Yani yang lebar dan mulus.",
      poster: "ph2",
      organizer: "Surabaya Running Org",
      jenis: "Half Marathon",
      benefit: ["Jersey Finisher 2027", "Medali Emas Finisher", "Foto Lari Berkualitas"],
      kontak: {
        whatsapp: "https://wa.me/6281234567814",
      },
      tgl_buka_daftar: "2026-12-01",
      tgl_tutup_daftar: "2027-02-28",
      tgl_mulai: new Date("2027-03-07T05:30:00"),
      tgl_selesai: new Date("2027-03-07T09:30:00"),
      alamat: "Jl. Ahmad Yani, Wonocolo",
      link_maps: "https://maps.google.com/?q=-7.3126,112.7381",
      area: "Surabaya Selatan",
      kecamatan: "Wonocolo",
      kabupaten: "Kota Surabaya",
      lat: -7.3126,
      lng: 112.7381,
      kategori_jarak: ["21K"],
      biaya: [{ kategori: "21K", nominal: 300000 }],
      link_daftar: "https://contoh-pendaftaran.id/sby-half-2027",
      link_guidebook: "https://contoh-pendaftaran.id/half2027-guide.pdf",
      status: "buka",
    },
    {
      id: 15,
      slug: "kenjeran-trail-2027",
      judul: "Kenjeran Trail 2027",
      deskripsi: "Lomba lari pesisir pantai Kenjeran dengan lintasan pasir padat dan udara laut segar.",
      poster: "ph3",
      organizer: "Kenjeran Crew",
      jenis: "Trail Run",
      benefit: ["Medali Finisher Unik", "Buff Kenjeran 2027", "Es Degan Segar"],
      kontak: {
        whatsapp: "https://wa.me/6281234567815",
      },
      tgl_buka_daftar: "2027-01-15",
      tgl_tutup_daftar: "2027-05-01",
      tgl_mulai: new Date("2027-05-16T06:00:00"),
      tgl_selesai: new Date("2027-05-16T09:00:00"),
      alamat: "Pantai Ria Kenjeran, Bulak",
      link_maps: "https://maps.google.com/?q=-7.2475,112.7978",
      area: "Surabaya Utara",
      kecamatan: "Bulak",
      kabupaten: "Kota Surabaya",
      lat: -7.2475,
      lng: 112.7978,
      kategori_jarak: ["10K"],
      biaya: [{ kategori: "10K", nominal: 150000 }],
      link_daftar: "https://contoh-pendaftaran.id/kenjeran-trail-2027",
      link_guidebook: null,
      status: "buka",
    },
  ];
}

export const sampleEvents = getSampleEvents();
