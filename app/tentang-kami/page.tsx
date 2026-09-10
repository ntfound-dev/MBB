import type { Metadata } from "next";
import {
  FiCheckCircle,
  FiEye,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiTarget,
} from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { SocialLinks } from "@/components/SocialLinks";
import { siteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Tentang Kami | PODH",
  description:
    "Profil, visi, misi, nilai utama, kontak, dan informasi umum Persatuan Operator, Driver, Helper.",
};

export default function AboutPage() {
  const email = process.env.NEXT_PUBLIC_EMAIL || "";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";

  return (
    <>
      <Header />

      <main className="podh-about-page">
        <section className="podh-about-page-hero">
          <div className="podh-shell">
            <span className="eyebrow eyebrow-light">TENTANG KAMI</span>
            <h1>Persatuan Operator, Driver, Helper.</h1>
            <p>
              Wadah pengembangan kompetensi tenaga kerja lapangan dan industri
              yang tumbuh dari Muara Badak, Kalimantan Timur.
            </p>
          </div>
        </section>

        <section className="podh-about-page-section">
          <div className="podh-shell">
            <article className="podh-about-story-page">
              <div className="podh-about-story-kicker">LATAR BELAKANG</div>
              <div>
                <h2>Membangun kompetensi dari kebutuhan nyata di lapangan.</h2>
                <p>
                  PODH dibangun untuk mempertemukan anggota dengan akses
                  pelatihan, peningkatan kompetensi, dan kesiapan kerja yang
                  lebih terstruktur. Nama Persatuan Operator, Driver, Helper
                  menjadi identitas organisasi, sementara ruang pengembangan
                  kompetensinya dapat mencakup bidang yang lebih luas sesuai
                  kebutuhan dunia kerja dan industri.
                </p>
                <p>
                  Setiap program diarahkan agar informasinya jelas dan dapat
                  diperiksa. Jadwal, lokasi, kuota, instruktur, biaya, serta
                  lembaga atau mitra sertifikasi ditampilkan setelah ditetapkan
                  secara resmi.
                </p>
              </div>
            </article>

            <div className="podh-about-vm-grid">
              <article className="podh-about-vm-card">
                <div className="podh-about-vm-icon">
                  <FiEye />
                </div>
                <div>
                  <span>VISI</span>
                  <h2>Tenaga lokal yang kompeten dan siap industri.</h2>
                  <p>
                    Menjadi wadah pengembangan kompetensi tenaga kerja lokal
                    yang solid, profesional, dan relevan dengan kebutuhan dunia
                    kerja serta industri.
                  </p>
                </div>
              </article>

              <article className="podh-about-vm-card podh-about-vm-card-dark">
                <div className="podh-about-vm-icon">
                  <FiTarget />
                </div>
                <div>
                  <span>MISI</span>
                  <h2>Membuka akses kompetensi yang jelas dan terarah.</h2>
                  <ul>
                    <li>
                      <FiCheckCircle />
                      <span>
                        Memperluas akses anggota terhadap pelatihan dan
                        pengembangan kompetensi yang relevan.
                      </span>
                    </li>
                    <li>
                      <FiCheckCircle />
                      <span>
                        Menyajikan informasi program secara transparan dan mudah
                        diperiksa sebelum pendaftaran.
                      </span>
                    </li>
                    <li>
                      <FiCheckCircle />
                      <span>
                        Mendorong budaya keselamatan, disiplin, dan
                        profesionalisme tenaga kerja lapangan.
                      </span>
                    </li>
                    <li>
                      <FiCheckCircle />
                      <span>
                        Membangun kolaborasi dengan instruktur, lembaga
                        pelatihan, sertifikasi, dan mitra industri yang relevan.
                      </span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            <article className="podh-about-value-page">
              <div>
                <span>NILAI UTAMA</span>
                <h2>Solid • Kompeten • Lebih Kuat Bersama</h2>
              </div>
              <p>
                Kebersamaan menjadi kekuatan organisasi, kompetensi menjadi
                standar pengembangan, dan setiap langkah diarahkan pada manfaat
                nyata bagi anggota.
              </p>
            </article>
          </div>
        </section>

        <section className="podh-contact-page-section">
          <div className="podh-shell">
            <div className="podh-about-page-heading">
              <span className="eyebrow">KONTAK KAMI</span>
              <h2>Hubungi PODH.</h2>
              <p>
                Gunakan kanal resmi untuk informasi keanggotaan, program,
                pelatihan, dan kegiatan organisasi.
              </p>
            </div>

            <div className="podh-contact-cards">
              <article className="podh-contact-card">
                <div className="podh-contact-card-icon">
                  <FiMapPin />
                </div>
                <span>LOKASI</span>
                <h3>{siteData.organization.location}</h3>
                <p>
                  Detail alamat sekretariat akan ditampilkan setelah alamat
                  operasional organisasi ditetapkan secara resmi.
                </p>
              </article>

              <article className="podh-contact-card">
                <div className="podh-contact-card-icon">
                  <FiMessageCircle />
                </div>
                <span>KANAL RESMI</span>
                <h3>Hubungi kami melalui kanal PODH.</h3>
                <div className="podh-contact-actions">
                  {whatsapp ? (
                    <a href={whatsapp} target="_blank" rel="noreferrer">
                      <FiMessageCircle /> WhatsApp
                    </a>
                  ) : null}
                  {email ? (
                    <a href={`mailto:${email}`}>
                      <FiMail /> {email}
                    </a>
                  ) : null}
                </div>
                {!whatsapp && !email ? (
                  <p>
                    Nomor WhatsApp dan email resmi akan muncul setelah
                    dikonfigurasi.
                  </p>
                ) : null}
                <SocialLinks />
              </article>
            </div>

            <div className="podh-map-card">
              <iframe
                title="Lokasi PODH di Muara Badak"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  siteData.organization.location,
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="podh-about-faq-section podh-faq-section">
          <div className="podh-shell">
            <div className="podh-about-page-heading podh-about-page-heading-center">
              <span className="eyebrow">FAQ</span>
              <h2>Pertanyaan yang sering ditanyakan.</h2>
              <p>
                Informasi dasar mengenai organisasi, keanggotaan, program,
                pendaftaran, sertifikasi, dan permintaan pelatihan.
              </p>
            </div>

            <div className="podh-about-faq-list">
              <Faq />
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
