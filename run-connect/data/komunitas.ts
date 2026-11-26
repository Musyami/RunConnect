// data/komunitas.ts
// Data contoh komunitas lari di Surabaya sesuai spesifikasi PRD bagian Data Contoh.
// 6 komunitas di berbagai area dengan profil, jadwal latihan, dan kontak.

export interface KomunitasData {
  id: number;
  slug: string;
  nama: string;
  deskripsi: string;
  foto: string;
  logo: string;
  area: "Surabaya Barat" | "Surabaya Timur" | "Surabaya Pusat" | "Surabaya Selatan" | "Surabaya Utara";
  kecamatan: string;
  kabupaten: string;
  jumlah_anggota: number;
  keanggotaan: "umum" | "khusus";
  keanggotaan_ket: string;
  jadwal: {
    hari_dari: string;
    hari_sampai: string;
    jam_mulai: string;
    jam_selesai: string;
    jarak_km: string;
    pace: string;
  };
  lokasi_kumpul_alamat: string;
  lokasi_kumpul_maps: string;
  kontak: {
    whatsapp?: string;
    instagram?: string;
    email?: string;
    website?: string;
    tiktok?: string;
  };
  status: "aktif" | "terverifikasi";
}

export const sampleKomunitas: KomunitasData[] = [
  {
    id: 1,
    slug: "surabaya-sunrise-runners",
    nama: "Surabaya Sunrise Runners",
    deskripsi: "Komunitas lari pagi santai untuk pemula dan umum di kawasan Surabaya Timur. Suasana ramah, tidak mengejar kecepatan, dan fokus pada kebugaran serta konsistensi bersama.",
    foto: "ph1",
    logo: "ph1",
    area: "Surabaya Timur",
    kecamatan: "Rungkut",
    kabupaten: "Kota Surabaya",
    jumlah_anggota: 120,
    keanggotaan: "umum",
    keanggotaan_ket: "Terbuka untuk siapa pun yang ingin memulai kebiasaan lari pagi.",
    jadwal: {
      hari_dari: "Sabtu",
      hari_sampai: "Sabtu",
      jam_mulai: "05.30",
      jam_selesai: "07.00",
      jarak_km: "5 km",
      pace: "7:00/km",
    },
    lokasi_kumpul_alamat: "Taman Flora, Jl. Manyar Kertoadi",
    lokasi_kumpul_maps: "https://maps.google.com/?q=-7.2899,112.7667",
    kontak: {
      instagram: "https://instagram.com/surabayasunrise",
      whatsapp: "https://wa.me/6281234567901",
      email: "kontak@sunriserunners.id",
    },
    status: "terverifikasi",
  },
  {
    id: 2,
    slug: "its-running-club",
    nama: "ITS Running Club",
    deskripsi: "Wadah komunitas pelari bagi mahasiswa, dosen, dan alumni Institut Teknologi Sepuluh Nopember (ITS). Rutin mengadakan latihan sore mengelilingi jalur rindang kampus.",
    foto: "ph2",
    logo: "ph2",
    area: "Surabaya Timur",
    kecamatan: "Sukolilo",
    kabupaten: "Kota Surabaya",
    jumlah_anggota: 85,
    keanggotaan: "khusus",
    keanggotaan_ket: "Khusus mahasiswa aktif, dosen, staf, dan alumni ITS.",
    jadwal: {
      hari_dari: "Selasa",
      hari_sampai: "Kamis",
      jam_mulai: "16.30",
      jam_selesai: "18.00",
      jarak_km: "5 km",
      pace: "6:30/km",
    },
    lokasi_kumpul_alamat: "Gerbang utama ITS, Jl. Raya ITS",
    lokasi_kumpul_maps: "https://maps.google.com/?q=-7.2819,112.7948",
    kontak: {
      instagram: "https://instagram.com/itsrunningclub",
      whatsapp: "https://wa.me/6281234567902",
    },
    status: "terverifikasi",
  },
  {
    id: 3,
    slug: "pace-buddies-sby",
    nama: "Pace Buddies SBY",
    deskripsi: "Komunitas pelari yang terbagi dalam beberapa kelompok pace (pacer group) di Surabaya Selatan. Cocok untuk pelari yang sedang mempersiapkan diri menghadapi race 10K atau 21K.",
    foto: "ph3",
    logo: "ph3",
    area: "Surabaya Selatan",
    kecamatan: "Wonokromo",
    kabupaten: "Kota Surabaya",
    jumlah_anggota: 60,
    keanggotaan: "umum",
    keanggotaan_ket: "Terbuka untuk umum dengan pilihan grup pace 5:00, 5:45, dan 6:30.",
    jadwal: {
      hari_dari: "Minggu",
      hari_sampai: "Minggu",
      jam_mulai: "05.45",
      jam_selesai: "07.30",
      jarak_km: "8 km",
      pace: "5:45/km",
    },
    lokasi_kumpul_alamat: "Taman Bungkul, Jl. Raya Darmo",
    lokasi_kumpul_maps: "https://maps.google.com/?q=-7.2916,112.7396",
    kontak: {
      whatsapp: "https://wa.me/6281234567903",
      website: "https://pacebuddies.id",
    },
    status: "terverifikasi",
  },
  {
    id: 4,
    slug: "night-owl-runners",
    nama: "Night Owl Runners",
    deskripsi: "Komunitas lari malam di Surabaya Pusat bagi pekerja kantor dan mahasiswa yang sibuk di siang hari. Jalur lari terang dan aman di sepanjang koridor pedestrian kota.",
    foto: "ph4",
    logo: "ph4",
    area: "Surabaya Pusat",
    kecamatan: "Genteng",
    kabupaten: "Kota Surabaya",
    jumlah_anggota: 40,
    keanggotaan: "umum",
    keanggotaan_ket: "Terbuka untuk umum semua kalangan usia.",
    jadwal: {
      hari_dari: "Rabu",
      hari_sampai: "Rabu",
      jam_mulai: "19.00",
      jam_selesai: "20.30",
      jarak_km: "6 km",
      pace: "Fleksibel",
    },
    lokasi_kumpul_alamat: "Taman Prestasi, Jl. Ketabang Kali",
    lokasi_kumpul_maps: "https://maps.google.com/?q=-7.2641,112.7483",
    kontak: {
      instagram: "https://instagram.com/nightowlrunners",
    },
    status: "terverifikasi",
  },
  {
    id: 5,
    slug: "ladies-run-club",
    nama: "Ladies Run Club",
    deskripsi: "Ruang aman dan suportif bagi perempuan Surabaya untuk berolahraga lari bersama. Melatih stamina secara bertahap sambil berbagi tips gaya hidup sehat.",
    foto: "ph1",
    logo: "ph1",
    area: "Surabaya Barat",
    kecamatan: "Sukomanunggal",
    kabupaten: "Kota Surabaya",
    jumlah_anggota: 55,
    keanggotaan: "khusus",
    keanggotaan_ket: "Khusus perempuan dari segala usia dan kemampuan lari.",
    jadwal: {
      hari_dari: "Sabtu",
      hari_sampai: "Sabtu",
      jam_mulai: "06.00",
      jam_selesai: "07.30",
      jarak_km: "5 km",
      pace: "Fleksibel",
    },
    lokasi_kumpul_alamat: "Hutan Kota Putat Gede, Sukomanunggal",
    lokasi_kumpul_maps: "https://maps.google.com/?q=-7.2751,112.7105",
    kontak: {
      instagram: "https://instagram.com/ladiesrunclub.sby",
      whatsapp: "https://wa.me/6281234567905",
      email: "halo@ladiesrun.id",
      website: "https://ladiesrun.id",
    },
    status: "terverifikasi",
  },
  {
    id: 6,
    slug: "kenjeran-crew",
    nama: "Kenjeran Crew",
    deskripsi: "Pelari pesisir utara Surabaya yang gemar lari pagi menyongsong terbit matahari di tepi laut Kenjeran.",
    foto: "ph2",
    logo: "ph2",
    area: "Surabaya Utara",
    kecamatan: "Bulak",
    kabupaten: "Kota Surabaya",
    jumlah_anggota: 70,
    keanggotaan: "umum",
    keanggotaan_ket: "Terbuka untuk umum pencinta lari outdoor.",
    jadwal: {
      hari_dari: "Fleksibel",
      hari_sampai: "Fleksibel",
      jam_mulai: "Fleksibel",
      jam_selesai: "Fleksibel",
      jarak_km: "Fleksibel",
      pace: "6:00/km",
    },
    lokasi_kumpul_alamat: "Pantai Ria Kenjeran, Jl. Kenjeran",
    lokasi_kumpul_maps: "https://maps.google.com/?q=-7.2475,112.7978",
    kontak: {
      instagram: "https://instagram.com/kenjerancrew",
      whatsapp: "https://wa.me/6281234567906",
    },
    status: "terverifikasi",
  },
];
