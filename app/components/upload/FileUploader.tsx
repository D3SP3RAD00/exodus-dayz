"use client";

import { useState } from "react";

type Props = {
  onSelect: (file: File) => void;
  onPasteText?: (text: string, fileName: string) => void;
};

export default function FileUploader({ onSelect, onPasteText }: Props) {
  const [pasteOpen, setPasteOpen] = useState(false);
  const [text, setText] = useState("");

  function handlePasteLoad() {
    if (!text.trim()) return;
    onPasteText?.(text, "pasted-types.xml");
    setText("");
  }

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <label className="block text-lg font-bold text-white">
            Upload types.xml
          </label>
          <p className="mt-1 text-sm text-slate-400">
            Select a file or paste XML directly.
          </p>
        </div>

        <button
          onClick={() => setPasteOpen(!pasteOpen)}
          className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300 hover:bg-emerald-500/20"
        >
          {pasteOpen ? "Hide Paste" : "Paste XML"}
        </button>
      </div>

      <input
        type="file"
        accept=".xml"
        onChange={(e) => {
          if (!e.target.files?.length) return;
          onSelect(e.target.files[0]);
        }}
        className="mt-5 block w-full rounded-xl border border-slate-600 bg-slate-900 p-3 text-white"
      />

      {pasteOpen && (
        <div className="mt-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your types.xml content here..."
            className="h-64 w-full rounded-xl border border-slate-600 bg-slate-950 p-4 font-mono text-sm text-slate-100 outline-none focus:border-emerald-500"
          />

          <button
            onClick={handlePasteLoad}
            className="mt-3 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-black hover:bg-emerald-400"
          >
            Load Pasted XML
          </button>
        </div>
      )}
    </div>
  );
}