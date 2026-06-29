import { DetectionResult } from "./dayzFileDetector";

export type AuditedProjectFile = {
  name: string;
  detected: DetectionResult;
};

export type ProjectAuditResult = {
  requiredFiles: {
    id: string;
    displayName: string;
    present: boolean;
  }[];
  healthScore: number;
  warnings: string[];
};

const requiredFiles = [
  { id: "types", displayName: "types.xml" },
  { id: "spawnabletypes", displayName: "cfgspawnabletypes.xml" },
  { id: "events", displayName: "events.xml" },
  { id: "globals", displayName: "globals.xml" },
  { id: "economy", displayName: "economy.xml" },
];

export function auditDayZProject(
  files: AuditedProjectFile[]
): ProjectAuditResult {
  const detectedIds = new Set(files.map((file) => file.detected.id));

  const requiredStatus = requiredFiles.map((file) => ({
    ...file,
    present: detectedIds.has(file.id),
  }));

  const missing = requiredStatus.filter((file) => !file.present);
  const unknownCount = files.filter((file) => file.detected.id === "unknown").length;

  const warnings = [
    ...missing.map((file) => `${file.displayName} is missing.`),
    ...(unknownCount > 0 ? [`${unknownCount} unknown file(s) detected.`] : []),
  ];

  const healthScore = Math.max(0, 100 - missing.length * 12 - unknownCount * 5);

  return {
    requiredFiles: requiredStatus,
    healthScore,
    warnings,
  };
}