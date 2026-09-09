import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { siteData } from "@/lib/site-data";

export function AppFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <span className="footer-mark">{siteData.organization.shortName}</span>
          <div>
            <strong>{siteData.organization.name}</strong>
            <p>{siteData.organization.tagline}</p>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <small>Navigasi</small>
            <Link href="/#program">Program</Link>
            <Link href="/karier">Pendampingan Karier</Link>
            <Link href="/daftar">Pendaftaran</Link>
          </div>
          <div>
            <small>Program</small>
            <Link href="/program/welder">Welder</Link>
            <Link href="/program/rigger">Rigger</Link>
            <Link href="/program/k3">K3</Link>
          </div>
        </div>
        <div className="footer-social">
          <small>Ikuti & Hubungi Kami</small>
          <SocialLinks />
          <span>{siteData.organization.location}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {siteData.organization.name}. All rights reserved.</span>
        <span>Pelatihan & Pengembangan SDM Lokal</span>
      </div>
    </footer>
  );
}
