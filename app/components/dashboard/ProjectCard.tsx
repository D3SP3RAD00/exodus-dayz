export default function ProjectCard({
  name,
  map,
  status,
}: {
  name: string;
  map: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#07111f] p-5">
      <h4 className="text-lg font-black">{name}</h4>
      <p className="mt-2 text-sm text-slate-400">{map}</p>
      <p className="mt-4 inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">
        {status}
      </p>
    </div>
  );
}