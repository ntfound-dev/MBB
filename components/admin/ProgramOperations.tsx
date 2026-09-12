"use client";

import type { Participant } from "@/lib/mock-data";

type ProgramOperationsProps = {
  programName: string;
  programCode: string;
  participants: Participant[];
};

const trainingDays = ["Hari 1", "Hari 2", "Hari 3", "Hari 4"] as const;

function progressLabel(participant: Participant) {
  if (participant.certificate === "Terbit") return "Selesai";
  if (participant.score !== null) return "Evaluasi";
  if (participant.attendance > 0) return "Pelatihan Berjalan";
  if (participant.payment === "Lunas") return "Siap Pelatihan";
  return "Administrasi";
}

function csvCell(value: string | number | null) {
  const text = value === null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export function ProgramOperations({
  programName,
  programCode,
  participants,
}: ProgramOperationsProps) {
  const participantCount = participants.length;
  const paidCount = participants.filter(
    (participant) => participant.payment === "Lunas",
  ).length;
  const pendingCount = Math.max(0, participantCount - paidCount);
  const averageAttendance = participantCount
    ? Math.round(
        participants.reduce(
          (sum, participant) => sum + participant.attendance,
          0,
        ) / participantCount,
      )
    : 0;

  function downloadCsv() {
    const header = [
      "ID Peserta",
      "Nama",
      "Pembayaran",
      "Kehadiran",
      "Nilai",
      "Sertifikat",
      "Progres",
    ];

    const rows = participants.map((participant) => [
      participant.id,
      participant.name,
      participant.payment,
      `${participant.attendance}%`,
      participant.score,
      participant.certificate,
      progressLabel(participant),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((value) => csvCell(value)).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${programCode.toLowerCase()}-rekap.csv`;
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="program-operations">
      <div className="program-operations-head">
        <div>
          <small>OPERASIONAL PROGRAM</small>
          <h2>Pelatihan 4 hari, pembayaran, dan absensi</h2>
          <p>
            Struktur operasional {programName} ({programCode}) tanpa membuat
            nominal, jadwal, atau data kehadiran yang belum resmi.
          </p>
        </div>

        <div className="program-operation-actions">
          <button type="button" onClick={() => window.print()}>
            Cetak / PDF
          </button>
          <button type="button" onClick={downloadCsv}>
            CSV
          </button>
        </div>
      </div>

      <div className="program-operation-stats">
        <article>
          <small>Peserta</small>
          <strong>{participantCount}</strong>
          <span>terdaftar pada data demo</span>
        </article>
        <article>
          <small>Lunas</small>
          <strong>{paidCount}</strong>
          <span>status pembayaran</span>
        </article>
        <article>
          <small>Belum Lunas</small>
          <strong>{pendingCount}</strong>
          <span>termasuk status menunggu</span>
        </article>
        <article>
          <small>Rata-rata Kehadiran</small>
          <strong>{participantCount ? `${averageAttendance}%` : "—"}</strong>
          <span>dari data yang tersedia</span>
        </article>
      </div>

      <div className="training-day-grid">
        {trainingDays.map((day, index) => (
          <article key={day}>
            <span>{day}</span>
            <strong>Sesi {index + 1}</strong>
            <small>
              Jadwal, token QR, dan status sesi menunggu data batch resmi.
            </small>
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

          <div className="payment-config-grid">
            <div>
              <small>Tarif Batch</small>
              <strong>Belum ditetapkan</strong>
            </div>
            <div>
              <small>Metode</small>
              <strong>Menunggu keputusan resmi</strong>
            </div>
            <div>
              <small>Cicilan</small>
              <strong>Didukung oleh struktur sistem</strong>
            </div>
          </div>

          <div className="payment-flow">
            <div>
              <span>01</span>
              <strong>Belum Bayar</strong>
              <small>Tagihan dibuat ketika tarif batch sudah resmi.</small>
            </div>
            <div>
              <span>02</span>
              <strong>Cicil</strong>
              <small>
                Setiap transaksi dicatat terpisah agar saldo dan riwayat jelas.
              </small>
            </div>
            <div>
              <span>03</span>
              <strong>Lunas</strong>
              <small>
                Status berubah setelah total pembayaran memenuhi tagihan.
              </small>
            </div>
          </div>
        </article>

        <article className="attendance-operations-card">
          <div className="operations-card-head">
            <div>
              <small>ABSENSI QR</small>
              <h3>Rekap empat hari</h3>
            </div>
            <span>QR + Google Form</span>
          </div>

          <div className="qr-session-list">
            {trainingDays.map((day, index) => (
              <div key={day}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{day}</strong>
                  <small>
                    QR dan token sesi dibuat setelah jadwal resmi tersedia.
                  </small>
                </div>
                <b>Belum aktif</b>
              </div>
            ))}
          </div>

          <div className="qr-flow-note">
            <strong>Alur input</strong>
            <p>
              QR → Google Form → Google Sheets / Apps Script → Laravel API →
              database PODH → dashboard admin.
            </p>
          </div>
        </article>
      </div>

      <section className="participant-operation-panel">
        <div className="participant-operation-head">
          <div>
            <small>REKAP PESERTA</small>
            <h3>Pembayaran, absensi 4 hari, dan progres</h3>
          </div>
          <span>{participantCount} peserta</span>
        </div>

        <div className="participant-operation-table-wrap">
          <table className="participant-operation-table">
            <thead>
              <tr>
                <th>Peserta</th>
                <th>Pembayaran</th>
                <th>Hari 1</th>
                <th>Hari 2</th>
                <th>Hari 3</th>
                <th>Hari 4</th>
                <th>Kehadiran</th>
                <th>Nilai</th>
                <th>Progres</th>
              </tr>
            </thead>
            <tbody>
              {participants.length ? (
                participants.map((participant) => (
                  <tr key={participant.id}>
                    <td>
                      <strong>{participant.name}</strong>
                      <small>{participant.id}</small>
                    </td>
                    <td>
                      <span className="ops-status">{participant.payment}</span>
                    </td>
                    {trainingDays.map((day) => (
                      <td key={`${participant.id}-${day}`}>
                        <span className="ops-empty">—</span>
                      </td>
                    ))}
                    <td>{participant.attendance}%</td>
                    <td>{participant.score ?? "—"}</td>
                    <td>
                      <span className="ops-progress">
                        {progressLabel(participant)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="participant-operation-empty">
                    Belum ada peserta pada program ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="participant-operation-note">
          Kolom Hari 1–4 sengaja belum diisi dari persentase kehadiran agar
          sistem tidak mengarang data sesi. Nanti setiap hari berasal dari
          record absensi sebenarnya.
        </p>
      </section>

      <div className="operations-print-row">
        <div>
          <small>OUTPUT ADMIN</small>
          <strong>Rekap dapat dicetak sekarang</strong>
          <p>
            Tombol Cetak / PDF memakai fitur print browser. CSV berisi rekap
            peserta yang tampil pada dashboard. XLSX ditambahkan setelah modul
            data produksi tersedia.
          </p>
        </div>
        <div className="operations-print-tags">
          <span>PRINT</span>
          <span>PDF</span>
          <span>CSV</span>
          <span>XLSX NANTI</span>
        </div>
      </div>
    </section>
  );
}
