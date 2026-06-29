type StudioSidebarProps = {
  active?: string;
};

export default function StudioSidebar({ active = "Dashboard" }: StudioSidebarProps) {
  return (
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
            <NavItem label="Dashboard" href="/" active={active === "Dashboard"} />
            <NavItem label="Loot Economy" active={active === "Loot Economy"} />
            <SubItem label="types.xml" href="/tools/types" active={active === "types.xml"} />
            <SubItem label="spawnabletypes.xml" href="#" active={active === "spawnabletypes.xml"} />
            <SubItem label="events.xml" href="#" active={active === "events.xml"} />
            <SubItem label="cfgeventspawns.xml" href="#" active={active === "cfgeventspawns.xml"} />
            <NavItem label="Mission Files" href="#" active={active === "Mission Files"} />
            <NavItem label="AI Tools" href="#" active={active === "AI Tools"} />
            <NavItem label="POI Generator" href="#" active={active === "POI Generator"} />
            <NavItem label="Loot Simulator" href="#" active={active === "Loot Simulator"} />
          </NavSection>

          <NavSection title="Settings">
            <NavItem label="Settings" href="#" active={active === "Settings"} />
            <NavItem label="About" href="#" active={active === "About"} />
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

function NavItem({
  label,
  href = "#",
  active = false,
}: {
  label: string;
  href?: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`block rounded-xl px-4 py-3 font-medium transition ${
        active
          ? "bg-emerald-500/20 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      {label}
    </a>
  );
}

function SubItem({
  label,
  href = "#",
  active = false,
}: {
  label: string;
  href?: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`ml-4 block rounded-xl px-4 py-3 font-bold transition ${
        active
          ? "bg-emerald-500/20 text-white"
          : "text-slate-400 hover:bg-slate-800"
      }`}
    >
      {label}
    </a>
  );
}