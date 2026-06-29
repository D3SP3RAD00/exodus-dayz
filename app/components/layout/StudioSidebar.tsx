import Link from "next/link";

type StudioSidebarProps = {
  active?: string;
};

export default function StudioSidebar({
  active = "Dashboard",
}: StudioSidebarProps) {
  return (
    <aside className="hidden w-72 border-r border-slate-800 bg-[#081421] p-6 lg:flex lg:flex-col">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black leading-tight text-emerald-400">
              EXODUS
              <br />
              STUDIO
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              DayZ Development Environment
            </p>
          </div>

          <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-bold">
            Beta
          </span>
        </div>

        <nav className="mt-12 space-y-8">
          <NavSection title="Workspace">
            <NavItem
              label="Dashboard"
              href="/"
              active={active === "Dashboard"}
            />

            <NavItem
              label="types.xml Editor"
              href="/tools/types"
              active={active === "types.xml"}
            />

            <NavItem
              label="XML Validator"
              href="/tools/xml-validator"
              active={active === "XML Validator"}
            />
          </NavSection>
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-800 pt-6">
        <p className="text-xs text-slate-500">
          Exodus Studio v0.1.0
        </p>

        <p className="mt-2 text-xs text-slate-600">
          3 Working Tools
        </p>
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
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
        {title}
      </p>

      <div className="space-y-2">{children}</div>
    </div>
  );
}

function NavItem({
  label,
  href,
  active = false,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl px-4 py-3 font-medium transition ${
        active
          ? "bg-emerald-500/20 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      {label}
    </Link>
  );
}