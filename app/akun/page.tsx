import Link from "next/link";
import { FiBookOpen, FiUser } from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Akun Peserta",
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="account-page">
        <section className="account-card account-preview-card">
          <span className="eyebrow">PREVIEW AKUN PESERTA</span>
          <h1>Area akun PODH.</h1>
          <p>
            Halaman ini menunjukkan struktur yang akan digunakan setelah auth
            dan database produksi tersedia.
          </p>

          <div className="account-preview-grid">
            <div>
              <FiUser />
              <strong>Profil Saya</strong>
              <span>Identitas & kontak peserta</span>
            </div>
            <div>
              <FiBookOpen />
              <strong>Pelatihan Saya</strong>
              <span>Status pendaftaran & riwayat pelatihan</span>
            </div>
          </div>

          <Link className="podh-button podh-button-dark" href="/pelatihan">
            Kembali ke Pelatihan
          </Link>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
