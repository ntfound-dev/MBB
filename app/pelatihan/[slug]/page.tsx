import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import {
  getStatusLabel,
  getTraining,
  trainings,
  type TrainingKind,
} from "@/lib/training-data";
import { FiLayers, FiTool, FiTruck } from "react-icons/fi";

export function generateStaticParams() {
  return trainings.map((training) => ({ slug: training.slug }));
}

function DetailIcon({ kind }: { kind: TrainingKind }) {
  if (kind === "k3") return <FiShield />;
  if (kind === "crane") return <FiTruck />;
  if (kind === "rigger") return <FiLayers />;
  return <FiTool />;
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const training = getTraining(slug);

  if (!training) notFound();

  const statusLabel = getStatusLabel(training.status);
  const canRegister = training.status === "open";

  return (
    <>
      <Header />
      <main>
        <section className="training-detail-hero">
          <div className="podh-shell">
            <div className="training-detail-title">
              <span className="eyebrow eyebrow-light">{training.category}</span>
              <h1>{training.title}</h1>
              <div className="training-detail-registration">
                <span>Kategori: {training.category}</span>
                <span>Pendaftaran: {training.registrationWindow}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="training-detail-main">
          <div className="podh-shell training-detail-layout">
            <div>
              <div className={`detail-poster detail-poster-${training.kind}`}>
                <div className="detail-poster-header">
                  <img src="/podh-logo.png" alt="PODH" />
                  <span className={`training-status training-status-${training.status}`}>
                    {statusLabel}
                  </span>
                </div>

                <div className="detail-poster-icon">
                  <DetailIcon kind={training.kind} />
                </div>

                <div className="detail-poster-copy">
                  <span>PELATIHAN KOMPETENSI</span>
                  <strong>{training.category}</strong>
                  <small>PODH • {training.location}</small>
                </div>
              </div>

              <article className="training-description-card">
                <span className="eyebrow">INFORMASI</span>
                <h2>Deskripsi</h2>
                <p>{training.description}</p>

                <h3>Materi utama</h3>
                <ul>
                  {training.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            </div>

            <aside className="training-facts-card">
              <div>
                <FiCalendar />
                <span>
                  <small>Tanggal Pelatihan</small>
                  <strong>{training.trainingDate}</strong>
                </span>
              </div>
              <div>
                <FiClock />
                <span>
                  <small>Metode</small>
                  <strong>{training.method}</strong>
                </span>
              </div>
              <div>
                <FiMapPin />
                <span>
                  <small>Lokasi</small>
                  <strong>{training.location}</strong>
                </span>
              </div>
              <div>
                <FiUsers />
                <span>
                  <small>Kuota Peserta</small>
                  <strong>{training.quota}</strong>
                </span>
              </div>
              <div>
                <FiUser />
                <span>
                  <small>Instruktur / Fasilitator</small>
                  <strong>{training.facilitator}</strong>
                </span>
              </div>
              <div>
                <FiDollarSign />
                <span>
                  <small>Biaya Pelatihan</small>
                  <strong>{training.fee}</strong>
                </span>
              </div>
              <div>
                <FiShield />
                <span>
                  <small>Sertifikasi</small>
                  <strong>{training.certificate}</strong>
                </span>
              </div>

              {canRegister ? (
                <Link
                  className="podh-button podh-button-accent training-register-button"
                  href={`/daftar?training=${training.slug}`}
                >
                  Daftar Sekarang
                </Link>
              ) : (
                <button
                  className="training-register-button training-register-disabled"
                  type="button"
                  disabled
                >
                  {training.status === "closed"
                    ? "Pendaftaran Ditutup"
                    : "Pendaftaran Segera Dibuka"}
                </button>
              )}

              <p className="training-facts-note">
                Pembayaran hanya mengikuti instruksi resmi setelah informasi
                batch dan metode pembayaran ditetapkan.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
