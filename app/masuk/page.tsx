import Link from "next/link";
import { FiLock, FiUser } from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Masuk",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="account-page">
        <section className="account-card">
          <div className="account-icon"><FiUser /></div>
          <span className="eyebrow">AKUN PESERTA</span>
          <h1>Masuk ke akun PODH.</h1>
          <p>
            Arsitektur akun disiapkan untuk Profil Saya dan Pelatihan Saya.
            Login belum diaktifkan sampai backend autentikasi yang aman
            terhubung.
          </p>

          <div className="account-security">
            <FiLock />
            <span>Tidak ada password atau identitas yang disimpan oleh halaman ini.</span>
          </div>

          <Link className="podh-button podh-button-dark" href="/pelatihan">
            Lihat Pelatihan
          </Link>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
