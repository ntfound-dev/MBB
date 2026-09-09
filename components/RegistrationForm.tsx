"use client";

import { useMemo, useState } from "react";

const TOTAL_FEE = 7_500_000;

const programs = [
  { value: "welder", label: "Welder", code: "WEL" },
  { value: "rigger", label: "Rigger", code: "RIG" },
  { value: "k3", label: "K3", code: "K3" },
] as const;

type PaymentMethod = "qris" | "transfer" | "cash";
type PaymentPlan = "lunas" | "cicilan";
type Step = "registration" | "payment" | "complete";

const paymentMethods: Array<{
  value: PaymentMethod;
  title: string;
  description: string;
}> = [
  {
    value: "qris",
    title: "QRIS",
    description: "Pembayaran digital melalui QRIS resmi MBB.",
  },
  {
    value: "transfer",
    title: "Transfer Bank",
    description: "Transfer ke rekening resmi yang akan ditetapkan MBB.",
  },
  {
    value: "cash",
    title: "Cash",
    description: "Pembayaran langsung melalui petugas MBB dengan kwitansi.",
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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>("lunas");
  const [installmentAmount, setInstallmentAmount] = useState("2500000");

  const selectedProgram = useMemo(
    () => programs.find((item) => item.value === program) ?? programs[0],
    [program],
  );

  const paymentAmount =
    paymentPlan === "lunas"
      ? TOTAL_FEE
      : Math.min(
          TOTAL_FEE,
          Math.max(1, Number.parseInt(installmentAmount || "0", 10) || 0),
        );

  const paymentStatus = paymentAmount >= TOTAL_FEE ? "Lunas" : "Cicilan";
  const remainingAmount = Math.max(0, TOTAL_FEE - paymentAmount);

  function resetFlow() {
    setStep("registration");
    setRegistrationId("");
    setPaymentMethod("qris");
    setPaymentPlan("lunas");
    setInstallmentAmount("2500000");
  }

  if (step === "complete") {
    return (
      <div className="success-card payment-complete-card">
        <span>DEMO / MOCK</span>
        <h2>Simulasi pembayaran tercatat.</h2>
        <p>
          Tidak ada transaksi atau data yang dikirim ke server. Tampilan ini hanya
          mensimulasikan alur operasional MBB.
        </p>

        <div className="registration-summary payment-summary-grid">
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
            <strong>
              {paymentMethods.find((item) => item.value === paymentMethod)?.title}
            </strong>
          </div>
          <div>
            <small>Nominal</small>
            <strong>{rupiah(paymentAmount)}</strong>
          </div>
          <div>
            <small>Status</small>
            <strong>{paymentStatus}</strong>
          </div>
          <div>
            <small>Sisa</small>
            <strong>{rupiah(remainingAmount)}</strong>
          </div>
          <div>
            <small>Verifikasi</small>
            <strong>Demo / belum nyata</strong>
          </div>
        </div>

        <div className="payment-note">
          <strong>Production nanti</strong>
          <p>
            QRIS dapat diverifikasi otomatis melalui payment gateway. Transfer dan
            cash dapat diverifikasi oleh admin sebelum status pembayaran berubah.
          </p>
        </div>

        <button className="button button-primary" type="button" onClick={resetFlow}>
          Buat Simulasi Baru
        </button>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="registration-form payment-form">
        <div className="form-banner">
          <strong>Pembayaran • Demo</strong>
          <span>{registrationId}</span>
        </div>

        <div className="payment-registration-head">
          <div>
            <small>Peserta</small>
            <strong>{name}</strong>
          </div>
          <div>
            <small>Program</small>
            <strong>{selectedProgram.label}</strong>
          </div>
          <div>
            <small>Total biaya sementara</small>
            <strong>{rupiah(TOTAL_FEE)}</strong>
          </div>
        </div>

        <fieldset className="payment-fieldset">
          <legend>Metode pembayaran</legend>

          <div className="payment-method-grid">
            {paymentMethods.map((method) => (
              <button
                key={method.value}
                type="button"
                className={`payment-method-card ${
                  paymentMethod === method.value ? "active" : ""
                }`}
                onClick={() => setPaymentMethod(method.value)}
              >
                <span>{method.title}</span>
                <small>{method.description}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="payment-fieldset">
          <legend>Jenis pembayaran</legend>

          <div className="payment-plan-row">
            <button
              type="button"
              className={paymentPlan === "lunas" ? "active" : ""}
              onClick={() => setPaymentPlan("lunas")}
            >
              Bayar Lunas
            </button>
            <button
              type="button"
              className={paymentPlan === "cicilan" ? "active" : ""}
              onClick={() => setPaymentPlan("cicilan")}
            >
              Cicilan
            </button>
          </div>

          {paymentPlan === "cicilan" && (
            <label className="installment-field">
              <span>Nominal pembayaran simulasi</span>
              <input
                required
                min="1"
                max={TOTAL_FEE}
                type="number"
                inputMode="numeric"
                value={installmentAmount}
                onChange={(event) => setInstallmentAmount(event.target.value)}
              />
              <small>
                Sisa setelah pembayaran: {rupiah(remainingAmount)}
              </small>
            </label>
          )}
        </fieldset>

        <div className="payment-method-detail">
          {paymentMethod === "qris" && (
            <>
              <div className="qris-demo-box" aria-label="QRIS demo tidak dapat dipindai">
                <div className="qris-demo-pattern" />
                <strong>QRIS DEMO</strong>
                <small>Tidak dapat dipindai</small>
              </div>
              <div>
                <strong>QRIS</strong>
                <p>
                  Production nanti menggunakan QR dinamis dari penyedia pembayaran
                  resmi. Status dapat diperbarui setelah pembayaran tervalidasi.
                </p>
              </div>
            </>
          )}

          {paymentMethod === "transfer" && (
            <div className="payment-instruction">
              <strong>Transfer Bank</strong>
              <p>
                Rekening resmi belum ditetapkan pada mock ini. Production nanti
                hanya menampilkan rekening atas nama organisasi yang telah
                disetujui.
              </p>
              <span>Verifikasi: Admin MBB</span>
            </div>
          )}

          {paymentMethod === "cash" && (
            <div className="payment-instruction">
              <strong>Pembayaran Cash</strong>
              <p>
                Peserta membayar langsung kepada petugas MBB yang berwenang.
                Pembayaran dicatat oleh admin dan peserta menerima kwitansi.
              </p>
              <span>Verifikasi: Petugas / Admin MBB</span>
            </div>
          )}
        </div>

        <div className="payment-total-row">
          <div>
            <small>Nominal simulasi</small>
            <strong>{rupiah(paymentAmount)}</strong>
          </div>
          <div>
            <small>Status setelah dicatat</small>
            <strong>{paymentStatus}</strong>
          </div>
        </div>

        <div className="payment-actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setStep("registration")}
          >
            Kembali
          </button>
          <button
            className="button button-primary"
            type="button"
            onClick={() => setStep("complete")}
          >
            Simulasikan Pembayaran
          </button>
        </div>

        <p className="payment-disclaimer">
          Demo saja — tidak ada QRIS aktif, rekening bank, transaksi cash, atau
          data pembayaran nyata yang diproses.
        </p>
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
        setStep("payment");
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
        Lanjut ke Pembayaran
      </button>
    </form>
  );
}
