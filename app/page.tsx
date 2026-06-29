import StudioSidebar from "@/app/components/layout/StudioSidebar";
import DashboardStatCard from "@/app/components/dashboard/DashboardStatCard";
import QuickActionCard from "@/app/components/dashboard/QuickActionCard";
import InsightCard from "@/app/components/dashboard/InsightCard";
import ProjectCard from "@/app/components/dashboard/ProjectCard";
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
                Build, inspect, and optimize DayZ server files.
              </p>
            </div>

            <button className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-500">
              New Server
            </button>
          </header>

          <div className="mx-auto max-w-7xl px-8 py-12">
            <section className="rounded-3xl border border-slate-700 bg-[#0b1726] p-8 shadow-2xl">
              <div className="flex flex-wrap items-start justify-between gap-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
                    Welcome back
                  </p>
                  <h2 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
                    Exodus Studio Dashboard
                  </h2>
                  <p className="mt-4 max-w-3xl text-xl text-slate-400">
                    Your command center for DayZ loot economy, mission files,
                    validators, server health, and Nova AI.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
                  <p className="text-sm text-emerald-300">Server Health</p>
                  <p className="mt-2 text-5xl font-black text-emerald-400">
                    98%
                  </p>
                  <p className="mt-2 text-sm text-slate-400">Excellent</p>
                </div>
              </div>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <DashboardStatCard
  label="Mission Files"
  value="12"
  note="Ready to inspect"
/>

<DashboardStatCard
  label="Warnings"
  value="3"
  note="Low risk"
/>

<DashboardStatCard
  label="Tools"
  value="8"
  note="Available modules"
/>

<DashboardStatCard
  label="Nova Scan"
  value="Ready"
  note="AI diagnostics"
/>
            </section>

            <section className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-slate-700 bg-[#0b1726] p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black">Quick Actions</h3>
                    <p className="mt-2 text-slate-400">
                      Jump straight into the tools server owners need most.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <QuickActionCard
                    title="Edit Loot Economy"
                    description="Open the types.xml editor."
                    href="/tools/types"
                  />
                  <QuickActionCard
                    title="Validate XML"
                    description="Check files for syntax errors."
                    href="/tools/xml-validator"
                  />
                  <QuickActionCard
                    title="Run Nova Scan"
                    description="Analyze health, balance, and risk."
                    href="#"
                  />
                  <QuickActionCard
                    title="Create Server"
                    description="Start from vanilla map files."
                    href="#"
                  />
                  <QuickActionCard
                    title="POI Generator"
                    description="Generate custom points of interest."
                    href="#"
                  />
                  <QuickActionCard
                    title="Loot Simulator"
                    description="Preview how economy changes feel."
                    href="#"
                  />
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-700 bg-[#0b1726] p-7">
                <h3 className="text-2xl font-black text-emerald-300">
                  Nova Insights
                </h3>

                <div className="mt-6 space-y-4">
                  <InsightCard
                    title="Mission Control Online"
                    text="Dashboard shell is ready. Editors can now plug into one shared app experience."
                  />
                  <InsightCard
                    title="Recommended Next Step"
                    text="Move dashboard cards into reusable components next."
                  />
                  <InsightCard
                    title="Future Premium Feature"
                    text="Server Vault can store saved map profiles, version history, and backups."
                  />
                </div>
              </aside>
            </section>

            <section className="mt-8 rounded-3xl border border-slate-700 bg-[#0b1726] p-7">
              <h3 className="text-2xl font-black">Recent Projects</h3>
              <p className="mt-2 text-slate-400">
                Placeholder project history for future saved server profiles.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <ProjectCard name="EXODUS PvE" map="Chernarus" status="Healthy" />
                <ProjectCard name="Hardcore Test" map="Livonia" status="3 Warnings" />
                <ProjectCard name="Winter Event" map="Sakhal" status="Draft" />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

