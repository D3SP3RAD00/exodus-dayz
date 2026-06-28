"use client";

import { useState } from "react";

export default function TypesToolPage() {
  const [pasteOpen, setPasteOpen] = useState(true);
  const [text, setText] = useState("");

  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-800 bg-[#081421] p-6 lg:flex lg:flex-col">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black leading-tight text-emerald-400">
                EXODUS
                <br />
                STUDIO
              </h1>
              <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-bold">
                Beta
              </span>
            </div>

            <nav className="mt-12 space-y-8">
              <NavSection title="Main">
                <NavItem label="Dashboard" />
                <NavItem label="Loot Economy" active />
                <SubItem label="types.xml" active />
                <SubItem label="spawnabletypes.xml" />
                <SubItem label="events.xml" />
                <SubItem label="cfgeventspawns.xml" />
                <NavItem label="Mission Files" />
                <NavItem label="AI Tools" />
                <NavItem label="POI Generator" />
                <NavItem label="Loot Simulator" />
              </NavSection>

              <NavSection title="Settings">
                <NavItem label="Settings" />
                <NavItem label="About" />
              </NavSection>
            </nav>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm">
              v0.1.0
            </span>
            <button className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2">
              «
            </button>
          </div>
        </aside>

        <section className="flex-1">
          <header className="flex h-20 items-center justify-end border-b border-slate-800 px-8">
            <div className="flex items-center gap-4 text-emerald-400">
              <span>☀</span>
              <button className="h-7 w-14 rounded-full bg-emerald-500">
                <span className="ml-7 block h-7 w-7 rounded-full bg-slate-900" />
              </button>
              <span className="text-slate-300">☾</span>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-8 py-12">
            <h2 className="text-6xl font-black tracking-tight">
              <span className="text-emerald-400">types.xml</span> Editor
            </h2>

            <p className="mt-4 text-xl text-slate-400">
              Professional loot economy manager for DayZ server owners.
            </p>

            <div className="mt-10 rounded-2xl border border-slate-700 bg-[#0b1726] p-7 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    Upload or Paste types.xml
                  </h3>
                  <p className="mt-2 text-slate-400">
                    Select a file or paste XML directly.
                  </p>
                </div>

                <button
                  onClick={() => setPasteOpen(!pasteOpen)}
                  className="rounded-xl border border-emerald-500/50 px-5 py-3 font-bold text-slate-200 hover:bg-emerald-500/10"
                >
                  {pasteOpen ? "Hide Paste" : "Paste XML"}
                </button>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.35fr]">
                <label className="flex min-h-96 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 bg-[#07111f] p-8 text-center hover:border-emerald-500">
                  <input
                    type="file"
                    accept=".xml"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) console.log(file.name);
                    }}
                  />

                  <div className="text-6xl text-emerald-400">☁</div>
                  <p className="mt-5 text-2xl font-bold">
                    Drag & drop your
                    <br />
                    types.xml here
                  </p>
                  <p className="mt-5 text-lg text-slate-400">
                    or <span className="text-emerald-400">click to browse</span>
                  </p>
                  <p className="mt-6 text-slate-500">Only .xml files</p>
                </label>

                {pasteOpen && (
                  <div className="rounded-2xl border border-slate-700 bg-[#07111f] p-6">
                    <h4 className="text-xl font-bold">
                      Paste your types.xml content below
                    </h4>

                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste your types.xml content here..."
                      className="mt-5 h-72 w-full rounded-xl border border-slate-700 bg-[#050b14] p-5 font-mono text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />

                    <button
                      onClick={() => console.log(text)}
                      className="mt-4 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-emerald-500"
                    >
                      Load Pasted XML
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
              <div className="flex gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 text-2xl text-blue-300">
                  i
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-blue-300">
                    What is types.xml?
                  </h3>
                  <p className="mt-2 text-slate-300">
                    types.xml controls every item in DayZ. You can edit spawn
                    values, restock timers, categories, usage, flags, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function NavItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`rounded-xl px-4 py-3 font-medium ${
        active ? "text-emerald-400" : "text-slate-300"
      }`}
    >
      {label}
    </div>
  );
}

function SubItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`ml-4 rounded-xl px-4 py-3 font-bold ${
        active
          ? "bg-emerald-500/20 text-white"
          : "text-slate-400 hover:bg-slate-800"
      }`}
    >
      {label}
    </div>
  );
}