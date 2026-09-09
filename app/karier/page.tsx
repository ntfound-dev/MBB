import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";

const services = [
  ["01", "Database Alumni", "Data kompetensi alumni dapat dikelola untuk memudahkan pencarian kandidat sesuai kebutuhan."],
  ["02", "Informasi Lowongan", "Alumni dapat menerima informasi peluang kerja yang relevan dengan kompetensi mereka."],
  ["03", "Pendampingan Administrasi", "Dokumen dasar seperti CV dan kelengkapan berkas dapat dibantu persiapannya."],
  ["04", "Penghubungan Peluang", "Kandidat dapat diperkenalkan kepada peluang perusahaan sesuai kebutuhan dan ketersediaan."],
] as const;

export const metadata = { title: "Pendampingan Karier" };

export default function CareerPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero career-page-hero">
          <div className="container">
            <span className="section-label">Pendampingan Karier</span>
            <h1>Dari pelatihan menuju peluang kerja.</h1>
            <p>Muara Badak Bersatu dapat membantu alumni memperoleh akses informasi, administrasi, dan penghubungan peluang kerja sesuai kebutuhan dan ketersediaan perusahaan.</p>
          </div>
        </section>
        <section className="section section-white">
          <div className="container career-service-grid">
            {services.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h2>{title}</h2><p>{text}</p></article>
            ))}
          </div>
        </section>
        <section className="career-disclaimer">
          <div className="container">
            <strong>Catatan penting</strong>
            <p>Pendampingan karier bukan jaminan diterima bekerja. Rekrutmen tetap mengikuti kebutuhan dan keputusan masing-masing perusahaan.</p>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
