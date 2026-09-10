"use client";

import { useState } from "react";
import {
  FiCheckCircle,
  FiShield,
  FiUser,
} from "react-icons/fi";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function MemberRegistrationForm() {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [phone, setPhone] = useState("");
  const [domicile, setDomicile] = useState("");
  const [profession, setProfession] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="member-registration-success">
        <div className="member-success-icon">
          <FiCheckCircle />
        </div>

        <span className="eyebrow">PENDAFTARAN ANGGOTA</span>
        <h2>Data anggota siap diverifikasi.</h2>

        <p>
          Ini masih simulasi antarmuka. Data belum disimpan ke database
          produksi.
        </p>

        <div className="member-status-preview">
          <small>Status Keanggotaan</small>
          <strong>Menunggu Verifikasi</strong>
        </div>

        <button
          type="button"
          className="podh-button podh-button-dark"
          onClick={() => setSubmitted(false)}
        >
          Kembali
        </button>
      </section>
    );
  }

  return (
    <form
      className="member-registration-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="member-form-heading">
        <span className="eyebrow">AKUN ANGGOTA PODH</span>
        <h2>Daftar sebagai anggota.</h2>
        <p>
          Akun anggota menjadi identitas utama sebelum mengikuti program
          pelatihan PODH.
        </p>
      </div>

      <div className="member-fields">
        <label className="member-field-full">
          <span>Nama Lengkap</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Sesuai identitas"
            autoComplete="name"
          />
        </label>

        <label>
          <span>NIK</span>
          <input
            required
            inputMode="numeric"
            minLength={16}
            maxLength={16}
            pattern="[0-9]{16}"
            value={nik}
            onChange={(event) =>
              setNik(digitsOnly(event.target.value).slice(0, 16))
            }
            placeholder="16 digit NIK"
          />
        </label>

        <label>
          <span>Nomor HP / WhatsApp</span>
          <input
            required
            inputMode="tel"
            minLength={10}
            maxLength={15}
            value={phone}
            onChange={(event) =>
              setPhone(digitsOnly(event.target.value).slice(0, 15))
            }
            placeholder="08xxxxxxxxxx"
            autoComplete="tel"
          />
        </label>

        <label>
          <span>Domisili</span>
          <input
            required
            value={domicile}
            onChange={(event) => setDomicile(event.target.value)}
            placeholder="Contoh: Muara Badak"
          />
        </label>

        <label>
          <span>Profesi / Bidang</span>
          <input
            required
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
            placeholder="Operator, Driver, Helper, Welder, dll."
          />
        </label>
      </div>

      <div className="member-privacy-note">
        <FiShield />
        <p>
          NIK dan data anggota nantinya hanya boleh tersimpan pada sistem
          privat dengan akses admin yang terotorisasi.
        </p>
      </div>

      <label className="member-consent">
        <input type="checkbox" required />
        <span>
          Saya menyatakan data yang diberikan benar dan memahami pendaftaran
          anggota akan melalui proses verifikasi.
        </span>
      </label>

      <button type="submit" className="podh-button podh-button-accent">
        <FiUser />
        Daftar Akun PODH
      </button>
    </form>
  );
}
