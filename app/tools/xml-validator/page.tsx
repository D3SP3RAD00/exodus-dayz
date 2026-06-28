"use client";

import { useState } from "react";

type Check = {
  title: string;
  message: string;
  level: "warning" | "info" | "success";
};

type Result = {
  status: string;
  fileName?: string;
  fileSize?: string;
  rootNode?: string;
  itemCount?: number;
  fileType?: string;
  checks?: Check[];
};

function detectDayZFile(fileName: string, rootNode?: string) {
  const name = fileName.toLowerCase();

  if (name.includes("spawnabletypes")) return "cfgspawnabletypes.xml — Attachments / Cargo";
  if (name.includes("eventspawns")) return "cfgeventspawns.xml — Event Locations";
  if (name.includes("economycore")) return "cfgeconomycore.xml — Economy Core";
  if (name.includes("events")) return "events.xml — Dynamic Events";
  if (name.includes("types")) return "types.xml — Loot Economy";
  if (rootNode) return `Unknown DayZ XML — Root: <${rootNode}>`;

  return "Unknown XML";
}

function analyzeTypesXml(xml: Document) {
  const checks: Check[] = [];
  const types = Array.from(xml.getElementsByTagName("type"));
  const seen = new Map<string, number>();

  let disabledItems = 0;
  let lifetimeZero = 0;
  let missingCategory = 0;
  let missingUsage = 0;
  let missingValue = 0;

  for (const type of types) {
    const name = type.getAttribute("name") || "UNKNOWN";
    seen.set(name, (seen.get(name) || 0) + 1);

    const nominal = type.getElementsByTagName("nominal")[0]?.textContent?.trim();
    const lifetime = type.getElementsByTagName("lifetime")[0]?.textContent?.trim();

    if (nominal === "0") disabledItems++;
    if (lifetime === "0") lifetimeZero++;
    if (!type.getElementsByTagName("category")[0]) missingCategory++;
    if (!type.getElementsByTagName("usage")[0]) missingUsage++;
    if (!type.getElementsByTagName("value")[0]) missingValue++;
  }

  const duplicates = Array.from(seen.entries()).filter(([, count]) => count > 1);

  if (duplicates.length > 0) {
    checks.push({
      level: "warning",
      title: "Duplicate classnames",
      message: `${duplicates.length} duplicate item classname(s) found.`,
    });
  }

  if (lifetimeZero > 0) {
    checks.push({
      level: "warning",
      title: "Lifetime set to 0",
      message: `${lifetimeZero} item(s) have lifetime set to 0.`,
    });
  }

  if (disabledItems > 0) {
    checks.push({
      level: "info",
      title: "Disabled items",
      message: `${disabledItems} item(s) have nominal set to 0. This is common on customized servers.`,
    });
  }

  if (missingCategory > 0) {
    checks.push({
      level: "info",
      title: "Missing categories",
      message: `${missingCategory} item(s) are missing a category tag.`,
    });
  }

  if (missingUsage > 0) {
    checks.push({
      level: "info",
      title: "Missing usage tags",
      message: `${missingUsage} item(s) are missing a usage tag.`,
    });
  }

  if (missingValue > 0) {
    checks.push({
      level: "info",
      title: "Missing value tags",
      message: `${missingValue} item(s) are missing a value tag.`,
    });
  }

  if (checks.length === 0) {
    checks.push({
      level: "success",
      title: "No basic issues detected",
      message: "No duplicate classnames or common types.xml issues were found.",
    });
  }

  return checks;
}

function getCheckStyle(level: Check["level"]) {
  if (level === "warning") {
    return "border-yellow-500/80 bg-yellow-500/10 text-yellow-200";
  }

  if (level === "success") {
    return "border-green-500/80 bg-green-500/10 text-green-200";
  }

  return "border-blue-500/80 bg-blue-500/10 text-blue-200";
}

function getCheckIcon(level: Check["level"]) {
  if (level === "warning") return "⚠";
  if (level === "success") return "✅";
  return "ℹ";
}

export default function XMLValidatorPage() {
  const [result, setResult] = useState<Result>({
    status: "No file checked yet.",
  });

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const error = xml.querySelector("parsererror");

    if (error) {
      setResult({
        status: "❌ XML is invalid. The file has syntax errors.",
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      });

      return;
    }

    const rootNode = xml.documentElement.nodeName;
    const itemCount = xml.getElementsByTagName("type").length;
    const fileType = detectDayZFile(file.name, rootNode);

    const checks =
      file.name.toLowerCase().includes("types") || rootNode.toLowerCase() === "types"
        ? analyzeTypesXml(xml)
        : [];

    setResult({
      status: "✅ XML is valid. No syntax errors found.",
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      rootNode,
      itemCount,
      fileType,
      checks,
    });
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-green-500">
          EXODUS TOOLS
        </p>

        <h1 className="mt-4 text-5xl font-black">XML Validator</h1>

        <p className="mt-4 text-zinc-400">
          Upload a DayZ XML file and check whether the syntax is valid.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <input
            type="file"
            accept=".xml"
            onChange={handleFile}
            className="block w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-zinc-300"
          />

          <div className="mt-6 rounded-xl border border-zinc-800 bg-black p-5">
            <p className="text-lg font-bold">{result.status}</p>

            {result.fileName && (
              <div className="mt-5 grid gap-3 text-sm text-zinc-300">
                <p>
                  <span className="text-zinc-500">File:</span> {result.fileName}
                </p>

                <p>
                  <span className="text-zinc-500">Size:</span> {result.fileSize}
                </p>

                {result.fileType && (
                  <p>
                    <span className="text-zinc-500">Detected:</span>{" "}
                    {result.fileType}
                  </p>
                )}

                {result.rootNode && (
                  <p>
                    <span className="text-zinc-500">Root Node:</span>{" "}
                    &lt;{result.rootNode}&gt;
                  </p>
                )}

                {typeof result.itemCount === "number" && (
                  <p>
                    <span className="text-zinc-500">Items:</span>{" "}
                    {result.itemCount.toLocaleString()}
                  </p>
                )}

                {result.checks && result.checks.length > 0 && (
                  <div className="mt-5 border-t border-zinc-800 pt-5">
                    <p className="mb-3 text-lg font-bold text-green-400">
                      DayZ Checks
                    </p>

                    <div className="grid gap-3">
                      {result.checks.map((check, index) => (
                        <div
                          key={index}
                          className={`rounded-xl border p-4 ${getCheckStyle(
                            check.level
                          )}`}
                        >
                          <p className="font-bold">
                            {getCheckIcon(check.level)} {check.title}
                          </p>
                          <p className="mt-1 text-sm opacity-90">
                            {check.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}