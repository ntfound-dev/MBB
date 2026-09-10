"use client";

import Link from "next/link";
import { useState } from "react";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { siteData } from "@/lib/site-data";

const nav = [
  ["Beranda", "/"],
  ["Program", "/pelatihan"],
  ["Tentang PODH", "/#tentang"],
  ["Kegiatan", "/#kegiatan"],
  ["Permintaan", "/permintaan"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const accountEnabled =
    process.env.NEXT_PUBLIC_ENABLE_ACCOUNT === "true";

  return (
    <header className="podh-header">
      <div className="podh-shell podh-header-inner">
        <Link className="podh-brand" href="/" aria-label={siteData.organization.name}>
          <img src="/podh-logo.png" alt="" aria-hidden="true" />
          <span>
            <strong>PODH</strong>
            <small>Persatuan Operator, Driver, Helper</small>
          </span>
        </Link>

        <nav className={open ? "podh-nav podh-nav-open" : "podh-nav"}>
          {nav.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}

          {accountEnabled && (
            <Link className="podh-login-mobile" href="/anggota/masuk" onClick={() => setOpen(false)}>
              <FiLogIn /> Masuk
            </Link>
          )}
        </nav>

        <div className="podh-header-actions">
          <Link className="podh-header-cta" href="/anggota/daftar">
            Daftar Anggota
          </Link>

          {accountEnabled && (
            <Link className="podh-login" href="/anggota/masuk">
              <FiLogIn />
              <span>Masuk</span>
            </Link>
          )}

          <button
            className="podh-menu"
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
