// data/banners.ts
// Data slide banner carousel untuk setiap halaman sesuai prototipe reference/Run_Connect.html baris 208.

import { BannerSlide } from "@/components/BannerCarousel";

export const sampleBanners: Record<string, BannerSlide[]> = {
  beranda: [
    {
      title: "Temukan event lari di Surabaya",
      description: "Semua jadwal dan komunitas dalam satu tempat.",
      buttonText: "Lihat Event",
      buttonHref: "/event",
    },
    {
      title: "Cari teman latihan sepacemu",
      description: "Kenali komunitas lari di sekitarmu.",
      buttonText: "Lihat Komunitas",
      buttonHref: "/komunitas",
    },
    {
      title: "Lari di tempat yang nyaman",
      description: "Peta tempat lari lengkap dengan tingkat keramaian.",
      buttonText: "Buka Peta",
      buttonHref: "/tempat-lari",
    },
  ],
  event: [
    {
      title: "ITS Fun Run 5K",
      description: "Lari santai di Kampus ITS, gratis untuk semua kalangan.",
      buttonText: "Lihat detail",
      buttonHref: "/event/its-fun-run-5k",
    },
    {
      title: "Trail Run Putat",
      description: "Tantangan jalur tanah alami, pendaftaran sedang dibuka.",
      buttonText: "Lihat detail",
      buttonHref: "/event/trail-run-putat",
    },
    {
      title: "Kenjeran Half Marathon",
      description: "Pemandangan sunrise tepi laut Kenjeran, daftar sekarang.",
      buttonText: "Lihat detail",
      buttonHref: "/event/kenjeran-half-marathon",
    },
  ],
  komunitas: [
    {
      title: "ITS Running Club",
      description: "Latihan rutin Selasa dan Kamis sore di sekitar kampus.",
      buttonText: "Lihat profil",
      buttonHref: "/komunitas/its-running-club",
    },
    {
      title: "Surabaya Sunrise Runners",
      description: "Lari pagi santai dan ramah bagi pemula di Surabaya Timur.",
      buttonText: "Lihat profil",
      buttonHref: "/komunitas/surabaya-sunrise-runners",
    },
    {
      title: "Pace Buddies SBY",
      description: "Temukan teman lari dengan kecepatan pace yang setara.",
      buttonText: "Lihat profil",
      buttonHref: "/komunitas/pace-buddies-sby",
    },
  ],
  tempat: [
    {
      title: "Kampus ITS Sukolilo",
      description: "Kawasan sepi, rindang, dan luas untuk latihan pagi hari.",
      buttonText: "Lihat di peta",
      buttonHref: "/tempat-lari",
    },
    {
      title: "Wonorejo Mangrove",
      description: "Udara segar dan rute teduh di atas jembatan kayu konservasi.",
      buttonText: "Lihat di peta",
      buttonHref: "/tempat-lari",
    },
    {
      title: "Taman Bungkul",
      description: "Pusat olahraga warga di jantung kota dengan fasilitas lengkap.",
      buttonText: "Lihat di peta",
      buttonHref: "/tempat-lari",
    },
  ],
  blog: [
    {
      title: "Panduan lari pertama untuk pemula",
      description: "Mulai langkah pertamamu dari jarak 3K dengan senyuman.",
      buttonText: "Baca artikel",
      buttonHref: "/blog/panduan-lari-pertama-untuk-pemula",
    },
    {
      title: "5 rute sepi di Surabaya",
      description: "Rute pilihan yang nyaman untuk latihan pagi tanpa polusi.",
      buttonText: "Baca artikel",
      buttonHref: "/blog/5-rute-sepi-di-surabaya",
    },
    {
      title: "Cara memilih sepatu lari",
      description: "Tips memilih sepatu yang tepat sesuai bentuk telapak kaki.",
      buttonText: "Baca artikel",
      buttonHref: "/blog/cara-memilih-sepatu-lari",
    },
  ],
};
