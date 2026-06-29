import StudioSidebar from "@/app/components/layout/StudioSidebar";
import DashboardStatCard from "@/app/components/dashboard/DashboardStatCard";
import QuickActionCard from "@/app/components/dashboard/QuickActionCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06101d] text-slate-100">
      <div className="flex min-h-screen">
        <StudioSidebar active="Dashboard" />

        <section className="flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-800 px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
                Mission Control
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Working Exodus Studio tools only.
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-8 py-12">
            <section className="rounded-3xl border border-slate-700 bg-[#0b1726] p-8 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
                Exodus Studio
              </p>

              <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
                Mission Control
              </h1>

              <p className="mt-4 max-w-3xl text-xl text-slate-400">
                Start with the working editors below. New tools will only be added here once they actually function.
              </p>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
              <DashboardStatCard label="Working Tools" value="3" note="Dashboard, types.xml, XML Validator" />
              <DashboardStatCard label="In Progress" value="1" note="spawnabletypes.xml editor" />
              <DashboardStatCard label="Fake Buttons" value="0" note="Removed from dashboard" />
            </section>

            <section className="mt-8 rounded-3xl border border-slate-700 bg-[#0b1726] p-7">
              <h2 className="text-2xl font-black">Working Tools</h2>
              <p className="mt-2 text-slate-400">
                These links open tools that exist in the project right now.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <QuickActionCard
                  title="types.xml Editor"
                  description="Upload, paste, search, edit, analyze, and download types.xml."
                  href="/tools/types"
                />

                <QuickActionCard
                  title="XML Validator"
                  description="Validate XML files and detect file type."
                  href="/tools/xml-validator"
                />

                <QuickActionCard
                  title="spawnabletypes.xml Editor"
                  description="New working page created. Parser/editor coming next."
                  href="/tools/spawnabletypes"
                />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}