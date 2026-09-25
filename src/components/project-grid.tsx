"use client";

import { AnimatePresence, motion } from "motion/react";
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

// Case studies first, then the rest; each group keeps the curated order.
const ORDERED = [...projects.filter((p) => p.tier === "flagship"), ...projects.filter((p) => p.tier !== "flagship")];

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

  const shown = ORDERED.filter((p) => filter === "all" || p.categories.includes(filter));
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.short, count: projects.filter((p) => p.categories.includes(c.id)).length })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={filter === o.id}
            onClick={() => choose(o.id)}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-2 hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
          >
            {o.label}
            <span className="font-mono text-[11px] opacity-60">{o.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} projects shown
      </p>
      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              className="min-w-0"
            >
              <ProjectCard project={p} priority={i < 3} size="md" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
