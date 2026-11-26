// data/articles.ts
// Data contoh 6 artikel blog untuk pelari di Surabaya sesuai PRD.
// Mencakup kategori Panduan, Tips, dan Cerita.

export interface ArticleData {
  id: number;
  slug: string;
  judul: string;
  ringkasan: string;
  gambar: string; // nama kelas gradasi mis. ph1
  kategori: "Panduan" | "Tips" | "Cerita";
  tanggal_publikasi: string; // YYYY-MM-DD
  perkiraan_baca: number; // menit
  isi: string[];
}

export const sampleArticles: ArticleData[] = [
  {
    id: 1,
    slug: "panduan-lari-pertama-untuk-pemula",
    judul: "Panduan lari pertama untuk pemula",
    ringkasan: "Mulailah dari jarak pendek 3K, jaga pace yang masih nyaman untuk mengobrol santai, dan dengarkan tubuhmu.",
    gambar: "ph1",
    kategori: "Panduan",
    tanggal_publikasi: "2026-11-20",
    perkiraan_baca: 5,
    isi: [
      "Memulai kebiasaan lari tidak harus langsung menempuh jarak jauh atau berlari kencang. Kunci utama bagi pelari pemula adalah konsistensi dan adaptasi tubuh terhadap beban latihan.",
      "Mulailah dengan kombinasi jalan dan lari (walk-run method), misalnya 2 menit lari santai diikuti 1 menit jalan kaki. Ulangi siklus ini selama 20 hingga 30 menit sebanyak 3 kali dalam seminggu.",
      "Gunakan ukuran kenyamanan bernapas (conversational pace): jika kamu masih bisa berbicara satu kalimat penuh tanpa terengah-engah, berarti kecepatanmu sudah tepat.",
    ],
  },
  {
    id: 2,
    slug: "5-rute-sepi-di-surabaya",
    judul: "5 rute sepi di Surabaya",
    ringkasan: "Pilihan rute lari pagi yang teduh, minim polusi kendaraan, dan nyaman untuk menikmati udara segar Surabaya.",
    gambar: "ph2",
    kategori: "Tips",
    tanggal_publikasi: "2026-11-15",
    perkiraan_baca: 4,
    isi: [
      "Bagi pelari di Surabaya, menemukan rute yang sejuk dan bebas dari hiruk pikuk knalpot kendaraan bermotor adalah sebuah kemewahan.",
      "Beberapa lokasi terbaik meliputi jalur lingkar dalam Kampus ITS Sukolilo yang dipenuhi pepohonan trembesi rindang, trek alami Hutan Kota Putat Gede, hingga jembatan kayu kawasan Konservasi Mangrove Wonorejo.",
      "Waktu terbaik untuk berlari di rute-rute ini adalah antara pukul 05.15 hingga 06.30 WIB saat udara pagi masih terasa segar.",
    ],
  },
  {
    id: 3,
    slug: "cerita-finish-pertamaku-di-10k",
    judul: "Cerita finish pertamaku di 10K",
    ringkasan: "Kisah perjuangan melewati kilometer ke-7 hingga euforia bangga mengalungkan medali finisher pertama.",
    gambar: "ph3",
    kategori: "Cerita",
    tanggal_publikasi: "2026-11-08",
    perkiraan_baca: 6,
    isi: [
      "Dua bulan sebelum race, berlari sejauh 3 kilometer saja sudah membuat kakiku pegal berhari-hari. Namun dorongan teman-teman komunitas membuatku berani mendaftar kategori 10K.",
      "Tantangan terberat datang di kilometer ketujuh saat rasa lelah mulai menyerang pikiran. Tetapi sorak sorai sesama pelari di water station mengembalikan semangatku untuk terus melangkah.",
      "Garis akhir itu akhirnya terlihat. Mengalungkan medali finisher pertama adalah pengalaman yang tidak akan pernah kulupakan seumur hidup.",
    ],
  },
  {
    id: 4,
    slug: "cara-memilih-sepatu-lari",
    judul: "Cara memilih sepatu lari",
    ringkasan: "Panduan memahami tipe telapak kaki (pronation) dan bantalan sol yang tepat untuk mencegah cedera lutut.",
    gambar: "ph4",
    kategori: "Tips",
    tanggal_publikasi: "2026-10-30",
    perkiraan_baca: 5,
    isi: [
      "Sepatu lari adalah investasi terpenting bagi seorang pelari. Menggunakan sepatu kasual untuk berlari sering kali berujung pada cedera tulang kering (shin splints) atau nyeri lutut.",
      "Ketahui jenis telapak kakimu: normal arch (neutral), low arch (overpronation), atau high arch (underpronation). Pelari overpronation membutuhkan sepatu tipe stability dengan penopang ekstra di bagian dalam sol.",
      "Selalu beli sepatu lari dengan ukuran 0,5 hingga 1 nomor lebih besar dari ukuran sepatu sehari-hari untuk memberikan ruang saat kaki memuai saat berlari.",
    ],
  },
  {
    id: 5,
    slug: "menyusun-jadwal-latihan-5k",
    judul: "Menyusun jadwal latihan 5K",
    ringkasan: "Program latihan terstruktur 6 minggu dari nol hingga siap menuntaskan lomba lari 5K dengan senyum.",
    gambar: "ph1",
    kategori: "Panduan",
    tanggal_publikasi: "2026-10-22",
    perkiraan_baca: 7,
    isi: [
      "Program 5K ramah pemula dirancang selama 6 minggu dengan frekuensi 3 hari latihan lari, 1 hari latihan kekuatan (strength training), dan 3 hari istirahat aktif.",
      "Minggu 1–2 fokus pada adaptasi aerobik. Minggu 3–4 mulai meningkatkan durasi lari tanpa henti hingga mencapai 25 menit. Minggu 5–6 adalah simulasi jarak dan fase tapering.",
      "Jangan pernah mengabaikan hari istirahat, karena otot berkembang dan pulih justru saat tubuh beristirahat.",
    ],
  },
  {
    id: 6,
    slug: "kisah-komunitas-lari-kampus",
    judul: "Kisah komunitas lari kampus",
    ringkasan: "Bagaimana sekelompok mahasiswa ITS membangun rutinitas sehat di tengah kesibukan kuliah dan tugas akhir.",
    gambar: "ph2",
    kategori: "Cerita",
    tanggal_publikasi: "2026-10-12",
    perkiraan_baca: 4,
    isi: [
      "Berawal dari tiga mahasiswa yang jenuh dengan rutinitas tugas akhir di perpustakaan, ajakan lari sore di sekeliling bundaran ITS perlahan menarik minat puluhan mahasiswa lainnya.",
      "Kini komunitas ini menjadi wadah melepas penat yang sehat. Tidak ada senioritas, semua berlari dengan pace yang nyaman dan saling menyemangati hingga garis finish latihan sore.",
    ],
  },
];
