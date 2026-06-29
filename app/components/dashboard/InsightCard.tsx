export default function InsightCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
      <h4 className="font-bold text-blue-300">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}