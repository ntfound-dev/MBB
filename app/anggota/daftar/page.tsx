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
            <h1>Lengkapi data keanggotaan.</h1>
            <p>
              Masuk dengan Google lebih dulu, kemudian isi identitas anggota
              untuk diperiksa oleh admin PODH.
            </p>
          </div>
        </section>

        <section className="podh-section member-registration-section">
          <div className="podh-shell member-registration-layout">
            <MemberRegistrationForm />

            <aside className="member-flow-card">
              <span className="eyebrow">ALUR ANGGOTA</span>
              <h2>Dari akun sampai aktif.</h2>

              <ol>
                <li>
                  <span>01</span>
                  <div>
                    <strong>Masuk dengan Google</strong>
                    <small>Google hanya dipakai untuk autentikasi akun.</small>
                  </div>
                </li>

                <li>
                  <span>02</span>
                  <div>
                    <strong>Lengkapi identitas</strong>
                    <small>Isi data keanggotaan PODH dengan benar.</small>
                  </div>
                </li>

                <li>
                  <span>03</span>
                  <div>
                    <strong>Verifikasi admin</strong>
                    <small>Admin memeriksa kelengkapan dan validitas data.</small>
                  </div>
                </li>

                <li>
                  <span>04</span>
                  <div>
                    <strong>Keanggotaan aktif</strong>
                    <small>
                      Setelah disetujui, anggota memperoleh ID PODH dan akses
                      program sesuai ketentuan.
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
