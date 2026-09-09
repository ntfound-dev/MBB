import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { ProgramTabs } from "@/components/ProgramTabs";
import { SocialLinks } from "@/components/SocialLinks";
import { siteData } from "@/lib/site-data";

const activities = [
  {
    category: "Pelatihan",
    title: "Informasi batch dan agenda pelatihan",
    description:
      "Pengumuman program, agenda, dan informasi peserta dipublikasikan melalui kanal resmi.",
  },
  {
    category: "Kegiatan",
    title: "Dokumentasi kegiatan lapangan",
    description:
      "Dokumentasi pelaksanaan kegiatan menjadi bagian dari keterbukaan informasi dan arsip organisasi.",
  },
  {
    category: "Pengembangan SDM",
    title: "Edukasi kesiapan kerja industri",
    description:
      "Materi informasi membantu masyarakat memahami pentingnya kompetensi, disiplin, dan keselamatan kerja.",
  },
] as const;

const team = [
  { role: "Pendiri / Direktur", name: "Akan diumumkan" },
  { role: "Koordinator", name: "Akan diumumkan" },
  { role: "Sekretaris Pelatihan", name: "Akan diumumkan" },
  { role: "Administrasi & Lapangan", name: "Akan diumumkan" },
] as const;

export default function HomePage() {
  const registrationUrl = process.env.NEXT_PUBLIC_REGISTRATION_URL || "/daftar";
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";

  return (
    <>
      <Header />

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="section-label">
                {siteData.organization.location}
              </span>

              <h1>
                Membangun kompetensi lokal untuk peluang kerja yang lebih luas.
              </h1>

              <p>
                Muara Badak Bersatu menghadirkan akses pelatihan yang lebih dekat
                bagi masyarakat, dengan fokus pada kompetensi, keselamatan, dan
                kesiapan menghadapi lingkungan kerja industri.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#program">
                  Lihat Program
                </a>
                <a className="button button-secondary" href={registrationUrl}>
                  Pendaftaran
                </a>
              </div>

              <div className="hero-footnote">
                <span>Welder</span>
                <span>Rigger</span>
                <span>K3</span>
              </div>
            </div>

            <aside className="hero-identity" aria-label="Muara Badak Bersatu">
              <div className="hero-identity-top">
                <span>PELATIHAN & PENGEMBANGAN SDM</span>
                <span>KALIMANTAN TIMUR</span>
              </div>

              <div className="hero-identity-main">
                <small>MUARA BADAK</small>
                <strong>BERSATU</strong>
                <p>Kompetensi lokal. Kesiapan industri.</p>
              </div>

              <div className="hero-identity-bottom">
                <span>Skill</span>
                <span>Safety</span>
                <span>Readiness</span>
              </div>
            </aside>
          </div>
        </section>

        <section id="tentang" className="section section-white">
          <div className="container about-grid">
            <div>
              <span className="section-label">Tentang Kami</span>
              <h2>
                Membawa akses pengembangan kompetensi lebih dekat ke daerah.
              </h2>
            </div>

            <div className="body-copy">
              <p>
                Muara Badak memiliki masyarakat yang hidup berdampingan dengan
                aktivitas industri. Namun peluang kerja sering membutuhkan
                kompetensi, kesiapan administrasi, dan pemahaman keselamatan yang
                spesifik.
              </p>
              <p>
                Muara Badak Bersatu hadir sebagai wadah lokal untuk membantu
                masyarakat mengakses program pengembangan kompetensi secara lebih
                dekat dan terorganisir.
              </p>
              <p>
                Kami berfokus pada pelaksanaan program yang tertib, informasi yang
                jelas, serta proses pelatihan yang dapat dipertanggungjawabkan.
              </p>
            </div>
          </div>
        </section>

        <section className="section principles-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">Prinsip Kami</span>
                <h2>Program yang dekat, tertib, dan relevan.</h2>
              </div>
              <p>
                Fokus kami bukan hanya menyelenggarakan kegiatan, tetapi membantu
                peserta memahami kompetensi dan budaya kerja yang dibutuhkan di
                lingkungan industri.
              </p>
            </div>

            <div className="value-grid">
              {siteData.values.map((value, index) => (
                <article className="value-card" key={value.title}>
                  <span>0{index + 1}</span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="program" className="section section-white">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">Program Pelatihan</span>
                <h2>Kompetensi untuk lingkungan kerja industri.</h2>
              </div>
              <p>
                Program awal berfokus pada bidang yang dekat dengan aktivitas
                lapangan dan keselamatan kerja.
              </p>
            </div>

            <ProgramTabs />
          </div>
        </section>

        <section id="alur" className="section section-dark">
          <div className="container">
            <div className="section-heading section-heading-dark">
              <div>
                <span className="section-label">Cara Mengikuti</span>
                <h2>Proses yang jelas dari pendaftaran sampai hasil.</h2>
              </div>
              <p>
                Detail setiap batch akan diinformasikan secara resmi sebelum
                pendaftaran dibuka.
              </p>
            </div>

            <div className="process-list">
              {siteData.publicProcess.map((step, index) => (
                <article className="process-row" key={step.title}>
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section career-teaser-section">
          <div className="container career-teaser-grid">
            <div>
              <span className="section-label">Setelah Pelatihan</span>
              <h2>Dari kompetensi menuju peluang kerja.</h2>
              <p>Alumni dapat memperoleh pendampingan informasi lowongan, administrasi, dan penghubungan peluang kerja sesuai kebutuhan dan ketersediaan perusahaan.</p>
              <a className="button button-primary" href="/karier">Lihat Pendampingan Karier</a>
            </div>
            <div className="career-teaser-card">
              <div><span>01</span><strong>Database alumni</strong></div>
              <div><span>02</span><strong>Informasi lowongan</strong></div>
              <div><span>03</span><strong>Pendampingan administrasi</strong></div>
              <div><span>04</span><strong>Penghubungan peluang</strong></div>
            </div>
          </div>
        </section>

        <section id="kegiatan" className="section section-white">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">Kegiatan & Informasi</span>
                <h2>Ruang informasi resmi untuk masyarakat.</h2>
              </div>
              <p>
                Nantinya bagian ini dapat menampilkan berita, pengumuman batch,
                dokumentasi kegiatan, dan informasi pengembangan SDM.
              </p>
            </div>

            <div className="activity-grid">
              {activities.map((activity) => (
                <article className="activity-card" key={activity.title}>
                  <div className="activity-cover">
                    <span>{activity.category}</span>
                  </div>
                  <div className="activity-content">
                    <small>{activity.category}</small>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tim" className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">Organisasi</span>
                <h2>Struktur yang bertanggung jawab atas pelaksanaan program.</h2>
              </div>
              <p>
                Nama dan struktur resmi dapat ditampilkan setelah badan usaha dan
                susunan pengurus ditetapkan.
              </p>
            </div>

            <div className="team-grid">
              {team.map((member, index) => (
                <article className="team-card" key={member.role}>
                  <span className="team-index">0{index + 1}</span>
                  <div className="team-placeholder" aria-hidden="true">
                    <span>{siteData.organization.shortName}</span>
                  </div>
                  <small>{member.role}</small>
                  <h3>{member.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section section-white">
          <div className="container faq-grid">
            <div>
              <span className="section-label">Pertanyaan Umum</span>
              <h2>Informasi penting sebelum mendaftar.</h2>
              <p className="section-intro">
                Informasi khusus seperti biaya, jadwal, persyaratan, dan penerbit
                sertifikat akan mengikuti pengumuman resmi masing-masing program.
              </p>
            </div>

            <Faq />
          </div>
        </section>

        <section id="daftar" className="registration-section">
          <div className="container registration-card">
            <div>
              <span className="section-label">Pendaftaran</span>
              <h2>Tertarik mengikuti program pelatihan?</h2>
              <p>
                Gunakan hanya kanal resmi Muara Badak Bersatu untuk mendapatkan
                informasi batch, persyaratan, biaya, dan pendaftaran.
              </p>
            </div>

            <div className="registration-actions">
              <a className="button button-accent" href={registrationUrl}>
                Buka Pendaftaran
              </a>

              {whatsappUrl && (
                <a className="button button-dark-outline" href={whatsappUrl}>
                  WhatsApp Resmi
                </a>
              )}
            </div>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <span className="footer-mark">{siteData.organization.shortName}</span>
            <div>
              <strong>{siteData.organization.name}</strong>
              <p>{siteData.organization.tagline}</p>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <small>Navigasi</small>
              <a href="#tentang">Tentang</a>
              <a href="#program">Program</a>
              <a href="#kegiatan">Kegiatan</a>
              <a href="#faq">FAQ</a>
            </div>

            <div>
              <small>Informasi</small>
              <a href="#alur">Cara Mengikuti</a>
              <a href="/karier">Pendampingan Karier</a>
              <a href="/daftar">Pendaftaran</a>
            </div>
          </div>

          <div className="footer-social">
            <small>Ikuti & Hubungi Kami</small>
            <SocialLinks />
            <span>{siteData.organization.location}</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 {siteData.organization.name}. All rights reserved.</span>
          <span>Pelatihan & Pengembangan SDM Lokal</span>
        </div>
      </footer>
    </>
  );
}
