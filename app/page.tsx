export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">

        <h1 className="text-6xl font-bold tracking-widest text-green-500">
          EXODUS
        </h1>

        <p className="mt-4 text-xl text-gray-300">
          AI Tools for DayZ Server Owners
        </p>

        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Save hours editing XML and JSON files.
          Analyze loot, generate POIs, validate configs,
          and build better DayZ servers.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">

          <button className="rounded-xl bg-green-600 px-6 py-3 hover:bg-green-500 transition">
            Loot Analyzer
          </button>

          <button className="rounded-xl bg-gray-800 px-6 py-3 hover:bg-gray-700 transition">
            XML Validator
          </button>

          <button className="rounded-xl bg-gray-800 px-6 py-3 hover:bg-gray-700 transition">
            POI Generator
          </button>

          <button className="rounded-xl bg-gray-800 px-6 py-3 hover:bg-gray-700 transition">
            Economy Builder
          </button>

        </div>

        <p className="mt-12 text-sm text-gray-600">
          Coming Soon • AI Server Builder
        </p>

      </div>
    </main>
  );
}