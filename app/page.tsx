import Link from "next/link";
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiSearch,
} from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { TrainingCard } from "@/components/TrainingCard";
import { featuredTrainings } from "@/lib/training-data";
import { siteData } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <section className="podh-hero">
          <div className="podh-shell podh-hero-card">
            <div className="podh-hero-overlay" />

            <div className="podh-hero-content">
              <span className="eyebrow eyebrow-light">
                PODH TRAINING & COMPETENCY
              </span>
              <h1>
                <span>PODH</span>
                <br />
                Persatuan Operator,
                <br />
                Driver, Helper
              </h1>
              <p>
                {siteData.organization.description} Akses informasi pelatihan
                dibuat jelas, terstruktur, dan mudah diverifikasi.
              </p>

              <div className="podh-hero-actions">
                <Link className="podh-button podh-button-accent" href="/pelatihan">
                  <FiSearch /> Cari Pelatihan
                </Link>
                <Link className="podh-button podh-button-ghost" href="/pelatihan">
                  <FiCalendar /> Kalender / Katalog
                </Link>
              </div>
            </div>

            <div className="podh-hero-logo-wrap">
              <img src="/podh-logo.png" alt="Logo PODH" />
            </div>
          </div>
        </section>

        <section className="podh-section">
          <div className="podh-shell">
            <div className="podh-section-heading podh-section-heading-center">
              <span className="eyebrow">PELATIHAN TERBARU</span>
              <h2>Program Kompetensi PODH</h2>
              <p>
                Status, jadwal, kuota, instruktur, biaya, dan lembaga
                sertifikasi hanya ditampilkan setelah informasinya ditetapkan.
              </p>
            </div>

            <div className="training-grid">
              {featuredTrainings.slice(0, 4).map((training) => (
                <TrainingCard key={training.slug} training={training} />
              ))}
            </div>

            <div className="podh-center-action">
              <Link className="podh-button podh-button-outline" href="/pelatihan">
                Lihat Semua Pelatihan <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <section className="training-paths">
          <div className="training-path training-path-regular">
            <FiCalendar />
            <h2>Reguler</h2>
            <p>
              Pelatihan terjadwal yang dibuka untuk peserta umum sesuai batch
              yang tersedia.
            </p>
            <Link href="/pelatihan">
              Jelajahi <FiArrowRight />
            </Link>
          </div>

          <div className="training-path training-path-request">
            <FiBriefcase />
            <h2>Permintaan</h2>
            <p>
              Kebutuhan pelatihan khusus perusahaan diproses melalui jalur
              komersial yang terpisah dari organisasi PODH.
            </p>
            <Link href="/permintaan">
              Ajukan Permintaan <FiArrowRight />
            </Link>
          </div>
        </section>

        <section id="tentang" className="podh-section podh-about-section">
          <div className="podh-shell podh-about-grid">
            <div>
              <span className="eyebrow">TENTANG PODH</span>
              <h2>Nama organisasi, program kompetensi yang lebih luas.</h2>
            </div>

            <div className="podh-about-copy">
              <p>
                PODH adalah singkatan dari Persatuan Operator, Driver, Helper.
                Nama tersebut menjadi identitas organisasi.
              </p>
              <p>
                Program organisasi tidak dibatasi oleh tiga nama profesi di
                dalam singkatan tersebut. Fokus awal pengembangan kompetensi
                mencakup Welder, K3, Operator Crane, dan Rigger.
              </p>
              <p>
                Setiap batch dibuat sebagai halaman yang dapat diperiksa:
                tanggal pendaftaran, tanggal pelatihan, metode, lokasi, kuota,
                instruktur, biaya, dan informasi sertifikasi.
              </p>
            </div>
          </div>
        </section>

        <section className="podh-section trust-section">
          <div className="podh-shell">
            <div className="podh-section-heading">
              <span className="eyebrow">INFORMASI YANG DAPAT DIPERIKSA</span>
              <h2>Detail sebelum peserta memutuskan mendaftar.</h2>
            </div>

            <div className="trust-grid">
              {[
                "Tanggal pendaftaran & pelatihan",
                "Lokasi & metode pelaksanaan",
                "Kuota peserta",
                "Nama instruktur / fasilitator",
                "Biaya pelatihan",
                "Lembaga atau mitra sertifikasi",
              ].map((item) => (
                <div key={item} className="trust-item">
                  <FiCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kegiatan" className="podh-section podh-activities">
          <div className="podh-shell">
            <div className="podh-section-heading podh-section-heading-center">
              <span className="eyebrow">KEGIATAN PODH</span>
              <h2>Dokumentasi akan tumbuh bersama kegiatan nyata.</h2>
              <p>
                Foto kegiatan, instruktur, testimoni, dan partner tidak
                ditampilkan sebagai data fiktif. Bagian ini siap diisi setelah
                kegiatan resmi berjalan.
              </p>
            </div>

            <div className="activity-preview-grid">
              <div>
                <strong>Pelatihan</strong>
                <span>Dokumentasi batch</span>
              </div>
              <div>
                <strong>Keselamatan</strong>
                <span>Edukasi lapangan</span>
              </div>
              <div>
                <strong>Organisasi</strong>
                <span>Agenda & kegiatan</span>
              </div>
            </div>
          </div>
        </section>

        <section className="podh-section podh-faq-section">
          <div className="podh-shell faq-layout-v3">
            <div>
              <span className="eyebrow">PERTANYAAN UMUM</span>
              <h2>Informasi dasar sebelum mendaftar.</h2>
            </div>
            <Faq />
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
