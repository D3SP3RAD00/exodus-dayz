"use client";

import { useState } from "react";

type Result = {
  status: string;
  fileName?: string;
  fileSize?: string;
  rootNode?: string;
  elementCount?: number;
  fileType?: string;
};

function detectDayZFile(fileName: string, rootNode?: string) {
  const name = fileName.toLowerCase();

  if (name.includes("types")) return "types.xml — Loot Economy";
  if (name.includes("events")) return "events.xml — Event Spawns";
  if (name.includes("spawnabletypes")) return "cfgspawnabletypes.xml — Attachments / Cargo";
  if (name.includes("eventspawns")) return "cfgeventspawns.xml — Event Locations";
  if (name.includes("economycore")) return "cfgeconomycore.xml — Economy Core";
  if (rootNode) return `Unknown DayZ XML — Root: <${rootNode}>`;

  return "Unknown XML file";
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
        status: "❌ XML is invalid. The file has a syntax error.",
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      });
      return;
    }

    const rootNode = xml.documentElement.nodeName;

    setResult({
      status: "✅ XML is valid. No syntax errors found.",
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      rootNode,
      elementCount: xml.getElementsByTagName("*").length,
      fileType: detectDayZFile(file.name, rootNode),
    });
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-green-500">
          Exodus Tools
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
                {result.fileType && (
                  <p><span className="text-zinc-500">Detected:</span> {result.fileType}</p>
                )}
                {result.rootNode && (
                  <p><span className="text-zinc-500">Root Node:</span> &lt;{result.rootNode}&gt;</p>
                )}
                {typeof result.elementCount === "number" && (
                  <p><span className="text-zinc-500">Elements:</span> {result.elementCount}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}