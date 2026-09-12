type ProgramOperationsProps = {
  programName: string;
  programCode: string;
  participantCount: number;
  paidCount: number;
};

const trainingDays = [
  { day: "Hari 1", focus: "Registrasi, briefing, dan materi awal" },
  { day: "Hari 2", focus: "Materi inti dan praktik" },
  { day: "Hari 3", focus: "Praktik lanjutan dan evaluasi" },
  { day: "Hari 4", focus: "Evaluasi akhir dan penutupan" },
];

export function ProgramOperations({
  programName,
  programCode,
  participantCount,
  paidCount,
}: ProgramOperationsProps) {
  const unpaidCount = Math.max(0, participantCount - paidCount);

  return (
    <section className="program-operations">
      <div className="program-operations-head">
        <div>
          <small>OPERASIONAL PROGRAM</small>
          <h2>Pelatihan 4 hari, pembayaran, dan absensi</h2>
          <p>
            Struktur kerja untuk {programName} ({programCode}). Data produksi
            akan diisi setelah API operasional diaktifkan.
          </p>
        </div>
        <span>UI READY</span>
      </div>

      <div className="training-day-grid">
        {trainingDays.map((item) => (
          <article key={item.day}>
            <span>{item.day}</span>
            <strong>{item.focus}</strong>
            <small>Belum ada sesi produksi</small>
          </article>
        ))}
      </div>

      <div className="operations-split">
        <article className="payment-operations-card">
          <div className="operations-card-head">
            <div>
              <small>PEMBAYARAN</small>
              <h3>Cicilan dan pelunasan</h3>
            </div>
            <span>
              {paidCount}/{participantCount} lunas
            </span>
          </div>

          <div className="payment-flow">
            <div>
              <span>01</span>
              <strong>Belum Bayar</strong>
              <small>Tagihan peserta dibuat dari pendaftaran batch.</small>
            </div>
            <div>
              <span>02</span>
              <strong>Cicil</strong>
              <small>Setiap pembayaran dicatat sebagai transaksi terpisah.</small>
            </div>
            <div>
              <span>03</span>
              <strong>Lunas</strong>
              <small>Status berubah setelah total pembayaran terpenuhi.</small>
            </div>
          </div>

          <div className="payment-quick-stats">
            <div>
              <small>Total peserta</small>
              <strong>{participantCount}</strong>
            </div>
            <div>
              <small>Lunas</small>
              <strong>{paidCount}</strong>
            </div>
            <div>
              <small>Belum lunas</small>
              <strong>{unpaidCount}</strong>
            </div>
          </div>
        </article>

        <article className="attendance-operations-card">
          <div className="operations-card-head">
            <div>
              <small>ABSENSI QR</small>
              <h3>Empat sesi harian</h3>
            </div>
            <span>QR + Form</span>
          </div>

          <div className="qr-session-list">
            {trainingDays.map((item, index) => (
              <div key={item.day}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.day}</strong>
                  <small>
                    Token sesi dan QR dibuat ketika integrasi backend aktif.
                  </small>
                </div>
                <b>Belum aktif</b>
              </div>
            ))}
          </div>

          <div className="qr-flow-note">
            <strong>Alur yang disiapkan</strong>
            <p>
              QR → Google Form → Google Sheets / Apps Script → Laravel API →
              database PODH → dashboard admin.
            </p>
          </div>
        </article>
      </div>

      <div className="operations-print-row">
        <div>
          <small>OUTPUT ADMIN</small>
          <strong>Rekap siap dicetak</strong>
          <p>
            Daftar peserta, pembayaran, absensi Hari 1–4, dan rekap program
            nantinya dapat diekspor setelah sumber data produksi tersedia.
          </p>
        </div>
        <div className="operations-print-tags">
          <span>PRINT</span>
          <span>PDF</span>
          <span>EXCEL</span>
          <span>CSV</span>
        </div>
      </div>
    </section>
  );
}
