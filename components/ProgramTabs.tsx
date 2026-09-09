"use client";

import Link from "next/link";
import { useState } from "react";
import { siteData, type TrainingProgram } from "@/lib/site-data";
import { getProgramDetail } from "@/lib/program-data";

type ProgramSlug = TrainingProgram["slug"];

export function ProgramTabs() {
  const [active, setActive] = useState<ProgramSlug>("welder");
  const selected = siteData.programs.find((program) => program.slug === active) ?? siteData.programs[0];
  const detail = getProgramDetail(selected.slug);

  return (
    <div className="program-layout">
      <div className="program-tabs" role="tablist" aria-label="Program pelatihan">
        {siteData.programs.map((program, index) => (
          <button
            key={program.slug}
            type="button"
            role="tab"
            aria-selected={active === program.slug}
            className={active === program.slug ? "program-tab program-tab-active" : "program-tab"}
            onClick={() => setActive(program.slug)}
          >
            <span>0{index + 1}</span>
            <strong>{program.name}</strong>
            <small>{program.short}</small>
          </button>
        ))}
      </div>

      <article className="program-detail">
        <div className="program-detail-head">
          <span className="section-label">Program Kompetensi</span>
          <h3>{selected.name}</h3>
          <p>{selected.description}</p>
        </div>

        <div className="program-meta-grid">
          <div><small>Biaya sementara</small><strong>{detail?.price ?? "—"}</strong></div>
          <div><small>Lokasi</small><strong>{detail?.location ?? "Muara Badak"}</strong></div>
          <div><small>Sertifikat</small><strong>Lembaga mitra</strong></div>
        </div>

        <div className="topic-grid">
          {selected.topics.map((topic, index) => (
            <div className="topic-card" key={topic}>
              <span>0{index + 1}</span>
              <strong>{topic}</strong>
            </div>
          ))}
        </div>

        <div className="program-actions">
          <Link className="button button-primary" href={`/program/${selected.slug}`}>Detail Program</Link>
          <Link className="button button-secondary" href="/daftar">Daftar</Link>
        </div>
      </article>
    </div>
  );
}
