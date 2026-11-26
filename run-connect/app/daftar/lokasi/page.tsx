"use client";

// app/daftar/lokasi/page.tsx
// Halaman formulir pengajuan Lokasi Lari (khusus Pengguna Lari) sesuai prototipe dan PRD.

import React, { useState } from "react";
import Link from "next/link";
import { AuthGate, SubmissionDone, PoinListInput } from "@/components/FormComponents";

export default function DaftarLokasiPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State Formulir
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [fotoUploaded, setFotoUploaded] = useState(false);
  const [jamBuka, setJamBuka] = useState("");
  const [jamTutup, setJamTutup] = useState("");
  const [keramaian, setKeramaian] = useState("");
  const [area, setArea] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");

  // Parkir
  const [parkirTipe, setParkirTipe] = useState<"Gratis" | "Berbayar" | "">("");
  const [parkirTarif, setParkirTarif] = useState("");
  const [parkirStnk, setParkirStnk] = useState("");

  // Fasilitas & Catatan
  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [catatan, setCatatan] = useState("");

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

    const isParkirValid =
      parkirTipe === "Gratis" ||
      (parkirTipe === "Berbayar" && parkirTarif.trim() !== "" && parkirStnk !== "");

    const isBasicValid =
      nama.trim() !== "" &&
      alamat.trim() !== "" &&
      mapsUrl.trim() !== "" &&
      fotoUploaded &&
      jamBuka !== "" &&
      jamTutup !== "" &&
      keramaian !== "" &&
      area !== "" &&
      (kecamatan.trim() !== "" || kabupaten.trim() !== "") &&
      isParkirValid &&
      fasilitas.length > 0;

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
          <h1>Daftarkan Lokasi Lari</h1>
        </div>
      </div>

      <div className="w">
        <section className="s narrow">
          {/* Tab Pilihan Jenis (Tanpa ikon) */}
          <div className="chips">
            <Link className="chip" href="/daftar/event">
              Event Lari
            </Link>
            <Link className="chip" href="/daftar/komunitas">
              Komunitas Lari
            </Link>
            <Link className="chip on" href="/daftar/lokasi">
              Lokasi Lari
            </Link>
          </div>

          <AuthGate requiredRole="lari">
            {isSubmitted ? (
              <SubmissionDone />
            ) : (
              <div className="box">
                <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
                  Lokasi Lari
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Nama Tempat */}
                  <div className="fg">
                    <label>Nama Tempat *</label>
                    <input
                      type="text"
                      placeholder="Mis. Taman Bungkul"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                    {showErrors && !nama.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Alamat Lengkap */}
                  <div className="fg">
                    <label>Alamat Lengkap *</label>
                    <input
                      type="text"
                      placeholder="Mis. Jl. Taman Bungkul, Darmo"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                    />
                    {showErrors && !alamat.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Link Google Maps */}
                  <div className="fg">
                    <label>Link Google Maps *</label>
                    <input
                      type="url"
                      placeholder="https://maps.google.com/..."
                      value={mapsUrl}
                      onChange={(e) => setMapsUrl(e.target.value)}
                    />
                    {showErrors && !mapsUrl.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Foto Tempat */}
                  <div className="fg">
                    <label>Foto Tempat *</label>
                    <div
                      className={`up ${fotoUploaded ? "ok" : ""}`}
                      onClick={() => setFotoUploaded(true)}
                    >
                      {fotoUploaded
                        ? "✓ Foto tempat berhasil dipilih: foto-lokasi.jpg"
                        : "Unggah foto tempat lari (Klik untuk simulasi unggah)"}
                    </div>
                    {showErrors && !fotoUploaded && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Jam Operasional */}
                  <div className="two">
                    <div className="fg">
                      <label>Jam Buka *</label>
                      <input
                        type="time"
                        value={jamBuka}
                        onChange={(e) => setJamBuka(e.target.value)}
                      />
                      {showErrors && !jamBuka && (
                        <div className="err" style={{ display: "block" }}>
                          Wajib diisi.
                        </div>
                      )}
                    </div>
                    <div className="fg">
                      <label>Jam Tutup *</label>
                      <input
                        type="time"
                        value={jamTutup}
                        onChange={(e) => setJamTutup(e.target.value)}
                      />
                      {showErrors && !jamTutup && (
                        <div className="err" style={{ display: "block" }}>
                          Wajib diisi.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tingkat Keramaian */}
                  <div className="fg">
                    <label>Tingkat Keramaian *</label>
                    <select
                      value={keramaian}
                      onChange={(e) => setKeramaian(e.target.value)}
                    >
                      <option value="">Pilih Tingkat Keramaian...</option>
                      <option value="Sepi">Sepi</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Ramai">Ramai</option>
                    </select>
                    {showErrors && !keramaian && (
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
                        placeholder="Kecamatan (mis. Wonokromo)"
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

                  {/* Parkir */}
                  <div className="fg">
                    <label>Parkir *</label>
                    <div className="mc">
                      <button
                        type="button"
                        className={`chip ${parkirTipe === "Gratis" ? "on" : ""}`}
                        onClick={() => setParkirTipe("Gratis")}
                      >
                        Gratis
                      </button>
                      <button
                        type="button"
                        className={`chip ${parkirTipe === "Berbayar" ? "on" : ""}`}
                        onClick={() => setParkirTipe("Berbayar")}
                      >
                        Berbayar
                      </button>
                    </div>
                    {parkirTipe === "Berbayar" && (
                      <div className="two pkx" style={{ marginTop: "8px" }}>
                        <input
                          type="number"
                          min="0"
                          placeholder="Tarif (Rp, mis. 2000)"
                          value={parkirTarif}
                          onChange={(e) => setParkirTarif(e.target.value)}
                        />
                        <select
                          value={parkirStnk}
                          onChange={(e) => setParkirStnk(e.target.value)}
                        >
                          <option value="">Perlu STNK?</option>
                          <option value="perlu">Ya, perlu STNK</option>
                          <option value="tanpa">Tidak perlu STNK</option>
                        </select>
                      </div>
                    )}
                    {showErrors &&
                      (!parkirTipe ||
                        (parkirTipe === "Berbayar" &&
                          (!parkirTarif.trim() || !parkirStnk))) && (
                        <div className="err" style={{ display: "block" }}>
                          Pilih status parkir dan lengkapi tarif serta ketentuan STNK.
                        </div>
                      )}
                  </div>

                  {/* Fasilitas */}
                  <div className="fg">
                    <label>Fasilitas *</label>
                    <PoinListInput
                      placeholder="Mis. toilet, musala, jalur teduh, air minum"
                      items={fasilitas}
                      onChange={setFasilitas}
                    />
                    {showErrors && fasilitas.length === 0 && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi (tambahkan minimal 1 fasilitas).
                      </div>
                    )}
                  </div>

                  {/* Catatan (opsional) */}
                  <div className="fg">
                    <label>Catatan (opsional)</label>
                    <textarea
                      rows={2}
                      placeholder="Catatan tambahan mengenai lokasi, jalur lari, atau tips berkunjung..."
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
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
