"use client";

import { useState } from "react";

type Warning = {
  label: string;
  detail: string;
};

type Result = {
  status: string;
  fileName?: string;
  fileSize?: string;
  rootNode?: string;
  itemCount?: number;
  fileType?: string;
  warnings?: Warning[];
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

function getChildNumber(type: Element, tag: string) {
  const value = type.querySelector(tag)?.textContent?.trim();
  if (!value) return null;

  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

function analyzeTypesXml(xml: Document) {
  const warnings: Warning[] = [];
  const types = Array.from(xml.getElementsByTagName("type"));
  const names = new Map<string, number>();

  let disabledItems = 0;
  let lifetimeZero = 0;
  let missingCategory = 0;

  for (const type of types) {
    const name = type.getAttribute("name") || "Unnamed item";
    names.set(name, (names.get(name) || 0) + 1);

    const nominal = getChildNumber(type, "nominal");
    const lifetime = getChildNumber(type, "lifetime");
    const category = type.querySelector("category");

    if (nominal === 0) disabledItems++;
    if (lifetime === 0) lifetimeZero++;
    if (!category) missingCategory++;
  }

  const duplicates = Array.from(names.entries()).filter(([, count]) => count > 1);

  if (duplicates.length > 0) {
    warnings.push({
      label: "Duplicate items detected",
      detail: `${duplicates.length} classnames appear more than once.`,
    });
  }

  if (disabledItems > 0) {
    warnings.push({
      label: "Disabled items",
      detail: `${disabledItems} items have nominal set to 0.`,
    });
  }

  if (lifetimeZero > 0) {
    warnings.push({
      label: "Lifetime issue",
      detail: `${lifetimeZero} items have lifetime set to 0.`,
    });
  }

  if (missingCategory > 0) {
    warnings.push({
      label: "Missing categories",
      detail: `${missingCategory} items are missing a category tag.`,
    });
  }

  return warnings;
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

    const warnings =
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
      warnings,
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
                <p><span className="text-zinc-500">File:</span> {result.fileName}</p>
                <p><span className="text-zinc-500">Size:</span> {result.fileSize}</p>
                {result.fileType && <p><span className="text-zinc-500">Detected:</span> {result.fileType}</p>}
                {result.rootNode && <p><span className="text-zinc-500">Root Node:</span> &lt;{result.rootNode}&gt;</p>}
                {typeof result.itemCount === "number" && (
                  <p><span className="text-zinc-500">Items:</span> {result.itemCount.toLocaleString()}</p>
                )}
              </div>
            )}

            {result.warnings && result.warnings.length > 0 && (
              <div className="mt-6 border-t border-zinc-800 pt-5">
                <h2 className="text-lg font-bold text-yellow-400">Warnings</h2>

                <div className="mt-4 grid gap-3">
                  {result.warnings.map((warning) => (
                    <div
                      key={warning.label}
                      className="rounded-xl border border-yellow-900/60 bg-yellow-950/20 p-4"
                    >
                      <p className="font-bold text-yellow-300">⚠ {warning.label}</p>
                      <p className="mt-1 text-sm text-zinc-400">{warning.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.warnings && result.warnings.length === 0 && result.fileName && (
              <p className="mt-6 text-sm text-green-400">
                ✅ No common DayZ issues detected.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}