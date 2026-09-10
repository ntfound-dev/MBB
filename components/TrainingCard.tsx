import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiLayers,
  FiShield,
  FiTool,
  FiTruck,
} from "react-icons/fi";
import {
  getStatusLabel,
  type Training,
  type TrainingKind,
} from "@/lib/training-data";

function ProgramIcon({ kind }: { kind: TrainingKind }) {
  if (kind === "k3") return <FiShield />;
  if (kind === "crane") return <FiTruck />;
  if (kind === "rigger") return <FiLayers />;
  return <FiTool />;
}

export function TrainingCard({ training }: { training: Training }) {
  const status = getStatusLabel(training.status);

  return (
    <article className="training-card">
      <div className={`training-poster training-poster-${training.kind}`}>
        <div className="training-poster-top">
          <span className={`training-status training-status-${training.status}`}>
            {status}
          </span>
          <small>{training.method}</small>
        </div>

        <div className="training-poster-brand">
          <span>PODH</span>
          <small>TRAINING</small>
        </div>

        <div className="training-poster-icon">
          <ProgramIcon kind={training.kind} />
        </div>

        <div className="training-poster-copy">
          <small>PELATIHAN</small>
          <strong>{training.category}</strong>
          <span>{training.location}</span>
        </div>
      </div>

      <div className="training-card-body">
        <div className="training-card-meta">
          <FiCalendar />
          <span>{training.trainingDate}</span>
        </div>

        <h3>{training.title}</h3>
        <p>{training.description}</p>

        <Link className="training-detail-link" href={`/pelatihan/${training.slug}`}>
          Lihat Detail <FiArrowRight />
        </Link>
      </div>
    </article>
  );
}
