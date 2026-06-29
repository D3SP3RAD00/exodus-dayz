import { DetectionResult } from "@/app/lib/project/dayzFileDetector";

type ProjectFileCardProps = {
  file: {
    name: string;
    size: number;
    path: string;
    detected: DetectionResult;
  };
};

export default function ProjectFileCard({ file }: ProjectFileCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#07111f] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-black text-emerald-300">{file.name}</h3>

          <p className="mt-1 text-xs text-slate-600">{file.path}</p>

          <p className="mt-2 text-sm font-bold text-slate-300">
            {file.detected.displayName}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {file.detected.description}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            {file.detected.reason.join(", ")}
          </p>

          <p className="mt-3 inline-block rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-bold text-emerald-300">
            Confidence: {file.detected.confidence}%
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${
            file.detected.id === "unknown"
              ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-200"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {file.detected.id === "unknown" ? "Unknown" : "Detected"}
        </span>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        {(file.size / 1024).toFixed(1)} KB
      </p>
    </div>
  );
}