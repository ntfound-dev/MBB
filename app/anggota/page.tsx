import Link from "next/link";
import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Akun Anggota PODH",
};

export default function MemberAccountPage() {
  return (
    <>
      <Header />

      <main className="member-account-page">
        <section className="podh-shell member-dashboard">
          <div className="member-dashboard-heading">
            <div>
              <span className="eyebrow">PREVIEW AKUN ANGGOTA</span>
              <h1>Akun PODH.</h1>
              <p>
                Satu akun untuk identitas anggota, status keanggotaan, dan
                program kompetensi yang diikuti.
              </p>
            </div>

            <div className="member-status-badge">
              <FiClock />
              <span>
                <small>Status</small>
                <strong>Menunggu Verifikasi</strong>
              </span>
            </div>
          </div>

          <div className="member-dashboard-grid">
            <article>
              <FiUser />
              <span>PROFIL</span>
              <h2>Profil Anggota</h2>
              <p>Identitas, kontak, domisili, dan bidang profesi.</p>
            </article>

            <article>
              <FiCheckCircle />
              <span>KEANGGOTAAN</span>
              <h2>Status Anggota</h2>
              <p>Status verifikasi dan informasi keanggotaan PODH.</p>
            </article>

            <article>
              <FiBookOpen />
              <span>PROGRAM</span>
              <h2>Program Saya</h2>
              <p>
                Setelah akun aktif, program yang diikuti akan muncul di sini.
              </p>
            </article>
          </div>

          <section className="member-program-gate">
            <div>
              <span className="eyebrow eyebrow-light">AKSES PROGRAM</span>
              <h2>Program dibuka setelah keanggotaan aktif.</h2>
              <p>
                Anggota yang sudah diverifikasi dapat memilih program
                kompetensi dari katalog PODH.
              </p>
            </div>

            <Link className="podh-button podh-button-accent" href="/pelatihan">
              Lihat Program
            </Link>
          </section>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
