import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { RegistrationForm } from "@/components/RegistrationForm";
import { getTraining } from "@/lib/training-data";

export const metadata = {
  title: "Pendaftaran Pelatihan",
};

export default async function RegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ training?: string }>;
}) {
  const query = await searchParams;
  const selected = query.training ? getTraining(query.training) : undefined;

  return (
    <>
      <Header />
      <main>
        <section className="form-page-hero">
          <div className="podh-shell">
            <span className="eyebrow eyebrow-light">PENDAFTARAN PODH</span>
            <h1>Daftar pelatihan.</h1>
            <p>
              {selected
                ? `Program dipilih: ${selected.title}.`
                : "Pilih program dan lengkapi data peserta."}
            </p>
          </div>
        </section>

        <section className="podh-section">
          <div className="podh-shell registration-layout-v3">
            <RegistrationForm initialTrainingSlug={selected?.slug ?? ""} />

            <aside className="registration-side">
              <span className="eyebrow">ALUR PENDAFTARAN</span>
              <ol>
                <li>
                  <span>01</span>
                  <div>
                    <strong>Pilih pelatihan</strong>
                    <p>Baca detail batch sebelum mengisi data.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Lengkapi identitas</strong>
                    <p>Nama, NIK, WhatsApp, dan domisili.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Upload satu PDF</strong>
                    <p>Gabungkan dokumen yang diminta dalam satu file.</p>
                  </div>
                </li>
                <li>
                  <span>04</span>
                  <div>
                    <strong>Verifikasi</strong>
                    <p>Admin memeriksa pendaftaran pada sistem produksi.</p>
                  </div>
                </li>
              </ol>

              <div className="registration-payment-note">
                <strong>Pembayaran</strong>
                <p>
                  Jika batch berbayar, metode resmi dapat berupa QRIS,
                  transfer, atau cash sesuai pengumuman. Tidak ada cicilan.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
