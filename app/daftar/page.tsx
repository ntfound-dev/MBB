import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { RegistrationForm } from "@/components/RegistrationForm";

export const metadata = { title: "Pendaftaran Pelatihan" };

export default function RegistrationPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container page-hero-grid">
            <div>
              <span className="section-label">Pendaftaran Demo</span>
              <h1>Daftar program pelatihan.</h1>
              <p>Pilih Welder, Rigger, atau K3. Halaman ini masih mock dan tidak menyimpan data peserta.</p>
            </div>
            <aside className="mock-warning">
              <strong>MOCK MODE</strong>
              <p>Tidak ada NIK, pembayaran, atau identitas asli yang diproses.</p>
            </aside>
          </div>
        </section>
        <section className="section section-white">
          <div className="container form-layout">
            <RegistrationForm />
            <aside className="form-aside">
              <span className="section-label">Informasi Sementara</span>
              <h2>Biaya pelatihan</h2>
              <strong className="big-price">Rp7.500.000</strong>
              <p>Harga ini mengikuti informasi sementara dan dapat berubah setelah keputusan rapat.</p>
              <hr />
              <h3>Program tersedia</h3>
              <ul><li>Welder</li><li>Rigger</li><li>K3</li></ul>
            </aside>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
