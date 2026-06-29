type ProjectUploadPanelProps = {
  onFilesSelected: (files: FileList | null) => void;
};

export default function ProjectUploadPanel({
  onFilesSelected,
}: ProjectUploadPanelProps) {
  return (
    <section className="rounded-3xl border border-slate-700 bg-[#0b1726] p-8 shadow-2xl">
      <h1 className="text-5xl font-black">Load DayZ Mission Project</h1>

      <p className="mt-4 max-w-3xl text-xl text-slate-400">
        Upload your mission files. Exodus Studio will fingerprint each file by
        structure and prepare them for project-wide validation.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="cursor-pointer rounded-2xl border border-slate-700 bg-[#07111f] p-6 transition hover:border-emerald-500">
          <div className="text-lg font-bold text-emerald-300">
            Load Mission Folder
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Load an entire DayZ mission folder at once.
          </p>

          <input
            type="file"
            multiple
            // @ts-expect-error Chromium supports this
            webkitdirectory="true"
            onChange={(event) => onFilesSelected(event.target.files)}
            className="hidden"
          />
        </label>

        <label className="cursor-pointer rounded-2xl border border-slate-700 bg-[#07111f] p-6 transition hover:border-emerald-500">
          <div className="text-lg font-bold text-emerald-300">
            Load Individual Files
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Select one or more XML/JSON files manually.
          </p>

          <input
            type="file"
            multiple
            accept=".xml,.json"
            onChange={(event) => onFilesSelected(event.target.files)}
            className="hidden"
          />
        </label>
      </div>
    </section>
  );
}