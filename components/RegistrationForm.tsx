"use client";

import { useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiFileText,
  FiShield,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { trainings } from "@/lib/training-data";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function RegistrationForm({
  initialTrainingSlug = "",
}: {
  initialTrainingSlug?: string;
}) {
  const [trainingSlug, setTrainingSlug] = useState(
    trainings.some((item) => item.slug === initialTrainingSlug)
      ? initialTrainingSlug
      : trainings[0]?.slug ?? "",
  );
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [phone, setPhone] = useState("");
  const [domicile, setDomicile] = useState("");
  const [documentPdf, setDocumentPdf] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const training = useMemo(
    () => trainings.find((item) => item.slug === trainingSlug) ?? trainings[0],
    [trainingSlug],
  );

  function chooseFile(file: File | null) {
    if (!file) {
      setDocumentPdf(null);
      setFileError("");
      return;
    }

    if (file.type !== "application/pdf") {
      setDocumentPdf(null);
      setFileError("Dokumen harus berupa PDF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setDocumentPdf(null);
      setFileError("Ukuran PDF maksimal 10 MB.");
      return;
    }

    setDocumentPdf(file);
    setFileError("");
  }

  if (submitted) {
    return (
      <div className="registration-success">
        <div className="registration-success-icon">
          <FiCheckCircle />
        </div>
        <span className="eyebrow">SIMULASI PENDAFTARAN</span>
        <h2>Data siap diverifikasi.</h2>
        <p>
          Form ini belum terhubung ke database produksi. Tidak ada NIK atau PDF
          yang dikirim ke server pada simulasi ini.
        </p>

        <div className="registration-summary">
          <div>
            <small>ID</small>
            <strong>{registrationId}</strong>
          </div>
          <div>
            <small>Pelatihan</small>
            <strong>{training?.title ?? "-"}</strong>
          </div>
          <div>
            <small>Peserta</small>
            <strong>{name}</strong>
          </div>
          <div>
            <small>Status</small>
            <strong>Menunggu sistem produksi</strong>
          </div>
        </div>

        <button
          type="button"
          className="podh-button podh-button-dark"
          onClick={() => {
            setSubmitted(false);
            setRegistrationId("");
          }}
        >
          Kembali ke Form
        </button>
      </div>
    );
  }

  return (
    <form
      className="registration-form-v3"
      onSubmit={(event) => {
        event.preventDefault();

        if (!documentPdf) {
          setFileError("Satu PDF dokumen persyaratan wajib dipilih.");
          return;
        }

        setRegistrationId(`PODH-${String(Date.now()).slice(-6)}`);
        setSubmitted(true);
      }}
    >
      <div className="registration-heading">
        <span className="eyebrow">PENDAFTARAN PESERTA</span>
        <h2>Lengkapi data pendaftaran.</h2>
        <p>
          Isi data sesuai identitas. Satu PDF dapat berisi KTP, KK, dan dokumen
          pendukung lain yang diminta pada batch.
        </p>
      </div>

      <div className="registration-fields">
        <label className="field-full">
          <span>Pelatihan</span>
          <select
            value={trainingSlug}
            onChange={(event) => setTrainingSlug(event.target.value)}
            required
          >
            {trainings.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
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
            pattern="08[0-9]{8,13}"
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
            placeholder="Domisili peserta"
          />
        </label>
      </div>

      <section className="document-upload">
        <div className="document-upload-head">
          <div>
            <span className="eyebrow">DOKUMEN</span>
            <h3>Satu file PDF</h3>
            <p>KTP + KK + dokumen pendukung dalam satu PDF.</p>
          </div>
          <small>PDF • Maks. 10 MB</small>
        </div>

        {documentPdf ? (
          <div className="document-selected">
            <FiFileText />
            <div>
              <strong>{documentPdf.name}</strong>
              <small>{formatFileSize(documentPdf.size)}</small>
            </div>
            <button
              type="button"
              aria-label="Hapus PDF"
              onClick={() => chooseFile(null)}
            >
              <FiX />
            </button>
          </div>
        ) : (
          <label className="document-picker">
            <FiUploadCloud />
            <div>
              <strong>Pilih PDF dokumen peserta</strong>
              <small>File hanya dibaca lokal pada mode simulasi.</small>
            </div>
            <span>Pilih File</span>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) =>
                chooseFile(event.target.files?.[0] ?? null)
              }
            />
          </label>
        )}

        {fileError && <p className="field-error">{fileError}</p>}

        <div className="privacy-note">
          <FiShield />
          <p>
            Sistem produksi harus menggunakan penyimpanan privat dan akses
            terotorisasi untuk NIK dan dokumen peserta.
          </p>
        </div>
      </section>

      <label className="registration-consent">
        <input type="checkbox" required />
        <span>
          Saya memahami form ini masih simulasi antarmuka dan belum menyimpan
          data peserta ke server.
        </span>
      </label>

      <button type="submit" className="podh-button podh-button-accent">
        Kirim Pendaftaran
      </button>
    </form>
  );
}
