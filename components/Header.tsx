"use client";

import { useState } from "react";
import { siteData } from "@/lib/site-data";

const nav = [
  ["Tentang", "/#tentang"],
  ["Program", "/#program"],
  ["Cara Mengikuti", "/#alur"],
  ["Karier", "/karier"],
  ["Kegiatan", "/#kegiatan"],
  ["FAQ", "/#faq"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label={siteData.organization.name}>
          <span className="brand-mark">{siteData.organization.shortName}</span>
          <span className="brand-copy">
            <strong>{siteData.organization.name}</strong>
            <small>{siteData.organization.tagline}</small>
          </span>
        </a>

        <nav className={open ? "navigation navigation-open" : "navigation"}>
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>

        <a className="header-cta" href="/daftar">Daftar Pelatihan</a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-label="Buka navigasi"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>
    </header>
  );
}
