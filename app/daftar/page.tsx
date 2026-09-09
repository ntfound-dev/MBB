import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { RegistrationForm } from "@/components/RegistrationForm";

export const metadata = {
  title: "Pendaftaran Pelatihan",
};

export default function RegistrationPage() {
  return (
    <>
      <Header />

      <main>
        <section className="page-hero">
          <div className="container page-hero-grid">
            <div>
              <span className="section-label">Pendaftaran • Season 1</span>
              <h1>Pilih program dan mulai pendaftaran.</h1>
              <p>
                Season 1 terdiri dari tiga program pelatihan: Welder, Rigger, dan
                K3. Halaman ini masih berupa simulasi aplikasi.
              </p>
            </div>

            <aside className="mock-warning">
              <strong>MOCK MODE</strong>
              <p>
                Belum ada database, pembayaran, atau identitas peserta asli yang
                diproses.
              </p>
            </aside>
          </div>
        </section>

        <section className="section section-white">
          <div className="container form-layout">
            <RegistrationForm />

            <aside className="form-aside">
              <span className="section-label">Season Aktif</span>
              <h2>Season 1</h2>
              <p>Pelatihan Kompetensi 2026</p>

              <hr />

              <h3>Program</h3>
              <ul>
                <li>Welder</li>
                <li>Rigger</li>
                <li>K3</li>
              </ul>

              <hr />

              <h3>Biaya sementara</h3>
              <strong className="big-price">Rp7.500.000</strong>
              <p>
                Informasi harga masih mengikuti data sementara dan dapat
                disesuaikan setelah keputusan rapat.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
