"use client";

import { useState } from "react";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="success-card">
        <span>DEMO / MOCK</span>
        <h2>Pendaftaran simulasi berhasil.</h2>
        <p>Data tidak dikirim ke server. Form ini hanya untuk review alur aplikasi.</p>
        <button className="button button-primary" type="button" onClick={() => setSubmitted(false)}>
          Isi Ulang
        </button>
      </div>
    );
  }

  return (
    <form
      className="registration-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="form-banner">
        <strong>Mode Demo</strong>
        <span>Tidak ada data nyata yang disimpan.</span>
      </div>

      <label>
        <span>Nama Lengkap</span>
        <input required placeholder="Contoh: Ahmad Maulana" />
      </label>
      <label>
        <span>Nomor WhatsApp</span>
        <input required placeholder="08xxxxxxxxxx" />
      </label>
      <label>
        <span>Program</span>
        <select defaultValue="welder">
          <option value="welder">Welder</option>
          <option value="rigger">Rigger</option>
          <option value="k3">K3</option>
        </select>
      </label>
      <label>
        <span>Domisili</span>
        <input required placeholder="Muara Badak / daerah sekitar" />
      </label>
      <label className="checkbox-row">
        <input required type="checkbox" />
        <span>Saya memahami bahwa halaman ini masih demo.</span>
      </label>
      <button className="button button-primary form-submit" type="submit">
        Kirim Pendaftaran Demo
      </button>
    </form>
  );
}
