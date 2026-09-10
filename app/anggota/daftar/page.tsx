import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { MemberRegistrationForm } from "@/components/MemberRegistrationForm";

export const metadata = {
  title: "Daftar Anggota PODH",
};

export default function MemberRegistrationPage() {
  return (
    <>
      <Header />

      <main>
        <section className="member-hero">
          <div className="podh-shell">
            <span className="eyebrow eyebrow-light">KEANGGOTAAN PODH</span>
            <h1>Mulai dari akun anggota.</h1>
            <p>
              Keanggotaan PODH menjadi pintu masuk sebelum anggota mengikuti
              program kompetensi dan pelatihan.
            </p>
          </div>
        </section>

        <section className="podh-section member-registration-section">
          <div className="podh-shell member-registration-layout">
            <MemberRegistrationForm />

            <aside className="member-flow-card">
              <span className="eyebrow">ALUR ANGGOTA</span>
              <h2>Dari pendaftaran sampai aktif.</h2>

              <ol>
                <li>
                  <span>01</span>
                  <div>
                    <strong>Daftar akun PODH</strong>
                    <small>Lengkapi identitas dan data dasar anggota.</small>
                  </div>
                </li>

                <li>
                  <span>02</span>
                  <div>
                    <strong>Verifikasi data</strong>
                    <small>Admin memeriksa kelengkapan dan validitas.</small>
                  </div>
                </li>

                <li>
                  <span>03</span>
                  <div>
                    <strong>Keanggotaan aktif</strong>
                    <small>Akun mendapatkan status anggota PODH.</small>
                  </div>
                </li>

                <li>
                  <span>04</span>
                  <div>
                    <strong>Daftar program</strong>
                    <small>
                      Setelah aktif, anggota dapat memilih program pelatihan.
                    </small>
                  </div>
                </li>
              </ol>

              <Link className="member-login-link" href="/anggota/masuk">
                Sudah punya akun? Masuk
                <FiArrowRight />
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
