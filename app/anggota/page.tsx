import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { MemberLogoutButton } from "@/components/MemberLogoutButton";
import { PODH_AUTH_COOKIE, podhApiUrl } from "@/lib/podh-api";

export const metadata = {
  title: "Akun Anggota PODH",
};

type UserPayload = {
  name: string;
  email: string;
  status: string;
  member: null | {
    member_number: string | null;
    full_name: string;
    phone: string;
    birth_date: string;
    address: string;
    verification_status: string;
    verified_at: string | null;
  };
};

function statusLabel(status: string) {
  if (status === "verified") return "Terverifikasi";
  if (status === "rejected") return "Perlu Perbaikan";
  if (status === "suspended") return "Ditangguhkan";
  if (status === "pending_verification") return "Menunggu Verifikasi";
  return "Profil Belum Lengkap";
}

export default async function MemberAccountPage() {
  const token = (await cookies()).get(PODH_AUTH_COOKIE)?.value;

  if (!token) {
    redirect("/anggota/masuk");
  }

  const response = await fetch(podhApiUrl("/me"), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/anggota/masuk");
  }

  if (!response.ok) {
    throw new Error("Gagal memuat akun anggota PODH.");
  }

  const data = (await response.json()) as { user: UserPayload };
  const user = data.user;
  const member = user.member;
  const verificationStatus =
    member?.verification_status || user.status || "registered";
  const verified = verificationStatus === "verified";

  return (
    <>
      <Header />

      <main className="member-account-page">
        <section className="podh-shell member-dashboard">
          <div className="member-dashboard-heading">
            <div>
              <span className="eyebrow">AKUN ANGGOTA</span>
              <h1>{member?.full_name || user.name}</h1>
              <p>{user.email}</p>
              {member?.member_number && (
                <p>
                  <strong>ID Anggota: {member.member_number}</strong>
                </p>
              )}
            </div>

            <div className="member-status-badge">
              {verified ? <FiCheckCircle /> : <FiClock />}
              <span>
                <small>Status</small>
                <strong>{statusLabel(verificationStatus)}</strong>
              </span>
            </div>
          </div>

          <div className="member-dashboard-grid">
            <article>
              <FiUser />
              <span>PROFIL</span>
              <h2>Profil Anggota</h2>
              <p>
                {member
                  ? `${member.phone} • ${member.address}`
                  : "Data keanggotaan belum dilengkapi."}
              </p>
              {!member && (
                <Link href="/anggota/daftar">Lengkapi profil</Link>
              )}
            </article>

            <article>
              <FiCheckCircle />
              <span>KEANGGOTAAN</span>
              <h2>{statusLabel(verificationStatus)}</h2>
              <p>
                {verified
                  ? "Data telah disetujui admin PODH."
                  : "Akses penuh dibuka setelah verifikasi admin selesai."}
              </p>
            </article>

            <article>
              <FiBookOpen />
              <span>PROGRAM</span>
              <h2>Program Saya</h2>
              <p>
                {verified
                  ? "Akun sudah dapat melanjutkan ke program yang tersedia."
                  : "Program dibuka setelah keanggotaan aktif."}
              </p>
            </article>
          </div>

          <section className="member-program-gate">
            <div>
              <span className="eyebrow eyebrow-light">AKSES PROGRAM</span>
              <h2>
                {verified
                  ? "Keanggotaan aktif."
                  : "Menunggu keanggotaan aktif."}
              </h2>
              <p>
                {verified
                  ? "Silakan lihat program kompetensi PODH yang tersedia."
                  : "Admin akan memeriksa data sebelum akses program dibuka."}
              </p>
            </div>

            <div className="member-login-actions">
              {verified && (
                <Link
                  className="podh-button podh-button-accent"
                  href="/pelatihan"
                >
                  Lihat Program
                </Link>
              )}
              <MemberLogoutButton />
            </div>
          </section>
        </section>
      </main>

      <AppFooter />
    </>
  );
}
