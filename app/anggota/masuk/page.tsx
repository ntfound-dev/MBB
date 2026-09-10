import Link from "next/link";
import { FiLock, FiUser } from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Masuk Akun Anggota PODH",
};

export default function MemberLoginPage() {
  return (
    <>
      <Header />

      <main className="account-page">
        <section className="account-card member-login-card">
          <div className="account-icon">
            <FiUser />
          </div>

          <span className="eyebrow">AKUN ANGGOTA PODH</span>
          <h1>Masuk sebagai anggota.</h1>

          <p>
            Setelah autentikasi produksi aktif, anggota dapat melihat status
            keanggotaan, profil, program yang diikuti, dan progres pelatihan.
          </p>

          <div className="account-security">
            <FiLock />
            <span>
              Login produksi belum diaktifkan. Halaman ini masih menyiapkan
              struktur akun anggota.
            </span>
          </div>

          <div className="member-login-actions">
            <Link
              className="podh-button podh-button-dark"
              href="/anggota"
            >
              Preview Akun
            </Link>

            <Link
              className="podh-button podh-button-outline"
              href="/anggota/daftar"
            >
              Daftar Anggota
            </Link>
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
