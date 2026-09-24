import type { Metadata } from "next";
import Link from "next/link";
import { CodeExcerpt } from "@/components/code";
import { ContactBand } from "@/components/contact-band";
import { FlowDiagram } from "@/components/diagram";
import { GitHubIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Button, Container, Eyebrow, SectionHead } from "@/components/ui";
import { capabilities, principles, stack, systemCaptions, systemMap } from "@/content/home";
import { bySlug, projects } from "@/content/projects";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ description: site.description, path: "./" });

const FEATURED = ["nexusguard", "databridge", "scoutflow", "nexaflow", "discord-automation-platform", "resolveai"];

export default function Home() {
  const tests = projects.reduce((n, p) => n + p.tests, 0);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative pt-16 pb-16 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px] shadow-accent" aria-hidden="true" />
              {site.role}
            </p>
            <h1 className="animate-fade-up text-gradient mt-6 text-4xl font-semibold tracking-[-0.035em] text-balance [animation-delay:60ms] sm:text-6xl sm:leading-[1.04]">
              Backend systems and automation that hold up past the happy path.
            </h1>
            <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted [animation-delay:120ms] sm:text-lg">
              I build Python APIs, integrations, Discord systems and the full-stack apps around them — with retries, audit
              trails, permission checks and tests where they matter.
            </p>
            <div className="animate-fade-up mt-9 flex flex-col items-stretch justify-center gap-3 [animation-delay:180ms] sm:flex-row sm:items-center">
              <Button href="/projects/">View projects</Button>
              <Button href={site.github} variant="ghost" external><GitHubIcon className="size-4" /> GitHub</Button>
              <Button href="/contact/" variant="ghost">Contact</Button>
            </div>
            <ul className="animate-fade-up mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs text-faint [animation-delay:240ms]">
              <li><span className="text-fg">{projects.length}</span> open-source projects</li>
              <li><span className="text-fg">{tests}</span> automated tests</li>
              <li>CI on every repository</li>
              <li>Every one runs locally</li>
            </ul>
          </div>

          <div className="animate-fade-up card mx-auto mt-14 max-w-5xl rounded-3xl p-4 [animation-delay:300ms] sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">The system most of my projects share</p>
              <p className="hidden font-mono text-[11px] text-faint sm:block">hover a node</p>
            </div>
            <FlowDiagram
              diagram={systemMap}
              hue={190}
              label="Discord, webhooks and web dashboards feed a Python backend with async workers, which writes to a database and calls Discord, Telegram and external APIs."
              captions={systemCaptions}
              hint="Hover or tap a node to see what it does and which projects implement it."
            />
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work" className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="work" eyebrow="Selected work" title="Software with the hard parts built in" lead="Each project is a complete product: backend, dashboard, tests, a local demo and a README that explains the decisions." />
            <Link href="/projects/" className="text-sm text-accent underline-offset-4 hover:underline">All {projects.length} projects →</Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {FEATURED.map((slug, i) => (
              <Reveal key={slug} delay={(i % 2) * 0.06} className="min-w-0">
                <ProjectCard project={bySlug(slug)!} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="build" className="border-t border-line bg-bg-2/60 py-20 sm:py-28">
        <Container>
          <SectionHead id="build" eyebrow="What I build" title="Five areas, each backed by working code" lead="Every claim links to the projects that prove it." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.04} className={i === 0 ? "sm:col-span-2" : undefined}>
                <div className="card flex h-full flex-col rounded-2xl p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {c.projects.map((slug) => (
                      <li key={slug}>
                        <Link href={`/projects/${slug}/`} className="inline-flex rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg">
                          {bySlug(slug)!.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/projects/?category=${c.category}`} className="mt-auto pt-5 text-sm text-accent underline-offset-4 hover:underline">
                    See all →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Principles + code */}
      <section aria-labelledby="how" className="py-20 sm:py-28">
        <Container>
          <SectionHead id="how" eyebrow="How I build" title="The unglamorous parts, done on purpose" lead="They show up across the repositories — as code you can read, not as slogans." />
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <ol className="grid min-w-0 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
              {principles.map((p, i) => (
                <li key={p.title} className="bg-bg p-5">
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{p.title}</span>
                  </p>
                  <p className="mt-1.5 pl-8 text-sm leading-relaxed text-muted">
                    {p.body}{" "}
                    {p.proof.map((l, j) => (
                      <span key={l.href}>
                        {j ? " · " : ""}
                        <Link href={l.href} className="text-accent/90 underline-offset-4 hover:underline">{l.label}</Link>
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
            <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Real code · DataBridge</Eyebrow>
              <p className="mt-3 mb-5 text-sm leading-relaxed text-muted">
                Retry with exponential backoff — but only where a retry can change the outcome. An unsafe URL is never retried; a 4xx is returned as the answer.
              </p>
              <CodeExcerpt repo="databridge" />
            </div>
          </div>
        </Container>
      </section>

      {/* Stack */}
      <section aria-labelledby="stack" className="border-t border-line bg-bg-2/60 py-20 sm:py-28">
        <Container>
          <SectionHead id="stack" eyebrow="Stack" title="Tools I actually ship with" lead="Counted from the dependency files of my public repositories — nothing listed that isn't in the code." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stack.map((g) => (
              <div key={g.group} className="card rounded-2xl p-5">
                <h3 className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">{g.group}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map(([name, count]) => (
                    <li key={name} className="flex items-baseline justify-between gap-3 text-sm">
                      <span>{name}</span>
                      {count ? <span className="shrink-0 font-mono text-[11px] text-faint" title={`Used in ${count} of ${projects.length} repositories`}>{count}/{projects.length}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
