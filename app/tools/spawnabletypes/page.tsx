"use client";

import { useMemo, useRef, useState } from "react";

import StudioSidebar from "@/app/components/layout/StudioSidebar";
import { analyzeSpawnableTypes } from "@/app/lib/analyzer/spawnableTypesAnalyzer";
import { exportSpawnableTypesXml } from "@/app/lib/exporter/spawnableTypesExporter";
import {
  LoadedSpawnableFile,
  SpawnableAttachment,
  SpawnableTypeItem,
  parseSpawnableTypesXml,
} from "@/app/lib/parser/spawnableTypesParser";

export default function SpawnableTypesPage() {
  const [pasteOpen, setPasteOpen] = useState(true);
  const [pasteText, setPasteText] = useState("");
  const [loaded, setLoaded] = useState<LoadedSpawnableFile | null>(null);
  const [items, setItems] = useState<SpawnableTypeItem[]>([]);
  const [selected, setSelected] = useState<SpawnableTypeItem | null>(null);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function loadXml(xmlText: string, fileName: string) {
    const parsed = parseSpawnableTypesXml(xmlText, fileName);
    setLoaded(parsed.loaded);
    setItems(parsed.items);
    setSelected(parsed.items[0] || null);
    setPasteText(xmlText);
  }

  async function handleFile(file: File) {
    const xmlText = await file.text();
    loadXml(xmlText, file.name);
  }

  function updateList(
    listName: "attachments" | "cargo",
    index: number,
    field: keyof SpawnableAttachment,
    value: string
  ) {
    if (!selected) return;

    const updatedList = [...selected[listName]];
    updatedList[index] = { ...updatedList[index], [field]: value };

    const updated = { ...selected, [listName]: updatedList };

    setSelected(updated);
    setItems((current) =>
      current.map((item) => (item.name === selected.name ? updated : item))
    );
  }

  function addEntry(listName: "attachments" | "cargo") {
    if (!selected) return;

    const updated = {
      ...selected,
      [listName]: [...selected[listName], { name: "", chance: "1.00" }],
    };

    setSelected(updated);
    setItems((current) =>
      current.map((item) => (item.name === selected.name ? updated : item))
    );
  }

  function duplicateEntry(listName: "attachments" | "cargo", index: number) {
    if (!selected) return;

    const entry = selected[listName][index];
    if (!entry) return;

    const updatedList = [...selected[listName]];
    updatedList.splice(index + 1, 0, { ...entry });

    const updated = { ...selected, [listName]: updatedList };

    setSelected(updated);
    setItems((current) =>
      current.map((item) => (item.name === selected.name ? updated : item))
    );
  }

  function removeEntry(listName: "attachments" | "cargo", index: number) {
    if (!selected) return;

    const updated = {
      ...selected,
      [listName]: selected[listName].filter(
        (_, itemIndex) => itemIndex !== index
      ),
    };

    setSelected(updated);
    setItems((current) =>
      current.map((item) => (item.name === selected.name ? updated : item))
    );
  }

  function downloadXml() {
    if (!loaded) return;
    exportSpawnableTypesXml(loaded.xmlText, items, loaded.fileName);
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const pools = useMemo(() => analyzeSpawnableTypes(items), [items]);

  const attachmentCount = items.reduce(
    (total, item) => total + item.attachments.length,
    0
  );

  const cargoCount = items.reduce((total, item) => total + item.cargo.length, 0);

  const selectedWarnings = useMemo(() => {
    if (!selected) return [];

    const warnings: string[] = [];

    const badAttachmentChance = selected.attachments.some(
      (entry) =>
        Number.isNaN(Number(entry.chance)) ||
        Number(entry.chance) < 0 ||
        Number(entry.chance) > 1
    );

    const badCargoChance = selected.cargo.some(
      (entry) =>
        Number.isNaN(Number(entry.chance)) ||
        Number(entry.chance) < 0 ||
        Number(entry.chance) > 1
    );

    if (badAttachmentChance) {
      warnings.push("One or more attachment chances are outside 0.00–1.00.");
    }

    if (badCargoChance) {
      warnings.push("One or more cargo chances are outside 0.00–1.00.");
    }

    if (selected.attachments.some((entry) => !entry.name.trim())) {
      warnings.push("One or more attachment entries have no classname.");
    }

    if (selected.cargo.some((entry) => !entry.name.trim())) {
      warnings.push("One or more cargo entries have no classname.");
    }

    return warnings;
  }, [selected]);

  return (
    <main className="min-h-screen bg-[#06101d] text-slate-100">
      <div className="flex min-h-screen">
        <StudioSidebar active="spawnabletypes.xml" />

        <section className="flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-800 px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
                Loot Economy
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Edit spawnabletypes.xml attachments and cargo.
              </p>
            </div>

            {loaded && (
              <button
                onClick={downloadXml}
                className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-500"
              >
                Download XML
              </button>
            )}
          </header>

          <div className="mx-auto max-w-7xl px-8 py-12">
            <section className="rounded-3xl border border-slate-700 bg-[#0b1726] p-8 shadow-2xl">
              <h1 className="text-5xl font-black tracking-tight">
                <span className="text-emerald-400">spawnabletypes.xml</span>{" "}
                Editor
              </h1>

              <p className="mt-4 max-w-3xl text-xl text-slate-400">
                Upload or paste spawnabletypes.xml, search classnames, edit
                attachments and cargo with dropdowns built from the uploaded
                file, then download the edited XML.
              </p>
            </section>

            <section className="mt-8 rounded-2xl border border-slate-700 bg-[#0b1726] p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    Upload or Paste spawnabletypes.xml
                  </h2>
                  <p className="mt-2 text-slate-400">
                    Select the exact file from your Nitrado mission folder.
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
                  className="flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-500 bg-[#07111f] p-8 text-center transition hover:border-emerald-500 hover:bg-[#0b1726]"
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
                    spawnabletypes.xml here
                  </p>

                  <p className="mt-5 text-lg text-slate-400">
                    or <span className="text-emerald-400">click to browse</span>
                  </p>
                </div>

                {pasteOpen && (
                  <div className="rounded-2xl border border-slate-700 bg-[#07111f] p-6">
                    <h3 className="text-xl font-bold">
                      Paste spawnabletypes.xml
                    </h3>

                    <textarea
                      value={pasteText}
                      onChange={(event) => setPasteText(event.target.value)}
                      placeholder="Paste your spawnabletypes.xml content here..."
                      className="mt-5 h-64 w-full rounded-xl border border-slate-700 bg-[#050b14] p-5 font-mono text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />

                    <button
                      onClick={() =>
                        loadXml(pasteText, "pasted-spawnabletypes.xml")
                      }
                      className="mt-4 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white hover:bg-emerald-500"
                    >
                      Load Pasted XML
                    </button>
                  </div>
                )}
              </div>
            </section>

            {loaded && (
              <section className="mt-8 grid gap-4 md:grid-cols-4">
                <Stat label="XML" value={loaded.valid ? "Valid" : "Invalid"} />
                <Stat label="Items" value={items.length.toLocaleString()} />
                <Stat
                  label="Attachments"
                  value={attachmentCount.toLocaleString()}
                />
                <Stat
                  label="Cargo Entries"
                  value={cargoCount.toLocaleString()}
                />
              </section>
            )}

            {loaded?.valid === false && (
              <section className="mt-8 rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
                <h2 className="text-2xl font-bold">XML Error</h2>
                <p className="mt-2">{loaded.error}</p>
              </section>
            )}

            {items.length > 0 && (
              <section className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">
                <div className="rounded-2xl border border-slate-700 bg-[#0b1726] p-5">
                  <h2 className="text-lg font-bold">Search Classnames</h2>

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search weapon, item, container, vehicle..."
                    className="mt-4 w-full rounded-xl border border-slate-700 bg-[#050b14] p-3 text-slate-100 outline-none focus:border-emerald-500"
                  />

                  <p className="mt-3 text-sm text-slate-500">
                    Showing {Math.min(filteredItems.length, 300)} of{" "}
                    {filteredItems.length} matches.
                  </p>

                  <div className="mt-4 max-h-[650px] overflow-y-auto pr-2">
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
                </div>

                {selected && (
                  <div className="rounded-2xl border border-slate-700 bg-[#0b1726] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-5">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-slate-500">
                          Selected Classname
                        </p>
                        <h2 className="mt-2 break-all text-3xl font-black">
                          {selected.name}
                        </h2>
                      </div>

                      <div className="rounded-xl border border-slate-700 bg-[#07111f] px-4 py-3 text-sm text-slate-400">
                        {selected.attachments.length} attachments ·{" "}
                        {selected.cargo.length} cargo
                      </div>
                    </div>

                    {selectedWarnings.length > 0 && (
                      <div className="mt-6 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-5 text-yellow-100">
                        <h3 className="font-bold">Warnings</h3>

                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                          {selectedWarnings.map((warning) => (
                            <li key={warning}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <EditableList
                        title="Attachments"
                        items={selected.attachments}
                        options={pools.attachmentOptions}
                        emptyText="No attachment entries found for this classname."
                        onAdd={() => addEntry("attachments")}
                        onDuplicate={(index) =>
                          duplicateEntry("attachments", index)
                        }
                        onRemove={(index) => removeEntry("attachments", index)}
                        onChange={(index, field, value) =>
                          updateList("attachments", index, field, value)
                        }
                      />

                      <EditableList
                        title="Cargo"
                        items={selected.cargo}
                        options={pools.cargoOptions}
                        emptyText="No cargo entries found for this classname."
                        onAdd={() => addEntry("cargo")}
                        onDuplicate={(index) => duplicateEntry("cargo", index)}
                        onRemove={(index) => removeEntry("cargo", index)}
                        onChange={(index, field, value) =>
                          updateList("cargo", index, field, value)
                        }
                      />
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
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

function EditableList({
  title,
  items,
  options,
  emptyText,
  onAdd,
  onDuplicate,
  onRemove,
  onChange,
}: {
  title: string;
  items: SpawnableAttachment[];
  options: string[];
  emptyText: string;
  onAdd: () => void;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    field: keyof SpawnableAttachment,
    value: string
  ) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#07111f] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Choose from classnames discovered in the uploaded file.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="rounded-lg border border-emerald-500/50 px-3 py-2 text-sm font-bold text-emerald-300 hover:bg-emerald-500/10"
        >
          Add
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {items.length === 0 && (
          <p className="rounded-xl border border-slate-700 bg-[#050b14] p-4 text-sm text-slate-500">
            {emptyText}
          </p>
        )}

        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="grid gap-3 rounded-xl border border-slate-700 bg-[#050b14] p-4"
          >
            <select
              value={item.name}
              onChange={(event) =>
                onChange(index, "name", event.target.value)
              }
              className="rounded-xl border border-slate-700 bg-[#07111f] p-3 text-slate-100 outline-none focus:border-emerald-500"
            >
              <option value="">Select classname...</option>

              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

              {item.name && !options.includes(item.name) && (
                <option value={item.name}>{item.name}</option>
              )}
            </select>

            <input
              value={item.chance}
              onChange={(event) =>
                onChange(index, "chance", event.target.value)
              }
              placeholder="Chance"
              className="rounded-xl border border-slate-700 bg-[#07111f] p-3 text-slate-100 outline-none focus:border-emerald-500"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onDuplicate(index)}
                className="rounded-xl border border-blue-500/40 px-4 py-2 text-sm font-bold text-blue-300 hover:bg-blue-500/10"
              >
                Duplicate
              </button>

              <button
                onClick={() => onRemove(index)}
                className="rounded-xl border border-red-500/40 px-4 py-2 text-sm font-bold text-red-300 hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}