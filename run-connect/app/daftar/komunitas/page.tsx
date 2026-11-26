"use client";

// app/daftar/komunitas/page.tsx
// Halaman formulir pengajuan Komunitas Lari (khusus Mitra) sesuai prototipe dan PRD.

import React, { useState } from "react";
import Link from "next/link";
import { AuthGate, SubmissionDone, SosmedListInput, SosmedItem } from "@/components/FormComponents";

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function DaftarKomunitasPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State Formulir
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fotoUploaded, setFotoUploaded] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [area, setArea] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [jumlahAnggota, setJumlahAnggota] = useState("");
  const [keanggotaan, setKeanggotaan] = useState("");
  const [keanggotaanKet, setKeanggotaanKet] = useState("");

  // Jadwal Latihan
  const [hariDari, setHariDari] = useState("");
  const [hariSampai, setHariSampai] = useState("");
  const [hariFleksibel, setHariFleksibel] = useState(false);

  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [jamFleksibel, setJamFleksibel] = useState(false);

  const [jarak, setJarak] = useState("");
  const [jarakFleksibel, setJarakFleksibel] = useState(false);

  const [pace, setPace] = useState("");
  const [paceFleksibel, setPaceFleksibel] = useState(false);

  // Lokasi Kumpul & Kontak
  const [alamatKumpul, setAlamatKumpul] = useState("");
  const [mapsKumpul, setMapsKumpul] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [extraSosmed, setExtraSosmed] = useState<SosmedItem[]>([]);

  // State Galat Validasi
  const [showErrors, setShowErrors] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    const isJadwalValid =
      (hariFleksibel || (hariDari !== "" && hariSampai !== "")) &&
      (jamFleksibel || (jamMulai !== "" && jamSelesai !== "")) &&
      (jarakFleksibel || jarak.trim() !== "") &&
      (paceFleksibel || pace.trim() !== "");

    const isBasicValid =
      nama.trim() !== "" &&
      deskripsi.trim() !== "" &&
      fotoUploaded &&
      logoUploaded &&
      area !== "" &&
      (kecamatan.trim() !== "" || kabupaten.trim() !== "") &&
      jumlahAnggota.trim() !== "" &&
      keanggotaan !== "" &&
      (keanggotaan !== "Khusus" || keanggotaanKet.trim() !== "") &&
      isJadwalValid &&
      alamatKumpul.trim() !== "" &&
      mapsKumpul.trim() !== "" &&
      whatsapp.trim() !== "" &&
      instagram.trim() !== "";

    if (!isBasicValid) {
      showToast("Lengkapi kolom yang wajib diisi");
      return;
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Header Halaman */}
      <div className="pg">
        <div className="w">
          <h1>Daftarkan Komunitas Lari</h1>
        </div>
      </div>

      <div className="w">
        <section className="s narrow">
          {/* Tab Pilihan Jenis (Tanpa ikon) */}
          <div className="chips">
            <Link className="chip" href="/daftar/event">
              Event Lari
            </Link>
            <Link className="chip on" href="/daftar/komunitas">
              Komunitas Lari
            </Link>
            <Link className="chip" href="/daftar/lokasi">
              Lokasi Lari
            </Link>
          </div>

          <AuthGate requiredRole="mitra">
            {isSubmitted ? (
              <SubmissionDone />
            ) : (
              <div className="box">
                <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
                  Komunitas Lari
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Nama Komunitas */}
                  <div className="fg">
                    <label>Nama Komunitas *</label>
                    <input
                      type="text"
                      placeholder="Mis. Surabaya Sunrise Runners"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                    {showErrors && !nama.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Deskripsi */}
                  <div className="fg">
                    <label>Deskripsi *</label>
                    <textarea
                      rows={3}
                      placeholder="Ceritakan profil, suasana latihan, dan tujuan komunitasmu..."
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                    />
                    {showErrors && !deskripsi.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Foto Komunitas */}
                  <div className="fg">
                    <label>Foto Komunitas (foto bersama) *</label>
                    <div
                      className={`up ${fotoUploaded ? "ok" : ""}`}
                      onClick={() => setFotoUploaded(true)}
                    >
                      {fotoUploaded
                        ? "✓ Foto bersama berhasil dipilih: foto-bersama.jpg"
                        : "Unggah foto bersama anggota komunitas (Klik untuk simulasi unggah)"}
                    </div>
                    {showErrors && !fotoUploaded && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Logo Komunitas */}
                  <div className="fg">
                    <label>Logo *</label>
                    <div
                      className={`up ${logoUploaded ? "ok" : ""}`}
                      onClick={() => setLogoUploaded(true)}
                    >
                      {logoUploaded
                        ? "✓ Logo berhasil dipilih: logo-komunitas.png"
                        : "Unggah logo resmi komunitas (Klik untuk simulasi unggah)"}
                    </div>
                    {showErrors && !logoUploaded && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Area */}
                  <div className="fg">
                    <label>Area *</label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    >
                      <option value="">Pilih Area...</option>
                      <option value="Surabaya Pusat">Surabaya Pusat</option>
                      <option value="Surabaya Barat">Surabaya Barat</option>
                      <option value="Surabaya Timur">Surabaya Timur</option>
                      <option value="Surabaya Utara">Surabaya Utara</option>
                      <option value="Surabaya Selatan">Surabaya Selatan</option>
                    </select>
                    {showErrors && !area && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Wilayah */}
                  <div className="fg">
                    <label>Wilayah (kecamatan dan/atau kabupaten/kota) *</label>
                    <div className="two">
                      <input
                        type="text"
                        placeholder="Kecamatan (mis. Sukolilo)"
                        value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Kabupaten/Kota (mis. Surabaya)"
                        value={kabupaten}
                        onChange={(e) => setKabupaten(e.target.value)}
                      />
                    </div>
                    {showErrors && !kecamatan.trim() && !kabupaten.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Isi minimal salah satu wilayah.
                      </div>
                    )}
                  </div>

                  {/* Jumlah Anggota */}
                  <div className="fg">
                    <label>Jumlah Anggota *</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Perkiraan jumlah anggota aktif"
                      value={jumlahAnggota}
                      onChange={(e) => setJumlahAnggota(e.target.value)}
                    />
                    {showErrors && !jumlahAnggota.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Keanggotaan */}
                  <div className="fg">
                    <label>Keanggotaan *</label>
                    <select
                      value={keanggotaan}
                      onChange={(e) => setKeanggotaan(e.target.value)}
                    >
                      <option value="">Pilih Status Keanggotaan...</option>
                      <option value="Terbuka untuk umum">Terbuka untuk umum</option>
                      <option value="Khusus">Khusus</option>
                    </select>
                    {keanggotaan === "Khusus" && (
                      <input
                        type="text"
                        placeholder="Penjelasan bila Khusus, mis. khusus mahasiswa atau alumni ITS"
                        style={{ marginTop: "8px" }}
                        value={keanggotaanKet}
                        onChange={(e) => setKeanggotaanKet(e.target.value)}
                      />
                    )}
                    {showErrors &&
                      (!keanggotaan ||
                        (keanggotaan === "Khusus" && !keanggotaanKet.trim())) && (
                        <div className="err" style={{ display: "block" }}>
                          Kolom ini wajib diisi beserta penjelasannya.
                        </div>
                      )}
                  </div>

                  {/* Jadwal Latihan: Hari */}
                  <div className="fg">
                    <label>Hari (dari – sampai) *</label>
                    <div className="fx">
                      <select
                        value={hariDari}
                        disabled={hariFleksibel}
                        onChange={(e) => setHariDari(e.target.value)}
                      >
                        <option value="">Dari...</option>
                        {HARI.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <select
                        value={hariSampai}
                        disabled={hariFleksibel}
                        onChange={(e) => setHariSampai(e.target.value)}
                      >
                        <option value="">Sampai...</option>
                        {HARI.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <label className="fk">
                        <input
                          type="checkbox"
                          checked={hariFleksibel}
                          onChange={(e) => setHariFleksibel(e.target.checked)}
                        />
                        Fleksibel
                      </label>
                    </div>
                    {showErrors && !hariFleksibel && (!hariDari || !hariSampai) && (
                      <div className="err" style={{ display: "block" }}>
                        Tentukan hari latihan atau centang Fleksibel.
                      </div>
                    )}
                  </div>

                  {/* Jadwal Latihan: Jam */}
                  <div className="fg">
                    <label>Jam (mulai – selesai) *</label>
                    <div className="fx">
                      <input
                        type="time"
                        value={jamMulai}
                        disabled={jamFleksibel}
                        onChange={(e) => setJamMulai(e.target.value)}
                      />
                      <input
                        type="time"
                        value={jamSelesai}
                        disabled={jamFleksibel}
                        onChange={(e) => setJamSelesai(e.target.value)}
                      />
                      <label className="fk">
                        <input
                          type="checkbox"
                          checked={jamFleksibel}
                          onChange={(e) => setJamFleksibel(e.target.checked)}
                        />
                        Fleksibel
                      </label>
                    </div>
                    {showErrors && !jamFleksibel && (!jamMulai || !jamSelesai) && (
                      <div className="err" style={{ display: "block" }}>
                        Tentukan jam latihan atau centang Fleksibel.
                      </div>
                    )}
                  </div>

                  {/* Jadwal Latihan: Jarak */}
                  <div className="fg">
                    <label>Jarak (km) *</label>
                    <div className="fx">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="Mis. 5"
                        value={jarak}
                        disabled={jarakFleksibel}
                        onChange={(e) => setJarak(e.target.value)}
                      />
                      <label className="fk">
                        <input
                          type="checkbox"
                          checked={jarakFleksibel}
                          onChange={(e) => setJarakFleksibel(e.target.checked)}
                        />
                        Fleksibel
                      </label>
                    </div>
                    {showErrors && !jarakFleksibel && !jarak.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Isi jarak tempuh atau centang Fleksibel.
                      </div>
                    )}
                  </div>

                  {/* Jadwal Latihan: Pace */}
                  <div className="fg">
                    <label>Pace (menit/km) *</label>
                    <div className="fx">
                      <input
                        type="text"
                        placeholder="Mis. 6:30"
                        value={pace}
                        disabled={paceFleksibel}
                        onChange={(e) => setPace(e.target.value)}
                      />
                      <label className="fk">
                        <input
                          type="checkbox"
                          checked={paceFleksibel}
                          onChange={(e) => setPaceFleksibel(e.target.checked)}
                        />
                        Fleksibel
                      </label>
                    </div>
                    {showErrors && !paceFleksibel && !pace.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Isi target pace atau centang Fleksibel.
                      </div>
                    )}
                  </div>

                  {/* Lokasi Kumpul: Alamat Lengkap */}
                  <div className="fg">
                    <label>Lokasi Kumpul: Alamat Lengkap *</label>
                    <input
                      type="text"
                      placeholder="Mis. Gerbang Utama ITS, Jl. Raya ITS"
                      value={alamatKumpul}
                      onChange={(e) => setAlamatKumpul(e.target.value)}
                    />
                    {showErrors && !alamatKumpul.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Lokasi Kumpul: Link Google Maps */}
                  <div className="fg">
                    <label>Lokasi Kumpul: Link Google Maps *</label>
                    <input
                      type="url"
                      placeholder="https://maps.google.com/..."
                      value={mapsKumpul}
                      onChange={(e) => setMapsKumpul(e.target.value)}
                    />
                    {showErrors && !mapsKumpul.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Kontak WhatsApp */}
                  <div className="fg">
                    <label>WhatsApp (link) *</label>
                    <input
                      type="url"
                      placeholder="https://wa.me/628..."
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                    />
                    {showErrors && !whatsapp.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Kontak Instagram */}
                  <div className="fg">
                    <label>Instagram (link) *</label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/..."
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                    {showErrors && !instagram.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Email (opsional) */}
                  <div className="fg">
                    <label>Email (opsional)</label>
                    <input
                      type="email"
                      placeholder="kontak@komunitas.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Website (opsional) */}
                  <div className="fg">
                    <label>Website (opsional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {/* Media Sosial Lain (opsional) */}
                  <div className="fg">
                    <label>Media Sosial Lain (opsional)</label>
                    <SosmedListInput
                      items={extraSosmed}
                      onChange={setExtraSosmed}
                    />
                  </div>

                  {/* Tombol Aksi Bawah */}
                  <div className="fbar">
                    <Link className="btn out" href="/">
                      Kembali
                    </Link>
                    <button type="submit" className="btn">
                      Kirim untuk Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </AuthGate>
        </section>
      </div>
    </main>
  );
}
