import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { RequestForm } from "@/components/RequestForm";

export const metadata = {
  title: "Permintaan Pelatihan Perusahaan",
};

export default function RequestPage() {
  const cvName = process.env.NEXT_PUBLIC_CV_NAME || "";

  return (
    <>
      <Header />
      <main>
        <section className="request-hero">
          <div className="podh-shell">
            <span className="eyebrow eyebrow-light">PELATIHAN PERMINTAAN</span>
            <h1>Kebutuhan khusus perusahaan.</h1>
            <p>
              Jalur ini dipisahkan dari pelatihan reguler PODH untuk menjaga
              identitas organisasi dan administrasi komersial tetap jelas.
            </p>
          </div>
        </section>

        <section className="podh-section">
          <div className="podh-shell request-layout">
            <RequestForm />

            <aside className="entity-separation-card">
              <span className="eyebrow">PEMISAHAN ENTITAS</span>
              <h2>PODH bukan CV.</h2>
              <p>
                PODH adalah organisasi. Untuk pelatihan khusus perusahaan,
                penawaran, kontrak, invoice, pembayaran, dan administrasi
                komersial ditangani melalui CV terpisah yang dimiliki Ketua
                sebagai badan usaha pelaksana.
              </p>

              <div>
                <small>Badan usaha pelaksana</small>
                <strong>{cvName || "Nama CV akan dicantumkan setelah ditetapkan"}</strong>
              </div>

              <p className="entity-note">
                Informasi ini dibuat jelas agar perusahaan mengetahui entitas
                yang menjadi pihak dalam transaksi komersial.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
