"use client";
import { exportTypesXml } from "@/app/lib/exporter/typesExporter";

import {
  analyzeValue,
  badgeClass,
  secondsToTime,
} from "@/app/lib/analyzer/typesAnalyzer";

import { useMemo, useRef, useState } from "react";

import {
  LoadedFile,
  TypeItem,
  parseTypesXml,
} from "@/app/lib/parser/typesParser";

function secondsToTime(value: string) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return "Instant / disabled";

  const days = seconds / 86400;
  if (days >= 1) return `${days.toFixed(days % 1 === 0 ? 0 : 1)} day(s)`;

  const hours = seconds / 3600;
  if (hours >= 1) return `${hours.toFixed(hours % 1 === 0 ? 0 : 1)} hour(s)`;

  const minutes = seconds / 60;
  if (minutes >= 1)
    return `${minutes.toFixed(minutes % 1 === 0 ? 0 : 1)} minute(s)`;

  return `${seconds} second(s)`;
}

function analyzeValue(label: string, value: string) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return {
      label: "Invalid",
      color: "red",
      message: `${label} should be a number.`,
    };
  }

  if (label === "Nominal") {
    if (number === 0) {
      return {
        label: "Disabled",
        color: "blue",
        message: "This item is disabled. Common on custom servers.",
      };
    }

    if (number >= 500) {
      return {
        label: "Risky",
        color: "red",
        message: "Very high spawn target. Could flood loot economy.",
      };
    }

    if (number >= 100) {
      return {
        label: "Boosted",
        color: "yellow",
        message: "Higher than typical vanilla-style values.",
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: "Normal-looking spawn target.",
    };
  }

  if (label === "Minimum") {
    if (number < 0) {
      return {
        label: "Risky",
        color: "red",
        message: "Minimum should not be negative.",
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: "Valid refill threshold.",
    };
  }

  if (label === "Lifetime") {
    if (number === 0) {
      return {
        label: "Warning",
        color: "yellow",
        message: "Lifetime is 0. Item may despawn instantly or behave oddly.",
      };
    }

    if (number > 604800) {
      return {
        label: "Risky",
        color: "red",
        message: `Very long lifetime: ${secondsToTime(value)}.`,
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: `Despawns after ${secondsToTime(value)}.`,
    };
  }

  if (label === "Restock") {
    if (number === 0) {
      return {
        label: "Instant",
        color: "green",
        message: "Instant restock allowed.",
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: `Restock delay: ${secondsToTime(value)}.`,
    };
  }

  return {
    label: "Info",
    color: "blue",
    message: "Reference value.",
  };
}

function badgeClass(color: string) {
  if (color === "red") return "border-red-500/50 bg-red-500/10 text-red-200";
  if (color === "yellow")
    return "border-yellow-500/50 bg-yellow-500/10 text-yellow-200";
  if (color === "green")
    return "border-emerald-500/50 bg-emerald-500/10 text-emerald-200";
  return "border-blue-500/50 bg-blue-500/10 text-blue-200";
}

export default function TypesToolPage() {
  const [pasteOpen, setPasteOpen] = useState(true);
  const [pasteText, setPasteText] = useState("");
  const [loaded, setLoaded] = useState<LoadedFile | null>(null);
  const [items, setItems] = useState<TypeItem[]>([]);
  const [selected, setSelected] = useState<TypeItem | null>(null);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function loadXml(xmlText: string, fileName: string) {
    const parsed = parseTypesXml(xmlText, fileName);
    setLoaded(parsed.loaded);
    setItems(parsed.items);
    setSelected(parsed.items[0] || null);
    setPasteText(xmlText);
  }

  async function handleFile(file: File) {
    const xmlText = await file.text();
    loadXml(xmlText, file.name);
  }

  function updateSelected(field: keyof TypeItem, value: string) {
    if (!selected) return;

    const updated = { ...selected, [field]: value };
    setSelected(updated);

    setItems((current) =>
      current.map((item) => (item.name === selected.name ? updated : item))
    );
  }

function downloadXml() {
  if (!loaded) return;

  exportTypesXml(loaded.xmlText, items, loaded.fileName);
}

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const disabledCount = items.filter((item) => item.nominal === "0").length;
  const lifetimeZeroCount = items.filter((item) => item.lifetime === "0").length;
  const missingCategoryCount = items.filter((item) => !item.category).length;
  const missingUsageCount = items.filter((item) => !item.usage).length;

  return (
    <main className="min-h-screen bg-[#06101d] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-800 bg-[#081421] p-6 lg:flex lg:flex-col">
          <div>
            <div className="flex items-start justify-between gap-3">
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

          <div className="mx-auto max-w-7xl px-8 py-12">
            <h2 className="text-5xl font-black tracking-tight md:text-6xl">
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
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files?.[0];
                    if (file) handleFile(file);
                  }}
                  className="flex min-h-96 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-500 bg-[#07111f] p-8 text-center transition hover:border-emerald-500 hover:bg-[#0b1726]"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xml"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) handleFile(file);
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
                </div>

                {pasteOpen && (
                  <div className="rounded-2xl border border-slate-700 bg-[#07111f] p-6">
                    <h4 className="text-xl font-bold">
                      Paste your types.xml content below
                    </h4>

                    <textarea
                      value={pasteText}
                      onChange={(event) => setPasteText(event.target.value)}
                      placeholder="Paste your types.xml content here..."
                      className="mt-5 h-72 w-full rounded-xl border border-slate-700 bg-[#050b14] p-5 font-mono text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />

                    <button
                      onClick={() => loadXml(pasteText, "pasted-types.xml")}
                      className="mt-4 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-emerald-500"
                    >
                      Load Pasted XML
                    </button>
                  </div>
                )}
              </div>
            </div>

            {loaded && (
              <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                <Stat label="XML" value={loaded.valid ? "Valid" : "Invalid"} />
                <Stat label="Items" value={items.length.toLocaleString()} />
                <Stat label="Disabled" value={disabledCount.toLocaleString()} />
                <Stat
                  label="Lifetime 0"
                  value={lifetimeZeroCount.toLocaleString()}
                />
                <Stat
                  label="No Category"
                  value={missingCategoryCount.toLocaleString()}
                />
                <Stat label="No Usage" value={missingUsageCount.toLocaleString()} />
              </div>
            )}

            {loaded?.valid === false && (
              <div className="mt-8 rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
                <h3 className="text-2xl font-bold">XML Error</h3>
                <p className="mt-2">{loaded.error}</p>
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr_340px]">
                <section className="rounded-2xl border border-slate-700 bg-[#0b1726] p-5">
                  <h3 className="text-lg font-bold">Item Search</h3>

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search classname..."
                    className="mt-4 w-full rounded-xl border border-slate-700 bg-[#050b14] p-3 text-slate-100 outline-none focus:border-emerald-500"
                  />

                  <p className="mt-3 text-sm text-slate-500">
                    Showing {Math.min(filteredItems.length, 300).toLocaleString()}{" "}
                    of {filteredItems.length.toLocaleString()} matches.
                  </p>

                  <div className="mt-4 max-h-[600px] overflow-y-auto pr-2">
                    {filteredItems.slice(0, 300).map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setSelected(item)}
                        className={`mb-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                          selected?.name === item.name
                            ? "bg-emerald-500 font-bold text-black"
                            : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </section>

                {selected && (
                  <section className="rounded-2xl border border-slate-700 bg-[#0b1726] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-5">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-slate-500">
                          Selected Item
                        </p>
                        <h3 className="mt-2 break-all text-3xl font-black">
                          {selected.name}
                        </h3>
                      </div>

                      <button
                        onClick={downloadXml}
                        className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-500"
                      >
                        Download XML
                      </button>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <SmartField
                        label="Nominal"
                        value={selected.nominal}
                        note="Target amount the server tries to keep in the economy."
                        onChange={(value) => updateSelected("nominal", value)}
                      />

                      <SmartField
                        label="Minimum"
                        value={selected.min}
                        note="Refill threshold. When count drops below this, the server replaces it."
                        onChange={(value) => updateSelected("min", value)}
                      />

                      <SmartField
                        label="Lifetime"
                        value={selected.lifetime}
                        note="How long the item stays in the world before despawning."
                        onChange={(value) => updateSelected("lifetime", value)}
                      />

                      <SmartField
                        label="Restock"
                        value={selected.restock}
                        note="Delay before the economy can restock this item."
                        onChange={(value) => updateSelected("restock", value)}
                      />

                      <BasicField
                        label="Category"
                        value={selected.category}
                        note="Broad item group such as weapons, clothes, food, tools, or containers."
                        onChange={(value) => updateSelected("category", value)}
                      />

                      <BasicField
                        label="Usage"
                        value={selected.usage}
                        note="Where it spawns, such as Military, Town, Village, Police, Medic, Hunting."
                        onChange={(value) => updateSelected("usage", value)}
                      />

                      <BasicField
                        label="Value"
                        value={selected.value}
                        note="Tier or rarity group used by the loot economy."
                        onChange={(value) => updateSelected("value", value)}
                      />
                    </div>
                  </section>
                )}

                {selected && (
                  <aside className="rounded-2xl border border-slate-700 bg-[#0b1726] p-6">
                    <h3 className="text-xl font-bold text-emerald-300">
                      Item Analysis
                    </h3>

                    <div className="mt-5 space-y-3">
                      <Summary label="Spawn Target" value={selected.nominal} />
                      <Summary label="Minimum" value={selected.min} />
                      <Summary
                        label="Despawn Time"
                        value={secondsToTime(selected.lifetime)}
                      />
                      <Summary
                        label="Restock Delay"
                        value={secondsToTime(selected.restock)}
                      />
                      <Summary
                        label="Category"
                        value={selected.category || "Not set"}
                      />
                      <Summary label="Usage" value={selected.usage || "Not set"} />
                      <Summary label="Value" value={selected.value || "Not set"} />
                    </div>

                    <div className="mt-6 rounded-2xl border border-blue-500/40 bg-blue-500/10 p-5">
                      <h4 className="font-bold text-blue-300">Nova Note</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Change one value at a time, download the edited XML, then
                        test before uploading to Nitrado. Huge boosts across many
                        items can flood the loot economy.
                      </p>
                    </div>
                  </aside>
                )}
              </div>
            )}

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
        active ? "bg-emerald-500/20 text-white" : "text-slate-400 hover:bg-slate-800"
      }`}
    >
      {label}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#0b1726] p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 break-all text-2xl font-black">{value}</p>
    </div>
  );
}

function SmartField({
  label,
  value,
  note,
  onChange,
}: {
  label: string;
  value: string;
  note: string;
  onChange: (value: string) => void;
}) {
  const analysis = analyzeValue(label, value);

  return (
    <label className="grid gap-2 rounded-2xl border border-slate-700 bg-[#07111f] p-4">
      <span className="text-sm font-bold text-slate-300">{label}</span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-700 bg-[#050b14] p-3 text-slate-100 outline-none focus:border-emerald-500"
      />

      <span className="text-xs leading-relaxed text-slate-500">{note}</span>

      <span
        className={`rounded-xl border px-3 py-2 text-xs ${badgeClass(
          analysis.color
        )}`}
      >
        <strong>{analysis.label}:</strong> {analysis.message}
      </span>
    </label>
  );
}

function BasicField({
  label,
  value,
  note,
  onChange,
}: {
  label: string;
  value: string;
  note: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 rounded-2xl border border-slate-700 bg-[#07111f] p-4">
      <span className="text-sm font-bold text-slate-300">{label}</span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Not set"
        className="rounded-xl border border-slate-700 bg-[#050b14] p-3 text-slate-100 outline-none focus:border-emerald-500"
      />

      <span className="text-xs leading-relaxed text-slate-500">{note}</span>
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-[#07111f] p-4">
      <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-1 break-all font-bold text-slate-200">{value}</p>
    </div>
  );
}