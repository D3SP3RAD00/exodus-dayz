type StudioShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function StudioShell({
  title,
  subtitle,
  children,
}: StudioShellProps) {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
              EXODUS STUDIO
            </p>
            <p className="text-sm text-slate-400">DayZ Mission Control</p>
          </div>

          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300">
            Beta
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          <h1 className="text-5xl font-black tracking-tight">{title}</h1>
          <p className="mt-4 max-w-2xl text-slate-400">{subtitle}</p>
        </div>

        {children}
      </section>
    </main>
  );
}