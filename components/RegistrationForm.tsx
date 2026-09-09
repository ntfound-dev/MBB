"use client";

import { useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiGrid,
  FiShield,
} from "react-icons/fi";

const TOTAL_FEE = 7_500_000;

const programs = [
  { value: "welder", label: "Welder", code: "WEL" },
  { value: "rigger", label: "Rigger", code: "RIG" },
  { value: "k3", label: "K3", code: "K3" },
] as const;

type PaymentMethod = "qris" | "transfer" | "cash";
type Step = "registration" | "payment" | "complete";

const paymentMethods = [
  {
    value: "qris" as const,
    title: "QRIS",
    subtitle: "Pembayaran digital",
    description:
      "Scan QRIS resmi MBB. Saat sistem production aktif, status dapat diverifikasi otomatis.",
    verification: "Verifikasi otomatis / sistem",
    icon: FiGrid,
  },
  {
    value: "transfer" as const,
    title: "Transfer Bank",
    subtitle: "Rekening resmi MBB",
    description:
      "Transfer penuh ke rekening resmi organisasi. Bukti pembayaran diverifikasi oleh admin.",
    verification: "Verifikasi admin",
    icon: FiCreditCard,
  },
  {
    value: "cash" as const,
    title: "Cash",
    subtitle: "Bayar langsung",
    description:
      "Pembayaran penuh melalui petugas MBB yang berwenang dan peserta menerima kwitansi.",
    verification: "Verifikasi petugas / admin",
    icon: FiDollarSign,
  },
];

function rupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RegistrationForm() {
  const [step, setStep] = useState<Step>("registration");
  const [registrationId, setRegistrationId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("welder");
  const [domicile, setDomicile] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("qris");

  const selectedProgram = useMemo(
    () => programs.find((item) => item.value === program) ?? programs[0],
    [program],
  );

  const selectedPayment =
    paymentMethods.find((item) => item.value === paymentMethod) ??
    paymentMethods[0];

  function resetFlow() {
    setStep("registration");
    setRegistrationId("");
    setPaymentMethod("qris");
  }

  const stepNumber =
    step === "registration" ? 1 : step === "payment" ? 2 : 3;

  return (
    <div className="mbb-registration-flow">
      <div className="mbb-stepper" aria-label="Tahapan pendaftaran">
        {[
          ["01", "Data Peserta"],
          ["02", "Pembayaran"],
          ["03", "Selesai"],
        ].map(([number, label], index) => {
          const current = index + 1;
          const active = current === stepNumber;
          const complete = current < stepNumber;

          return (
            <div
              key={number}
              className={`mbb-step ${active ? "active" : ""} ${
                complete ? "complete" : ""
              }`}
            >
              <span>{complete ? <FiCheckCircle /> : number}</span>
              <small>{label}</small>
            </div>
          );
        })}
      </div>

      {step === "registration" && (
        <form
          className="registration-form mbb-flow-card"
          onSubmit={(event) => {
            event.preventDefault();

            const suffix = String(Date.now()).slice(-5);
            setRegistrationId(
              `MBB-S1-${selectedProgram.code}-${suffix}`,
            );
            setStep("payment");
          }}
        >
          <div className="mbb-flow-heading">
            <span>Season 1 • Pendaftaran Demo</span>
            <h2>Data peserta</h2>
            <p>
              Isi data dasar untuk melihat simulasi alur pendaftaran MBB.
              Data belum disimpan ke server.
            </p>
          </div>

          <div className="mbb-form-grid">
            <label className="mbb-field-full">
              <span>Season</span>
              <input
                value="Season 1 — Pelatihan Kompetensi 2026"
                readOnly
              />
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
          </div>

          <label className="checkbox-row mbb-consent">
            <input required type="checkbox" />
            <span>
              Saya memahami halaman ini masih demo dan belum menyimpan
              data peserta.
            </span>
          </label>

          <button
            className="button button-primary form-submit mbb-primary-action"
            type="submit"
          >
            Lanjut ke Pembayaran
            <FiArrowRight />
          </button>
        </form>
      )}

      {step === "payment" && (
        <div className="mbb-flow-card mbb-payment-card">
          <div className="mbb-flow-heading">
            <span>Pembayaran • Demo</span>
            <h2>Pilih metode pembayaran</h2>
            <p>
              Pembayaran dilakukan penuh sesuai biaya program. Tidak ada
              cicilan pada alur ini.
            </p>
          </div>

          <div className="mbb-payment-reference">
            <div>
              <small>ID Pendaftaran</small>
              <strong>{registrationId}</strong>
            </div>
            <div>
              <small>Peserta</small>
              <strong>{name}</strong>
            </div>
            <div>
              <small>Program</small>
              <strong>{selectedProgram.label}</strong>
            </div>
          </div>

          <div className="mbb-payment-total">
            <span>Total pembayaran</span>
            <strong>{rupiah(TOTAL_FEE)}</strong>
            <small>Pembayaran penuh • nominal sementara</small>
          </div>

          <div className="mbb-method-grid">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const active = paymentMethod === method.value;

              return (
                <button
                  key={method.value}
                  type="button"
                  className={`mbb-method-card ${
                    active ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod(method.value)}
                >
                  <span className="mbb-method-icon">
                    <Icon />
                  </span>
                  <span className="mbb-method-copy">
                    <strong>{method.title}</strong>
                    <small>{method.subtitle}</small>
                  </span>
                  <span className="mbb-method-check">
                    {active ? <FiCheckCircle /> : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mbb-method-detail">
            <div className="mbb-method-detail-copy">
              <span className="mbb-method-detail-label">
                Metode dipilih
              </span>
              <h3>{selectedPayment.title}</h3>
              <p>{selectedPayment.description}</p>

              <div className="mbb-verification-badge">
                <FiShield />
                <span>{selectedPayment.verification}</span>
              </div>
            </div>

            {paymentMethod === "qris" && (
              <div
                className="mbb-qris-demo"
                aria-label="QRIS demo tidak dapat dipindai"
              >
                <div className="mbb-qris-pattern" />
                <strong>QRIS DEMO</strong>
                <small>Tidak dapat dipindai</small>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="mbb-payment-placeholder">
                <FiCreditCard />
                <strong>Rekening belum ditetapkan</strong>
                <small>
                  Nomor rekening resmi baru ditampilkan setelah disetujui
                  organisasi.
                </small>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="mbb-payment-placeholder">
                <FiDollarSign />
                <strong>Bayar melalui petugas MBB</strong>
                <small>
                  Pembayaran cash wajib dicatat dan disertai kwitansi.
                </small>
              </div>
            )}
          </div>

          <div className="mbb-payment-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setStep("registration")}
            >
              <FiArrowLeft />
              Kembali
            </button>

            <button
              className="button button-primary"
              type="button"
              onClick={() => setStep("complete")}
            >
              Lanjutkan Simulasi
              <FiArrowRight />
            </button>
          </div>

          <p className="mbb-payment-disclaimer">
            Demo saja — tidak ada QRIS aktif, rekening bank, transaksi cash,
            atau data pembayaran nyata yang diproses.
          </p>
        </div>
      )}

      {step === "complete" && (
        <div className="mbb-flow-card mbb-complete-card">
          <div className="mbb-complete-icon">
            <FiCheckCircle />
          </div>

          <span className="mbb-complete-kicker">Simulasi selesai</span>
          <h2>Pendaftaran siap diverifikasi.</h2>
          <p>
            Dalam sistem production, pembayaran baru dianggap selesai
            setelah tervalidasi oleh sistem atau admin MBB.
          </p>

          <div className="mbb-complete-summary">
            <div>
              <small>ID Pendaftaran</small>
              <strong>{registrationId}</strong>
            </div>
            <div>
              <small>Peserta</small>
              <strong>{name}</strong>
            </div>
            <div>
              <small>Program</small>
              <strong>{selectedProgram.label}</strong>
            </div>
            <div>
              <small>Metode</small>
              <strong>{selectedPayment.title}</strong>
            </div>
            <div>
              <small>Total</small>
              <strong>{rupiah(TOTAL_FEE)}</strong>
            </div>
            <div>
              <small>Status</small>
              <strong>Menunggu Verifikasi</strong>
            </div>
          </div>

          <div className="mbb-complete-note">
            <FiShield />
            <div>
              <strong>Belum ada transaksi nyata</strong>
              <p>
                Halaman ini hanya menggambarkan alur administrasi yang akan
                digunakan saat sistem production aktif.
              </p>
            </div>
          </div>

          <button
            className="button button-primary"
            type="button"
            onClick={resetFlow}
          >
            Buat Simulasi Baru
          </button>
        </div>
      )}
    </div>
  );
}
