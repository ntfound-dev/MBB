"use client";

import { useMemo, useState } from "react";
import { FiArrowRight, FiBriefcase } from "react-icons/fi";

export function RequestForm() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [training, setTraining] = useState("");
  const [participants, setParticipants] = useState("");
  const [notes, setNotes] = useState("");

  const targetUrl = process.env.NEXT_PUBLIC_REQUEST_WHATSAPP_URL || "";

  const message = useMemo(
    () =>
      [
        "Halo, saya ingin mengajukan permintaan pelatihan perusahaan.",
        `Perusahaan: ${company || "-"}`,
        `Kontak: ${contact || "-"}`,
        `Kebutuhan pelatihan: ${training || "-"}`,
        `Jumlah peserta: ${participants || "-"}`,
        `Catatan: ${notes || "-"}`,
      ].join("\n"),
    [company, contact, training, participants, notes],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!targetUrl) return;

    const separator = targetUrl.includes("?") ? "&" : "?";
    window.open(
      `${targetUrl}${separator}text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="request-form-heading">
        <FiBriefcase />
        <div>
          <span className="eyebrow">PERMINTAAN PERUSAHAAN</span>
          <h2>Jelaskan kebutuhan pelatihan.</h2>
        </div>
      </div>

      <div className="registration-fields">
        <label>
          <span>Nama Perusahaan / Organisasi</span>
          <input
            required
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Nama perusahaan"
          />
        </label>

        <label>
          <span>Kontak PIC</span>
          <input
            required
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="Nama + WhatsApp"
          />
        </label>

        <label>
          <span>Kebutuhan Pelatihan</span>
          <input
            required
            value={training}
            onChange={(event) => setTraining(event.target.value)}
            placeholder="Contoh: Operator Crane"
          />
        </label>

        <label>
          <span>Jumlah Peserta</span>
          <input
            required
            inputMode="numeric"
            value={participants}
            onChange={(event) => setParticipants(event.target.value)}
            placeholder="Contoh: 20"
          />
        </label>

        <label className="field-full">
          <span>Catatan</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Lokasi, target waktu, kebutuhan khusus, dan informasi lain."
            rows={5}
          />
        </label>
      </div>

      {targetUrl ? (
        <button className="podh-button podh-button-accent" type="submit">
          Lanjutkan ke Kanal Permintaan <FiArrowRight />
        </button>
      ) : (
        <div className="request-not-ready">
          Kanal permintaan belum ditetapkan. Isi
          <code>NEXT_PUBLIC_REQUEST_WHATSAPP_URL</code> setelah nomor resmi CV
          siap digunakan.
        </div>
      )}
    </form>
  );
}
