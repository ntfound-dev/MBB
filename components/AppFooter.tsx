import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { siteData } from "@/lib/site-data";

export function AppFooter() {
  return (
    <footer className="podh-footer">
      <div className="podh-shell podh-footer-grid">
        <div className="podh-footer-brand">
          <div className="podh-footer-logo">
            <img src="/podh-logo.png" alt="Logo PODH" />
          </div>
          <div>
            <strong>PODH</strong>
            <p>{siteData.organization.name}</p>
            <small>{siteData.organization.location}</small>
          </div>
        </div>

        <div className="podh-footer-links">
          <div>
            <strong>Link</strong>
            <Link href="/">Beranda</Link>
            <Link href="/pelatihan">Daftar Pelatihan</Link>
            <Link href="/#tentang">Tentang PODH</Link>
            <Link href="/permintaan">Permintaan</Link>
          </div>
          <div>
            <strong>Program</strong>
            <Link href="/pelatihan/welder">Welder</Link>
            <Link href="/pelatihan/k3">K3</Link>
            <Link href="/pelatihan/operator-crane">Operator Crane</Link>
            <Link href="/pelatihan/rigger">Rigger</Link>
          </div>
        </div>

        <div className="podh-footer-contact">
          <strong>Hubungi PODH</strong>
          <p>Gunakan kanal resmi untuk informasi pelatihan dan pendaftaran.</p>
          <SocialLinks />
        </div>
      </div>

      <div className="podh-shell podh-footer-bottom">
        <span>© 2026 PODH. All rights reserved.</span>
        <span>{siteData.organization.tagline}</span>
      </div>
    </footer>
  );
}
