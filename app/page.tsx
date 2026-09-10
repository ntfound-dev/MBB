import Link from "next/link";
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiEye,
  FiTarget,
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

      <main className="podh-home">
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

        <section className="podh-section home-training-section">
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

        <section className="training-paths home-training-paths">
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

        {/* PODH HOMEPAGE SHOWCASE V1 */}
        <section
          id="kegiatan"
          className="podh-showcase-section podh-facilitators-section"
        >
          <div className="podh-shell">
            <div className="podh-showcase-heading">
              <span className="eyebrow">INSTRUKTUR & FASILITATOR</span>
              <h2>Belajar dari tenaga yang tepat.</h2>
              <p>
                Profil instruktur ditampilkan saat nama, kompetensi, dan perannya
                pada batch telah ditetapkan secara resmi.
              </p>
            </div>

            <div className="podh-facilitator-grid">
              {[
                {
                  code: "WLD",
                  title: "Instruktur Welder",
                  meta: "Pengelasan",
                  description:
                    "Profil instruktur, pengalaman, dan lingkup kompetensi akan tampil pada batch resmi.",
                },
                {
                  code: "K3",
                  title: "Fasilitator K3",
                  meta: "Keselamatan Kerja",
                  description:
                    "Nama fasilitator dan ruang lingkup materi akan diumumkan bersama detail pelatihan.",
                },
                {
                  code: "CRN",
                  title: "Instruktur Operator Crane",
                  meta: "Operasi Alat",
                  description:
                    "Kompetensi instruktur akan dicantumkan setelah jadwal dan penyelenggara ditetapkan.",
                },
                {
                  code: "RIG",
                  title: "Instruktur Rigger",
                  meta: "Rigging & Lifting",
                  description:
                    "Profil pengajar akan tampil ketika batch rigging dan lifting dibuka secara resmi.",
                },
              ].map((item) => (
                <article className="podh-facilitator-card" key={item.code}>
                  <div className="podh-facilitator-visual">
                    <div className="podh-facilitator-mark">{item.code}</div>
                  </div>
                  <div className="podh-facilitator-body">
                    <span>{item.meta}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="podh-showcase-section podh-partner-section">
          <div className="podh-shell">
            <div className="podh-showcase-heading podh-showcase-heading-dark">
              <span className="eyebrow eyebrow-light">MITRA PODH</span>
              <h2>Kolaborasi yang bisa diverifikasi.</h2>
              <p>
                Nama dan logo mitra hanya ditampilkan setelah kerja sama,
                penyelenggara, atau jalur sertifikasinya telah dikonfirmasi.
              </p>
            </div>

            <div className="podh-partner-grid">
              {[
                ["LP", "Lembaga Pelatihan", "Penyelenggara pelatihan resmi"],
                ["LS", "Lembaga Sertifikasi", "Penerbit atau jalur sertifikasi"],
                ["MI", "Mitra Industri", "Kolaborasi kebutuhan tenaga kerja"],
                ["K3", "Keselamatan Kerja", "Pendukung kompetensi dan budaya K3"],
                ["PK", "Partner Kompetensi", "Kolaborasi instruktur dan materi"],
                ["KP", "Komunitas & Pendukung", "Ekosistem kegiatan PODH"],
              ].map(([code, title, description]) => (
                <article className="podh-partner-card" key={title}>
                  <div className="podh-partner-logo-slot">{code}</div>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span>DITAMPILKAN SETELAH RESMI</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="podh-showcase-section podh-testimonial-section">
          <div className="podh-shell podh-testimonial-layout">
            <div className="podh-testimonial-intro">
              <span className="eyebrow">SUARA PESERTA</span>
              <h2>Testimoni dari pengalaman nyata.</h2>
              <p>
                Testimoni tidak dibuat sebagai contoh fiktif. Bagian ini sudah
                disiapkan dan akan diisi setelah peserta benar-benar menyelesaikan
                program PODH.
              </p>
            </div>

            <article className="podh-testimonial-card">
              <div className="podh-quote-mark">“</div>
              <blockquote>
                Pengalaman peserta, hasil pelatihan, dan kesan terhadap program
                akan ditampilkan di sini setelah mendapat persetujuan untuk
                dipublikasikan.
              </blockquote>
              <div className="podh-testimonial-meta">
                <div className="podh-testimonial-avatar">P</div>
                <div>
                  <strong>Peserta PODH</strong>
                  <span>Menunggu batch pertama selesai</span>
                </div>
              </div>
            </article>
          </div>
        </section>

      </main>

      <AppFooter />
    </>
  );
}
