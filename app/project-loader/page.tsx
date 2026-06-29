"use client";

import { useMemo, useState } from "react";

import StudioSidebar from "@/app/components/layout/StudioSidebar";
import { detectDayZXml } from "@/app/lib/project/dayzFileDetector";

import ProjectFileCard from "./components/ProjectFileCard";
import ProjectStats from "./components/ProjectStats";
import ProjectUploadPanel from "./components/ProjectUploadPanel";

type LoadedProjectFile = {
  name: string;
  size: number;
  text: string;
  path: string;
};

export default function ProjectLoaderPage() {
  const [files, setFiles] = useState<LoadedProjectFile[]>([]);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return;

    const loaded = await Promise.all(
      Array.from(fileList).map(async (file) => ({
        name: file.name,
        size: file.size,
        text: await file.text(),
        path: file.webkitRelativePath || file.name,
      }))
    );

    setFiles(loaded);
  }

  const detectedFiles = useMemo(() => {
    return files.map((file) => ({
      ...file,
      detected: detectDayZXml(file.name, file.text),
    }));
  }, [files]);

  const supportedCount = detectedFiles.filter(
    (file) => file.detected.id !== "unknown"
  ).length;

  return (
    <main className="min-h-screen bg-[#06101d] text-slate-100">
      <div className="flex min-h-screen">
        <StudioSidebar active="Project Loader" />

        <section className="flex-1">
          <header className="flex h-20 items-center border-b border-slate-800 px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
                Project Loader
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Load a DayZ mission folder or select mission files manually.
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-8 py-12">
            <ProjectUploadPanel onFilesSelected={handleFiles} />

            {files.length > 0 && (
              <>
                <ProjectStats
                  filesLoaded={files.length}
                  recognized={supportedCount}
                />

                <section className="mt-8 rounded-3xl border border-slate-700 bg-[#0b1726] p-7">
                  <h2 className="text-2xl font-black">Loaded Files</h2>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {detectedFiles.map((file) => (
                      <ProjectFileCard key={file.path} file={file} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}