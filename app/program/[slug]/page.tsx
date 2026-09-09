import Link from "next/link";
import { notFound } from "next/navigation";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { getProgramDetail, programDetails } from "@/lib/program-data";

export function generateStaticParams() {
  return programDetails.map((program) => ({ slug: program.slug }));
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramDetail(slug);
  if (!program) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="program-page-hero">
          <div className="container">
            <span className="section-label">Program Pelatihan</span>
            <h1>{program.name}</h1>
            <p>{program.subtitle}</p>
            <div className="program-page-price">{program.price}</div>
          </div>
        </section>
        <section className="section section-white">
          <div className="container program-page-grid">
            <article>
              <h2>Tentang program</h2>
              <p>{program.description}</p>
              <h3>Materi utama</h3>
              <div className="list-grid">{program.topics.map((item) => <div key={item}>{item}</div>)}</div>
              <h3>Fasilitas</h3>
              <div className="list-grid">{program.facilities.map((item) => <div key={item}>{item}</div>)}</div>
            </article>
            <aside className="program-summary-card">
              <div><small>Biaya</small><strong>{program.price}</strong></div>
              <div><small>Lokasi</small><strong>{program.location}</strong></div>
              <div><small>Durasi</small><strong>{program.duration}</strong></div>
              <div><small>Sertifikat</small><strong>{program.certificate}</strong></div>
              <h3>Persyaratan</h3>
              <ul>{program.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="button button-primary summary-button" href="/daftar">Daftar Program</Link>
            </aside>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
