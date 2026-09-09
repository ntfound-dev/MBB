"use client";

import { useMemo, useState } from "react";

const programs = [
  { value: "welder", label: "Welder", code: "WEL" },
  { value: "rigger", label: "Rigger", code: "RIG" },
  { value: "k3", label: "K3", code: "K3" },
] as const;

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("welder");
  const [domicile, setDomicile] = useState("");

  const selectedProgram = useMemo(
    () => programs.find((item) => item.value === program) ?? programs[0],
    [program],
  );

  if (submitted) {
    return (
      <div className="success-card">
        <span>DEMO / MOCK</span>
        <h2>Pendaftaran simulasi berhasil.</h2>
        <p>
          Form ini tidak mengirim atau menyimpan data ke server. Ringkasan di bawah
          hanya untuk melihat alur aplikasi.
        </p>

        <div className="registration-summary">
          <div>
            <small>ID Pendaftaran</small>
            <strong>{registrationId}</strong>
          </div>
          <div>
            <small>Season</small>
            <strong>Season 1</strong>
          </div>
          <div>
            <small>Program</small>
            <strong>{selectedProgram.label}</strong>
          </div>
          <div>
            <small>Nama</small>
            <strong>{name}</strong>
          </div>
        </div>

        <button
          className="button button-primary"
          type="button"
          onClick={() => {
            setSubmitted(false);
            setRegistrationId("");
          }}
        >
          Buat Simulasi Baru
        </button>
      </div>
    );
  }

  return (
    <form
      className="registration-form"
      onSubmit={(event) => {
        event.preventDefault();

        const suffix = String(Date.now()).slice(-5);
        setRegistrationId(`MBB-S1-${selectedProgram.code}-${suffix}`);
        setSubmitted(true);
      }}
    >
      <div className="form-banner">
        <strong>Season 1 • Demo</strong>
        <span>Tidak ada data nyata yang disimpan.</span>
      </div>

      <label>
        <span>Season</span>
        <input value="Season 1 — Pelatihan Kompetensi 2026" readOnly />
      </label>

      <label>
        <span>Program Pelatihan</span>
        <select
          value={program}
          onChange={(event) => setProgram(event.target.value)}
        >
          {programs.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Nama Lengkap</span>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Contoh: Ahmad Maulana"
        />
      </label>

      <label>
        <span>Nomor WhatsApp</span>
        <input
          required
          inputMode="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="08xxxxxxxxxx"
        />
      </label>

      <label>
        <span>Domisili</span>
        <input
          required
          value={domicile}
          onChange={(event) => setDomicile(event.target.value)}
          placeholder="Muara Badak / daerah sekitar"
        />
      </label>

      <label className="checkbox-row">
        <input required type="checkbox" />
        <span>
          Saya memahami bahwa formulir ini masih demo dan belum menyimpan data
          peserta.
        </span>
      </label>

      <button className="button button-primary form-submit" type="submit">
        Kirim Pendaftaran Demo
      </button>
    </form>
  );
}
