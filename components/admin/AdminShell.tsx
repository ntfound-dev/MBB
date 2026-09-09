"use client";

import { useMemo, useState } from "react";
import {
  getSeasonSummary,
  mockSeasons,
  type ProgramKey,
} from "@/lib/mock-data";

type View = "season" | ProgramKey;

const programOrder: ProgramKey[] = ["welder", "rigger", "k3"];

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="season-badge">{children}</span>;
}

export function AdminShell() {
  const [seasonId, setSeasonId] = useState(mockSeasons[0].id);
  const [view, setView] = useState<View>("season");
  const [query, setQuery] = useState("");

  const season =
    mockSeasons.find((item) => item.id === seasonId) ?? mockSeasons[0];

  const summary = getSeasonSummary(season);

  const selectedProgram =
    view === "season"
      ? null
      : season.programs.find((program) => program.key === view) ?? null;

  const filteredParticipants = useMemo(() => {
    if (!selectedProgram) return [];

    const normalized = query.trim().toLowerCase();

    return selectedProgram.participants.filter((participant) => {
      if (!normalized) return true;

      return (
        participant.name.toLowerCase().includes(normalized) ||
        participant.id.toLowerCase().includes(normalized)
      );
    });
  }, [query, selectedProgram]);

  return (
    <div className="season-admin">
      <aside className="season-sidebar">
        <a href="/" className="season-brand">
          <span>MBB</span>
          <div>
            <strong>Muara Badak Bersatu</strong>
            <small>Admin Pelatihan</small>
          </div>
        </a>

        <div className="season-switcher">
          <label htmlFor="season-select">Season</label>
          <select
            id="season-select"
            value={seasonId}
            onChange={(event) => {
              setSeasonId(event.target.value);
              setView("season");
              setQuery("");
            }}
          >
            {mockSeasons.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <nav className="season-nav">
          <button
            type="button"
            className={view === "season" ? "active" : ""}
            onClick={() => {
              setView("season");
              setQuery("");
            }}
          >
            Ringkasan Season
          </button>

          <span className="season-nav-label">Program</span>

          {programOrder.map((key) => {
            const program = season.programs.find((item) => item.key === key);
            if (!program) return null;

            return (
              <button
                key={key}
                type="button"
                className={view === key ? "active" : ""}
                onClick={() => {
                  setView(key);
                  setQuery("");
                }}
              >
                <span>{program.name}</span>
                <small>{program.participants.length}</small>
              </button>
            );
          })}
        </nav>

        <div className="season-sidebar-bottom">
          <span className="demo-dot" />
          <div>
            <strong>Demo Mode</strong>
            <small>Semua data fiktif</small>
          </div>
        </div>
      </aside>

      <main className="season-main">
        <header className="season-topbar">
          <div>
            <span className="season-kicker">
              {view === "season" ? "Season Dashboard" : "Program Dashboard"}
            </span>
            <h1>{view === "season" ? season.name : selectedProgram?.name}</h1>
            <p>
              {view === "season"
                ? season.subtitle
                : `${selectedProgram?.code} • ${selectedProgram?.date}`}
            </p>
          </div>

          <div className="season-top-actions">
            <Badge>{season.status}</Badge>
            <a href="/">Website Publik</a>
            <div className="season-user">
              <span>S</span>
              <div>
                <strong>Sekretaris</strong>
                <small>Admin</small>
              </div>
            </div>
          </div>
        </header>

        <div className="season-mobile-nav">
          <button
            type="button"
            className={view === "season" ? "active" : ""}
            onClick={() => setView("season")}
          >
            Season
          </button>

          {season.programs.map((program) => (
            <button
              type="button"
              key={program.key}
              className={view === program.key ? "active" : ""}
              onClick={() => setView(program.key)}
            >
              {program.name}
            </button>
          ))}
        </div>

        {view === "season" ? (
          <>
            <section className="season-stats">
              <article>
                <span>Peserta</span>
                <strong>{summary.participants}</strong>
                <small>seluruh program</small>
              </article>
              <article>
                <span>Pembayaran Lunas</span>
                <strong>{summary.paid}</strong>
                <small>peserta mock</small>
              </article>
              <article>
                <span>Nilai Rata-rata</span>
                <strong>{summary.averageScore || "—"}</strong>
                <small>peserta yang sudah dinilai</small>
              </article>
              <article>
                <span>Sertifikat Terbit</span>
                <strong>{summary.certificates}</strong>
                <small>mock status</small>
              </article>
            </section>

            <section className="program-overview-grid">
              {season.programs.map((program) => {
                const paid = program.participants.filter(
                  (participant) => participant.payment === "Lunas",
                ).length;

                const certificateReady = program.participants.filter(
                  (participant) =>
                    participant.certificate === "Terbit" ||
                    participant.certificate === "Diproses Mitra",
                ).length;

                return (
                  <article className="program-overview-card" key={program.key}>
                    <div className="program-overview-head">
                      <div>
                        <span>{program.code}</span>
                        <h2>{program.name}</h2>
                      </div>
                      <Badge>{program.trainingStatus}</Badge>
                    </div>

                    <p>{program.date}</p>

                    <div className="program-metrics">
                      <div>
                        <small>Peserta</small>
                        <strong>{program.participants.length}</strong>
                      </div>
                      <div>
                        <small>Lunas</small>
                        <strong>{paid}</strong>
                      </div>
                      <div>
                        <small>Sertifikat</small>
                        <strong>{certificateReady}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setView(program.key)}
                    >
                      Lihat Program →
                    </button>
                  </article>
                );
              })}
            </section>

            <section className="season-progress-panel">
              <div className="season-panel-head">
                <div>
                  <small>Progress</small>
                  <h2>Progres Season</h2>
                </div>
                <span>Mock data</span>
              </div>

              <div className="progress-table">
                <div className="progress-table-head">
                  <span>Program</span>
                  <span>Peserta</span>
                  <span>Pembayaran</span>
                  <span>Pelatihan</span>
                  <span>Sertifikat</span>
                </div>

                {season.programs.map((program) => {
                  const paid = program.participants.filter(
                    (participant) => participant.payment === "Lunas",
                  ).length;

                  const certificateProgress = program.participants.filter(
                    (participant) =>
                      participant.certificate !== "Belum Diproses",
                  ).length;

                  return (
                    <div className="progress-table-row" key={program.key}>
                      <strong>{program.name}</strong>
                      <span>{program.participants.length}</span>
                      <span>
                        {paid}/{program.participants.length}
                      </span>
                      <span>
                        <Badge>{program.trainingStatus}</Badge>
                      </span>
                      <span>
                        {certificateProgress}/{program.participants.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="privacy-box">
              <span>✓</span>
              <div>
                <strong>Data peserta tidak tampil di website publik</strong>
                <p>
                  Dashboard ini hanya mock. Saat production, akses data peserta
                  wajib memakai login, role, audit log, dan masking identitas.
                </p>
              </div>
            </section>
          </>
        ) : (
          <>
            {selectedProgram && (
              <>
                <section className="program-summary">
                  <article>
                    <span>Total Peserta</span>
                    <strong>{selectedProgram.participants.length}</strong>
                  </article>
                  <article>
                    <span>Pembayaran Lunas</span>
                    <strong>
                      {
                        selectedProgram.participants.filter(
                          (participant) => participant.payment === "Lunas",
                        ).length
                      }
                    </strong>
                  </article>
                  <article>
                    <span>Sudah Dinilai</span>
                    <strong>
                      {
                        selectedProgram.participants.filter(
                          (participant) => participant.score !== null,
                        ).length
                      }
                    </strong>
                  </article>
                  <article>
                    <span>Status Pelatihan</span>
                    <strong className="summary-status">
                      {selectedProgram.trainingStatus}
                    </strong>
                  </article>
                </section>

                <section className="participant-panel">
                  <div className="participant-panel-head">
                    <div>
                      <small>Peserta {selectedProgram.name}</small>
                      <h2>Daftar Peserta</h2>
                    </div>

                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Cari nama atau ID"
                    />
                  </div>

                  <div className="participant-table-wrap">
                    <table className="participant-table">
                      <thead>
                        <tr>
                          <th>Peserta</th>
                          <th>Pembayaran</th>
                          <th>Kehadiran</th>
                          <th>Nilai</th>
                          <th>Sertifikat</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredParticipants.map((participant) => (
                          <tr key={participant.id}>
                            <td>
                              <div className="participant-person">
                                <span>{participant.name.charAt(0)}</span>
                                <div>
                                  <strong>{participant.name}</strong>
                                  <small>{participant.id}</small>
                                  <small>{participant.nikMasked}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <Badge>{participant.payment}</Badge>
                            </td>
                            <td>{participant.attendance}%</td>
                            <td>{participant.score ?? "—"}</td>
                            <td>
                              <Badge>{participant.certificate}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
