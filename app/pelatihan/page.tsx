import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { TrainingCard } from "@/components/TrainingCard";
import { trainings } from "@/lib/training-data";

export const metadata = {
  title: "Daftar Pelatihan",
};

export default function TrainingListPage() {
  return (
    <>
      <Header />
      <main>
        <section className="catalog-hero">
          <div className="podh-shell">
            <span className="eyebrow eyebrow-light">DAFTAR PELATIHAN</span>
            <h1>Temukan program kompetensi yang sesuai.</h1>
            <p>
              Baca detail setiap program sebelum mendaftar. Informasi yang belum
              resmi ditampilkan sebagai “akan diumumkan”, bukan diisi dengan
              data perkiraan.
            </p>
          </div>
        </section>

        <section className="podh-section">
          <div className="podh-shell">
            <div className="catalog-filter-row">
              <strong>{trainings.length} Program</strong>
              <span>Welder • K3 • Operator Crane • Rigger</span>
            </div>

            <div className="training-grid">
              {trainings.map((training) => (
                <TrainingCard key={training.slug} training={training} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
