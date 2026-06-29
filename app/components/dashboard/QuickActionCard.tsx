export default function QuickActionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-slate-700 bg-[#07111f] p-5 transition hover:border-emerald-500 hover:bg-[#0d1d31]"
    >
      <h4 className="text-lg font-black">{title}</h4>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </a>
  );
}