"use client";

// app/daftar/event/page.tsx
// Halaman formulir pengajuan Event Lari (khusus Mitra) sesuai prototipe dan PRD.

import React, { useState } from "react";
import Link from "next/link";
import { AuthGate, SubmissionDone, PoinListInput, SosmedListInput, SosmedItem } from "@/components/FormComponents";

export default function DaftarEventPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State Formulir
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [posterUploaded, setPosterUploaded] = useState(false);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [extraSosmed, setExtraSosmed] = useState<SosmedItem[]>([]);
  const [tglBuka, setTglBuka] = useState("");
  const [tglTutup, setTglTutup] = useState("");
  const [tglMulai, setTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");
  const [alamat, setAlamat] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [area, setArea] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [jenisEvent, setJenisEvent] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [catPrices, setCatPrices] = useState<Record<string, string>>({});
  const [linkDaftar, setLinkDaftar] = useState("");
  const [linkGuidebook, setLinkGuidebook] = useState("");

  // State Galat Validasi
  const [showErrors, setShowErrors] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const toggleCategory = (cat: string) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handlePriceChange = (cat: string, price: string) => {
    setCatPrices({ ...catPrices, [cat]: price });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    // Cek kolom wajib
    const isBasicValid =
      judul.trim() !== "" &&
      deskripsi.trim() !== "" &&
      organizer.trim() !== "" &&
      posterUploaded &&
      benefits.length > 0 &&
      whatsapp.trim() !== "" &&
      instagram.trim() !== "" &&
      tglBuka !== "" &&
      tglTutup !== "" &&
      tglMulai !== "" &&
      tglSelesai !== "" &&
      alamat.trim() !== "" &&
      mapsUrl.trim() !== "" &&
      area !== "" &&
      (kecamatan.trim() !== "" || kabupaten.trim() !== "") &&
      jenisEvent !== "" &&
      selectedCats.length > 0 &&
      selectedCats.every((cat) => catPrices[cat] !== undefined && catPrices[cat].trim() !== "") &&
      linkDaftar.trim() !== "";

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
          <h1>Daftarkan Event Lari</h1>
        </div>
      </div>

      <div className="w">
        <section className="s narrow">
          {/* Tab Pilihan Jenis (Tanpa ikon) */}
          <div className="chips">
            <Link className="chip on" href="/daftar/event">
              Event Lari
            </Link>
            <Link className="chip" href="/daftar/komunitas">
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
                  Event Lari
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Judul Event */}
                  <div className="fg">
                    <label>Judul Event *</label>
                    <input
                      type="text"
                      placeholder="Mis. Surabaya Sunset Run 2026"
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                    />
                    {showErrors && !judul.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Deskripsi Event */}
                  <div className="fg">
                    <label>Deskripsi Event *</label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan deskripsi lengkap mengenai event lari..."
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                    />
                    {showErrors && !deskripsi.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Nama Organizer */}
                  <div className="fg">
                    <label>Nama Organizer *</label>
                    <input
                      type="text"
                      placeholder="Nama komunitas atau penyelenggara"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                    />
                    {showErrors && !organizer.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Gambar Poster */}
                  <div className="fg">
                    <label>Gambar Poster *</label>
                    <div
                      className={`up ${posterUploaded ? "ok" : ""}`}
                      onClick={() => setPosterUploaded(true)}
                    >
                      {posterUploaded
                        ? "✓ Poster berhasil dipilih: poster-event.jpg"
                        : "PNG/JPG/WEBP maks. 5 MB, disarankan rasio 4:5 (Klik untuk simulasi unggah)"}
                    </div>
                    {showErrors && !posterUploaded && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Fasilitas dan Benefit */}
                  <div className="fg">
                    <label>Fasilitas dan Benefit *</label>
                    <PoinListInput
                      placeholder="Mis. medali finisher, jersey, refreshment"
                      items={benefits}
                      onChange={setBenefits}
                    />
                    {showErrors && benefits.length === 0 && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi (tambahkan minimal 1 poin fasilitas).
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

                  {/* Media Sosial Lain (opsional) */}
                  <div className="fg">
                    <label>Media Sosial Lain (opsional)</label>
                    <SosmedListInput
                      items={extraSosmed}
                      onChange={setExtraSosmed}
                    />
                  </div>

                  {/* Tanggal Pendaftaran */}
                  <div className="two">
                    <div className="fg">
                      <label>Tanggal Pembukaan Pendaftaran *</label>
                      <input
                        type="date"
                        value={tglBuka}
                        onChange={(e) => setTglBuka(e.target.value)}
                      />
                      {showErrors && !tglBuka && (
                        <div className="err" style={{ display: "block" }}>
                          Wajib diisi.
                        </div>
                      )}
                    </div>
                    <div className="fg">
                      <label>Tanggal Penutupan Pendaftaran *</label>
                      <input
                        type="date"
                        value={tglTutup}
                        onChange={(e) => setTglTutup(e.target.value)}
                      />
                      {showErrors && !tglTutup && (
                        <div className="err" style={{ display: "block" }}>
                          Wajib diisi.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tanggal Pelaksanaan Event */}
                  <div className="two">
                    <div className="fg">
                      <label>Tanggal Mulai Event *</label>
                      <input
                        type="date"
                        value={tglMulai}
                        onChange={(e) => setTglMulai(e.target.value)}
                      />
                      {showErrors && !tglMulai && (
                        <div className="err" style={{ display: "block" }}>
                          Wajib diisi.
                        </div>
                      )}
                    </div>
                    <div className="fg">
                      <label>Tanggal Selesai Event *</label>
                      <input
                        type="date"
                        value={tglSelesai}
                        onChange={(e) => setTglSelesai(e.target.value)}
                      />
                      {showErrors && !tglSelesai && (
                        <div className="err" style={{ display: "block" }}>
                          Wajib diisi.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Alamat Lengkap */}
                  <div className="fg">
                    <label>Alamat Lengkap *</label>
                    <input
                      type="text"
                      placeholder="Mis. Taman Bungkul, Jl. Raya Darmo"
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

                  {/* Wilayah (Kecamatan / Kabupaten) */}
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

                  {/* Jenis Event */}
                  <div className="fg">
                    <label>Jenis Event *</label>
                    <select
                      value={jenisEvent}
                      onChange={(e) => setJenisEvent(e.target.value)}
                    >
                      <option value="">Pilih Jenis...</option>
                      <option value="Fun Run">Fun Run</option>
                      <option value="Marathon">Marathon</option>
                      <option value="Half Marathon">Half Marathon</option>
                      <option value="Trail Run">Trail Run</option>
                      <option value="Ultra Marathon">Ultra Marathon</option>
                    </select>
                    {showErrors && !jenisEvent && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Kategori Event */}
                  <div className="fg">
                    <label>Kategori Event *</label>
                    <div className="mc">
                      {["5K", "10K", "21K", "42K"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`chip ${selectedCats.includes(cat) ? "on" : ""}`}
                          onClick={() => toggleCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    {showErrors && selectedCats.length === 0 && (
                      <div className="err" style={{ display: "block" }}>
                        Pilih minimal satu kategori jarak.
                      </div>
                    )}
                  </div>

                  {/* Biaya Registrasi per Kategori */}
                  {selectedCats.length > 0 && (
                    <div className="fg">
                      <label>Biaya Registrasi (Rp) *</label>
                      {selectedCats.map((cat) => (
                        <div key={cat} className="fx">
                          <label className="fk" style={{ minWidth: "44px" }}>
                            {cat}
                          </label>
                          <input
                            type="number"
                            min="0"
                            placeholder="Rp (isi 0 jika gratis)"
                            value={catPrices[cat] || ""}
                            onChange={(e) => handlePriceChange(cat, e.target.value)}
                          />
                        </div>
                      ))}
                      {showErrors &&
                        selectedCats.some(
                          (cat) => catPrices[cat] === undefined || catPrices[cat].trim() === ""
                        ) && (
                          <div className="err" style={{ display: "block" }}>
                            Isi biaya pendaftaran untuk setiap kategori yang dipilih.
                          </div>
                        )}
                    </div>
                  )}

                  {/* Link Pendaftaran */}
                  <div className="fg">
                    <label>Link Pendaftaran *</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={linkDaftar}
                      onChange={(e) => setLinkDaftar(e.target.value)}
                    />
                    {showErrors && !linkDaftar.trim() && (
                      <div className="err" style={{ display: "block" }}>
                        Kolom ini wajib diisi.
                      </div>
                    )}
                  </div>

                  {/* Link Guidebook (opsional) */}
                  <div className="fg">
                    <label>Link Guidebook / Ketentuan (opsional)</label>
                    <input
                      type="url"
                      placeholder="https://... (opsional)"
                      value={linkGuidebook}
                      onChange={(e) => setLinkGuidebook(e.target.value)}
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
