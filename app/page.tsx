import { exportTypesXml } from "@/app/lib/exporter/typesExporter";
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-green-500">
          Exodus-DayZ.com
        </p>

        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
          AI tools for DayZ server owners.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Validate XML, analyze loot, generate POIs, and build cleaner DayZ
          servers without spending hours fighting config files.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-xl bg-green-500 px-8 py-4 font-bold text-black transition hover:bg-green-400">
            Launch Tools
          </button>

          <button className="rounded-xl border border-zinc-700 px-8 py-4 font-bold text-zinc-200 transition hover:border-green-500 hover:text-green-400">
            Join Early Access
          </button>
        </div>

        <div className="mt-16 grid w-full gap-4 sm:grid-cols-3">
          {[
            "Loot Analyzer",
            "XML Validator",
            "POI Generator",
          ].map((tool) => (
            <div
              key={tool}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
            >
              <h2 className="text-xl font-bold">{tool}</h2>
              <p className="mt-3 text-sm text-zinc-500">
                Coming soon for console and PC server owners.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}