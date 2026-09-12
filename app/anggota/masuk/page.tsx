import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiUser } from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { podhApiUrl } from "@/lib/podh-api";

export const metadata = {
  title: "Masuk Akun Anggota PODH",
};

export default function MemberLoginPage() {
  const accountEnabled =
    process.env.NEXT_PUBLIC_ENABLE_ACCOUNT === "true";

  const googleLoginUrl = podhApiUrl("/auth/google/redirect");

  return (
    <>
      <Header />

      <main className="account-page">
        <section className="account-card member-login-card">
          <div className="account-icon">
            <FiUser />
          </div>

          <span className="eyebrow">AKUN ANGGOTA PODH</span>
          <h1>Masuk ke akun PODH.</h1>

          <p>
            Google digunakan untuk autentikasi akun. Setelah masuk, calon
            anggota tetap harus melengkapi data keanggotaan dan menunggu
            verifikasi admin PODH.
          </p>

          <div className="account-security">
            <FiLock />
            <span>
              Token login disimpan sebagai cookie HttpOnly dan tidak dibaca
              oleh JavaScript browser.
            </span>
          </div>

          {accountEnabled ? (
            <a
              className="podh-button podh-button-dark"
              href={googleLoginUrl}
            >
              <FcGoogle />
              Masuk dengan Google
            </a>
          ) : (
            <div className="account-security">
              <FiLock />
              <span>
                Login publik belum diaktifkan. Sistem autentikasi sedang
                disiapkan dan diuji.
              </span>
            </div>
          )}

          <div className="member-login-actions">
            <Link
              className="podh-button podh-button-outline"
              href="/anggota/daftar"
            >
              Lihat alur pendaftaran
            </Link>
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
