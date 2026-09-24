"use client";

import { useState, useSyncExternalStore } from "react";
import { ProjectCard } from "@/components/project-card";
import { CATEGORIES, type Category, projects } from "@/content/projects";

type Filter = Category | "all";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readCategory(): Category | null {
  const c = new URLSearchParams(window.location.search).get("category");
  return CATEGORIES.some((x) => x.id === c) ? (c as Category) : null;
}

export function ProjectGrid() {
  // Deep links such as /projects/?category=discord. The page is static, so the
  // query is read on the client; the prerendered HTML shows every project.
  const fromUrl = useSyncExternalStore(subscribe, readCategory, () => null);
  const [picked, setPicked] = useState<Filter | null>(null);
  const filter: Filter = picked ?? fromUrl ?? "all";

  function choose(next: Filter) {
    setPicked(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
  }

  const shown = projects.filter((p) => filter === "all" || p.categories.includes(filter));
  const flagship = shown.filter((p) => p.tier === "flagship");
  const more = shown.filter((p) => p.tier === "secondary");
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...CATEGORIES.map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id)).length })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={filter === o.id}
            onClick={() => choose(o.id)}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-2 hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
          >
            {o.label}
            <span className="font-mono text-[11px] opacity-60">{o.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>

      {flagship.length ? (
        <section aria-labelledby="flagship-h" className="mt-10">
          <h2 id="flagship-h" className="font-mono text-xs tracking-[0.16em] text-faint uppercase">Flagship · {flagship.length}</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {flagship.map((p, i) => <ProjectCard key={p.slug} project={p} priority={i < 2} />)}
          </div>
        </section>
      ) : null}
      {more.length ? (
        <section aria-labelledby="more-h" className="mt-14">
          <h2 id="more-h" className="font-mono text-xs tracking-[0.16em] text-faint uppercase">More projects · {more.length}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => <ProjectCard key={p.slug} project={p} size="sm" />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
