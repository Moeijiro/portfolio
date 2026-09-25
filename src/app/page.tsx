import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { ApiIcon, ArrowIcon, BoltIcon, CheckIcon, DiscordIcon, GitHubIcon, LayersIcon } from "@/components/icons";
import { FeaturedCard, ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Button, Container, SectionHead } from "@/components/ui";
import { capabilities, FEATURED, primaryStack, quality } from "@/content/home";
import { bySlug, projects } from "@/content/projects";
import { asset, pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ description: site.description, path: "./" });

const ICONS = { api: ApiIcon, bolt: BoltIcon, layers: LayersIcon, discord: DiscordIcon };

export default function Home() {
  const tests = projects.reduce((n, p) => n + p.tests, 0);
  const [lead, ...rest] = FEATURED.map((slug) => bySlug(slug)!);

  return (
    <>
      {/* 1. Who, what, how to reach me */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="glow pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:pt-24 lg:pb-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> Open to freelance projects and full-time roles
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{site.name}</h1>
            <p className="text-gradient mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{site.role}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
              I build APIs, automation platforms, Discord systems and full-stack products: Python and FastAPI on the backend, React and Next.js on the front.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects/">View projects</Button>
              <Button href={site.github} variant="ghost" external>
                <GitHubIcon className="size-4" /> GitHub
              </Button>
              <Button href="/contact/" variant="ghost">
                Contact me
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-xs text-faint">Projects</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{projects.length}</dd>
              </div>
              <div>
                <dt className="text-xs text-faint">Automated tests</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{tests}</dd>
              </div>
              <div>
                <dt className="text-xs text-faint">Core stack</dt>
                <dd className="mt-1.5 text-sm leading-snug font-medium">Python · FastAPI · Next.js</dd>
              </div>
            </dl>
          </div>

          <Link href={`/projects/${lead.slug}/`} className="group relative block animate-fade-up [animation-delay:120ms]" aria-label={`${lead.name}: ${lead.pitch}`}>
            <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.55_0.14_280/0.28),transparent_70%)] blur-2xl" aria-hidden="true" />
            <div className="shot relative overflow-hidden rounded-xl transition-transform duration-500 group-hover:-translate-y-1">
              <Image src={asset(`/shots/${lead.slug}/${lead.cover}.webp`)} alt={lead.shots[0].alt} width={1440} height={900} priority sizes="(min-width: 1024px) 600px, 100vw" className="block aspect-[16/10] w-full object-cover object-left-top" />
            </div>
            <p className="relative mt-4 flex items-center gap-2 text-sm text-muted">
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">Newest</span>
              <span className="truncate">
                <span className="text-fg">{lead.name}</span>: gamified study platform
              </span>
              <ArrowIcon className="ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </Container>
      </section>

      {/* 2. Strongest work, one of each kind */}
      <section aria-labelledby="work" className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead id="work" eyebrow="Selected work" title="Featured projects" lead="A full-stack product, a Discord system, an integration platform, an AI app and an automation platform." />
            <Link href="/projects/" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline hover:underline-offset-4">
              All {projects.length} projects <ArrowIcon className="size-3.5" />
            </Link>
          </div>
          <div className="mt-10">
            <FeaturedCard project={lead} />
          </div>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {rest.map((p, i) => (
              <li key={p.slug} className="min-w-0">
                <Reveal delay={(i % 2) * 0.05} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. What I build */}
      <section aria-labelledby="build" className="border-t border-line bg-bg-2/60 py-16 sm:py-24">
        <Container>
          <SectionHead id="build" eyebrow="What I build" title="Four kinds of work" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => {
              const Icon = ICONS[c.icon];
              const count = projects.filter((p) => p.categories.includes(c.category)).length;
              return (
                <li key={c.title} className="card flex flex-col rounded-2xl p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                  <Link href={`/projects/?category=${c.category}`} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-accent hover:underline hover:underline-offset-4">
                    {count} projects <ArrowIcon className="size-3.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 4. Stack, 5. Quality */}
      <section aria-labelledby="stack" className="border-t border-line py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead id="stack" eyebrow="Tech stack" title="What I work with" />
            <dl className="mt-8 space-y-5">
              {primaryStack.map((g) => (
                <div key={g.group}>
                  <dt className="text-xs font-medium text-faint">{g.group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <span key={t} className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-sm">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/about/#stack" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              Counted per repository <ArrowIcon className="size-3.5" />
            </Link>
          </div>
          <div>
            <SectionHead id="quality" eyebrow="Engineering quality" title="Built beyond the happy path" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {quality.map((q) => (
                <li key={q.title} className="flex gap-3 rounded-xl border border-line p-4">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium">{q.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {q.body}{" "}
                      <Link href={`/projects/${q.proof}/`} className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
                        {bySlug(q.proof)!.name}
                      </Link>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/about/#how" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              How I build, in more detail <ArrowIcon className="size-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
