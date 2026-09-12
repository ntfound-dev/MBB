"use client";

import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiShield,
  FiUser,
} from "react-icons/fi";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

type MemberData = {
  full_name?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  address?: string | null;
  verification_status?: string | null;
};

export function MemberRegistrationForm() {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("pending_verification");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const [meResponse, profileResponse] = await Promise.all([
          fetch("/api/podh-auth/me", { cache: "no-store" }),
          fetch("/api/podh-member/profile", { cache: "no-store" }),
        ]);

        if (!active) {
          return;
        }

        if (meResponse.status === 401) {
          window.location.replace("/anggota/masuk");
          return;
        }

        const meData = await meResponse.json();
        const profileData = await profileResponse.json();

        const member = profileData?.member as MemberData | null;

        setName(member?.full_name || meData?.user?.name || "");
        setPhone(member?.phone || meData?.user?.phone || "");
        setBirthDate(member?.birth_date || "");
        setAddress(member?.address || "");

        if (member?.verification_status) {
          setStatus(member.verification_status);
        }
      } catch {
        setError("Gagal memuat data akun. Silakan coba lagi.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  if (submitted) {
    return (
      <section className="member-registration-success">
        <div className="member-success-icon">
          <FiCheckCircle />
        </div>

        <span className="eyebrow">DATA KEANGGOTAAN</span>
        <h2>Data berhasil disimpan.</h2>

        <p>
          Data keanggotaan sudah masuk ke database PODH dan menunggu
          pemeriksaan admin.
        </p>

        <div className="member-status-preview">
          <small>Status Keanggotaan</small>
          <strong>
            {status === "verified"
              ? "Terverifikasi"
              : status === "rejected"
                ? "Perlu Perbaikan"
                : "Menunggu Verifikasi"}
          </strong>
        </div>

        <a
          className="podh-button podh-button-dark"
          href="/anggota"
        >
          Buka Akun PODH
        </a>
      </section>
    );
  }

  return (
    <form
      className="member-registration-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setSaving(true);

        try {
          const response = await fetch("/api/podh-member/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              full_name: name,
              nik,
              phone,
              birth_date: birthDate,
              address,
            }),
          });

          const data = await response.json();

          if (response.status === 401) {
            window.location.replace("/anggota/masuk");
            return;
          }

          if (!response.ok) {
            const validationMessage = data?.errors
              ? Object.values(data.errors).flat().join(" ")
              : data?.message;

            throw new Error(
              String(validationMessage || "Data gagal disimpan."),
            );
          }

          setStatus(data?.member?.verification_status || "pending_verification");
          setSubmitted(true);
          setNik("");
        } catch (submitError) {
          setError(
            submitError instanceof Error
              ? submitError.message
              : "Data gagal disimpan.",
          );
        } finally {
          setSaving(false);
        }
      }}
    >
      <div className="member-form-heading">
        <span className="eyebrow">DATA KEANGGOTAAN PODH</span>
        <h2>Lengkapi profil anggota.</h2>
        <p>
          Akun Google hanya untuk autentikasi. Keanggotaan PODH baru diproses
          setelah data berikut dikirim dan diverifikasi admin.
        </p>
      </div>

      {error && (
        <div className="account-security" role="alert">
          <FiShield />
          <span>{error}</span>
        </div>
      )}

      <div className="member-fields">
        <label className="member-field-full">
          <span>Nama Lengkap</span>
          <input
            required
            disabled={loading || saving}
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
            disabled={loading || saving}
            inputMode="numeric"
            minLength={16}
            maxLength={16}
            pattern="[0-9]{16}"
            value={nik}
            onChange={(event) =>
              setNik(digitsOnly(event.target.value).slice(0, 16))
            }
            placeholder="16 digit NIK"
            autoComplete="off"
          />
        </label>

        <label>
          <span>Nomor HP / WhatsApp</span>
          <input
            required
            disabled={loading || saving}
            inputMode="tel"
            minLength={9}
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
          <span>Tanggal Lahir</span>
          <input
            required
            disabled={loading || saving}
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            autoComplete="bday"
          />
        </label>

        <label className="member-field-full">
          <span>Alamat / Domisili</span>
          <textarea
            required
            disabled={loading || saving}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Alamat domisili saat ini"
            rows={4}
            autoComplete="street-address"
          />
        </label>
      </div>

      <div className="member-privacy-note">
        <FiShield />
        <p>
          NIK tidak dikirim ke browser setelah tersimpan. Backend menyimpan
          NIK terenkripsi dan memakai hash terpisah untuk mencegah duplikasi.
        </p>
      </div>

      <label className="member-consent">
        <input type="checkbox" required disabled={loading || saving} />
        <span>
          Saya menyatakan data yang diberikan benar dan memahami pendaftaran
          anggota akan melalui proses verifikasi.
        </span>
      </label>

      <button
        type="submit"
        className="podh-button podh-button-accent"
        disabled={loading || saving}
      >
        <FiUser />
        {loading
          ? "Memuat Akun..."
          : saving
            ? "Menyimpan..."
            : "Kirim Data Keanggotaan"}
      </button>
    </form>
  );
}
