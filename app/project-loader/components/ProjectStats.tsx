type ProjectStatsProps = {
  filesLoaded: number;
  recognized: number;
};

export default function ProjectStats({
  filesLoaded,
  recognized,
}: ProjectStatsProps) {
  const unknown = filesLoaded - recognized;

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      <Stat label="Files Loaded" value={filesLoaded.toString()} />
      <Stat label="Recognized" value={recognized.toString()} />
      <Stat label="Unknown" value={unknown.toString()} />
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#0b1726] p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}