import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, GitHubIcon } from "@/components/icons";
import { KIND_LABEL } from "@/content/home";
import { repoUrl, type Project } from "@/content/projects";
import { asset } from "@/lib/site";

/** Screenshot on a faint wash of the project's hue. Used by cards and case studies. */
export function Frame({ project, src, alt, priority, sizes }: { project: Project; src: string; alt: string; priority?: boolean; sizes?: string }) {
  return (
    <div className="relative overflow-hidden" style={{ background: `radial-gradient(120% 90% at 50% 0%, oklch(0.42 0.07 ${project.hue} / 0.45), oklch(0.2 0.02 ${project.hue} / 0.25) 60%, transparent 95%)` }}>
      <div className="relative translate-y-3 px-5 pt-5 sm:px-7 sm:pt-7">
        <div className="shot overflow-hidden rounded-t-lg border-b-0 transition-transform duration-500 group-hover:-translate-y-1">
          <Image src={asset(src)} alt={alt} width={800} height={500} priority={priority} sizes={sizes ?? "(min-width: 1024px) 560px, 100vw"} className="block aspect-[16/10] w-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {items.map((s) => (
        <li key={s} className="rounded-md border border-line bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-muted">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Actions({ project, primary }: { project: Project; primary?: boolean }) {
  const hasCaseStudy = project.tier === "flagship";
  return (
    <div className="relative z-10 flex items-center gap-2">
      <Link
        href={`/projects/${project.slug}/`}
        className={`inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${primary ? "bg-fg text-bg hover:bg-white" : "border border-line-2 text-fg hover:border-white/25 hover:bg-white/[0.05]"}`}
      >
        {hasCaseStudy ? "Case study" : "Details"} <ArrowIcon className="size-3.5" />
      </Link>
      <a
        href={repoUrl(project.slug)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
      >
        <GitHubIcon className="size-4" /> GitHub<span className="sr-only"> repository for {project.name}</span>
      </a>
    </div>
  );
}

/** A project card answers three questions: what is it, why is it interesting, what is it built with. */
export function ProjectCard({ project, priority, size = "md" }: { project: Project; priority?: boolean; size?: "md" | "sm" }) {
  return (
    <article className="group card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl transition-colors hover:border-line-2">
      <Link href={`/projects/${project.slug}/`} tabIndex={-1} aria-hidden="true">
        <Frame project={project} src={`/shots/${project.slug}/${project.cover}-card.webp`} alt="" priority={priority} sizes={size === "sm" ? "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" : undefined} />
      </Link>
      <div className="flex flex-1 flex-col border-t border-line p-5 sm:p-6">
        <p className="text-xs font-medium text-accent">{KIND_LABEL[project.categories[0]]}</p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}/`} className="hover:underline hover:decoration-white/30 hover:underline-offset-4">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-pretty text-fg/90">{project.pitch}</p>
        {size === "md" ? <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{project.why}</p> : null}
        <div className="mt-4">
          <Stack items={project.stack.slice(0, size === "md" ? 4 : 3)} />
        </div>
        <div className="mt-auto pt-5">
          <Actions project={project} />
        </div>
      </div>
    </article>
  );
}

/** The lead project on the homepage: large screenshot beside the pitch. */
export function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group card grid min-w-0 overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <Link href={`/projects/${project.slug}/`} tabIndex={-1} aria-hidden="true" className="order-last lg:order-first">
        <div className="relative h-full overflow-hidden" style={{ background: `radial-gradient(120% 100% at 30% 0%, oklch(0.45 0.1 ${project.hue} / 0.5), oklch(0.2 0.03 ${project.hue} / 0.2) 60%, transparent)` }}>
          <div className="px-5 pt-6 sm:px-8 sm:pt-8 lg:pr-0 lg:pb-0">
            <div className="shot translate-y-2 overflow-hidden rounded-t-xl transition-transform duration-500 group-hover:-translate-y-0.5 lg:rounded-tr-none">
              <Image src={asset(`/shots/${project.slug}/${project.cover}.webp`)} alt={project.shots.find((s) => s.src === project.cover)?.alt ?? project.name} width={1440} height={900} priority sizes="(min-width: 1024px) 680px, 100vw" className="block aspect-[16/10] w-full object-cover object-left-top" />
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <p className="flex items-center gap-2 text-xs font-medium text-accent">
          {KIND_LABEL[project.categories[0]]} <span className="rounded-full border border-accent/30 px-2 py-0.5 text-[10px] tracking-wide uppercase">Newest</span>
        </p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          <Link href={`/projects/${project.slug}/`} className="hover:underline hover:decoration-white/30 hover:underline-offset-4">
            {project.name}
          </Link>
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-pretty">{project.pitch}</p>
        <p className="mt-3 leading-relaxed text-pretty text-muted">{project.why}</p>
        <div className="mt-6">
          <Stack items={project.stack.slice(0, 5)} />
        </div>
        <div className="mt-auto pt-8">
          <Actions project={project} primary />
        </div>
      </div>
    </article>
  );
}
