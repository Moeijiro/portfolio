import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { categoryLabel, repoUrl, type Project } from "@/content/projects";
import { asset } from "@/lib/site";

export function Frame({ project, src, alt, priority, sizes }: { project: Project; src: string; alt: string; priority?: boolean; sizes?: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: `radial-gradient(120% 90% at 50% 0%, oklch(0.45 0.09 ${project.hue} / 0.55), oklch(0.2 0.03 ${project.hue} / 0.35) 55%, transparent 90%)` }}
    >
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative translate-y-3 px-5 pt-5 sm:px-7 sm:pt-7">
        <div className="overflow-hidden rounded-t-lg border border-b-0 border-white/15 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] transition-transform duration-500 group-hover:-translate-y-1">
          <Image src={asset(src)} alt={alt} width={800} height={500} priority={priority} sizes={sizes ?? "(min-width: 1024px) 560px, 100vw"} className="block aspect-[16/10] w-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, priority, size = "lg" }: { project: Project; priority?: boolean; size?: "lg" | "sm" }) {
  const href = `/projects/${project.slug}/`;
  return (
    <article className="group card relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl transition-colors hover:border-line-2">
      <Frame project={project} src={`/shots/${project.slug}/${project.cover}-card.webp`} alt="" priority={priority} sizes={size === "sm" ? "(min-width: 1024px) 360px, 100vw" : undefined} />
      <div className="relative flex flex-1 flex-col border-t border-line p-5 sm:p-6">
        <p className="font-mono text-[11px] tracking-wide text-faint uppercase">{project.kind}</p>
        <h3 className={`mt-2 font-semibold tracking-tight ${size === "lg" ? "text-xl" : "text-lg"}`}>
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">{project.name}</Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{size === "lg" ? project.summary : project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <span key={c} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">{categoryLabel(c)}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="min-w-0 truncate font-mono text-[11px] text-faint">{project.stack.slice(0, size === "lg" ? 4 : 3).join(" · ")}</p>
          <div className="relative z-10 flex shrink-0 items-center gap-1">
            <a href={repoUrl(project.slug)} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`} className="inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg">
              <GitHubIcon className="size-4" />
            </a>
            <span className="text-sm text-accent" aria-hidden="true">Case study →</span>
          </div>
        </div>
      </div>
    </article>
  );
}
