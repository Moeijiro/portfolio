import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeExcerpt } from "@/components/code";
import { ContactBand } from "@/components/contact-band";
import { FlowDiagram } from "@/components/diagram";
import { GitHubIcon } from "@/components/icons";
import { Frame } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Button, Chip, Container, Eyebrow } from "@/components/ui";
import excerpts from "@/content/excerpts.json";
import { categoryLabel, projects, repoUrl, type Point, type Project } from "@/content/projects";
import { asset, pageMeta } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name}${p.tier === "flagship" ? ": case study" : ""}`, description: p.pitch, path: `projects/${p.slug}/`, image: `og/${p.slug}.png` });
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-14 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id} className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
          <div className="mt-8">{children}</div>
        </Reveal>
      </Container>
    </section>
  );
}

function Points({ items, numbered }: { items: Point[]; numbered?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <li key={f.title} className="card rounded-2xl p-5">
          <p className="flex items-baseline gap-2.5 font-medium">
            {numbered ? <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span> : null}
            {f.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Gallery({ p }: { p: Project }) {
  const desktop = p.shots.filter((s) => !s.mobile);
  const mobile = p.shots.filter((s) => s.mobile);
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
      <ul className="grid gap-5 sm:grid-cols-2">
        {desktop.map((s) => (
          <li key={s.src}>
            <figure>
              <a href={asset(`/shots/${p.slug}/${s.src}.webp`)} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-line transition-colors hover:border-line-2">
                <Image src={asset(`/shots/${p.slug}/${s.src}-card.webp`)} alt={s.alt} width={800} height={500} sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover object-top" />
              </a>
              <figcaption className="mt-2.5 text-xs leading-relaxed text-muted">{s.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {mobile.length ? (
        <ul className="flex gap-5 lg:flex-col">
          {mobile.map((s) => (
            <li key={s.src} className="w-44 sm:w-52">
              <figure>
                <a href={asset(`/shots/${p.slug}/${s.src}.webp`)} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-[22px] border border-line-2 bg-black p-1.5">
                  <Image src={asset(`/shots/${p.slug}/${s.src}-card.webp`)} alt={s.alt} width={390} height={844} sizes="208px" className="aspect-[390/700] w-full rounded-[16px] object-cover object-top" />
                </a>
                <figcaption className="mt-2.5 text-xs text-muted">{s.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const hasCode = slug in excerpts;
  const repo = repoUrl(p.slug);
  const sections: [string, string][] = [
    ["overview", "Overview"],
    ["screenshots", "Screenshots"],
    ...(p.diagram ? [["architecture", "Architecture"] as [string, string]] : []),
    ["features", "Features"],
    ...(p.decisions ? [["decisions", "Decisions"] as [string, string]] : []),
    ...(p.security ? [["security", "Security"] as [string, string]] : []),
    ...(p.testing ? [["testing", "Testing"] as [string, string]] : []),
    ["run", "Run it"],
  ];

  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(50% 60% at 50% 0%, oklch(0.5 0.1 ${p.hue} / 0.28), transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative pt-10 sm:pt-14">
          <Link href="/projects/" className="text-sm text-muted hover:text-fg">← All projects</Link>
          <div className="mt-8 max-w-3xl">
            <Eyebrow>{p.tier === "flagship" ? "Case study" : "Project"} · {p.kind}</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl">{p.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty sm:text-xl">{p.pitch}</p>
            <p className="mt-3 leading-relaxed text-pretty text-muted">{p.why}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.categories.map((c) => <Chip key={c} tone="accent">{categoryLabel(c)}</Chip>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={repo} external><GitHubIcon className="size-4" /> View on GitHub</Button>
              <Button href="#run" variant="ghost">Run the demo</Button>
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {[
              ["Type", "Personal open-source project"],
              ["Automated tests", `${p.tests} (pytest)`],
              ["Built with", p.stack.slice(0, 3).join(" · ")],
              ["Live demo", "Runs locally — not hosted"],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg/90 px-4 py-4 sm:px-5">
                <dt className="font-mono text-[11px] tracking-wide text-faint uppercase">{k}</dt>
                <dd className="mt-1.5 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          <nav aria-label="On this page" className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-line-2 hover:text-fg">
                {label}
              </a>
            ))}
          </nav>
          <div className="card mt-8 overflow-hidden rounded-t-3xl border-b-0">
            <Frame project={p} src={`/shots/${p.slug}/${p.cover}.webp`} alt={p.shots.find((s) => s.src === p.cover)?.alt ?? p.name} priority sizes="(min-width: 1152px) 1100px, 100vw" />
          </div>
        </Container>
      </header>

      <Section id="overview" eyebrow="Overview" title="What it does">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">{p.overview}</p>
          {p.scope ? <p className="card self-start rounded-2xl p-5 text-sm leading-relaxed text-muted"><span className="font-medium text-fg">Scope. </span>{p.scope}</p> : null}
        </div>
        {p.problem && p.solution ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="card rounded-2xl p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">Problem</p>
              <p className="mt-3 leading-relaxed text-pretty">{p.problem}</p>
            </div>
            <div className="card rounded-2xl p-6" style={{ borderColor: `oklch(0.7 0.1 ${p.hue} / 0.35)` }}>
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase" style={{ color: `oklch(0.84 0.11 ${p.hue})` }}>Solution</p>
              <p className="mt-3 leading-relaxed text-pretty">{p.solution}</p>
            </div>
          </div>
        ) : null}
      </Section>

      <Section id="screenshots" eyebrow="Screenshots" title="From the running application">
        <Gallery p={p} />
        <p className="mt-6 text-xs text-faint">Captured from the app running locally with its seeded demo data. Select an image to open it full size.</p>
      </Section>

      {p.diagram ? (
        <Section id="architecture" eyebrow="Architecture" title="How the pieces fit">
          <div className="card rounded-3xl p-4 sm:p-8">
            <FlowDiagram diagram={p.diagram} hue={p.hue} label={`${p.name} architecture`} />
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-faint" aria-label="Legend">
              <li className="flex items-center gap-2"><span className="size-3 rounded-[4px] border" style={{ borderColor: `oklch(0.8 0.12 ${p.hue} / 0.6)`, background: `oklch(0.35 0.06 ${p.hue} / 0.35)` }} />Core service</li>
              <li className="flex items-center gap-2"><span className="size-3 rounded-[4px] border border-dashed border-white/30" />External system</li>
              <li className="flex items-center gap-2"><span className="size-3 rounded-[4px] border border-white/20 bg-white/5" />Storage / entry point</li>
            </ul>
          </div>
        </Section>
      ) : null}

      <Section id="features" eyebrow="Core features" title="What's in it">
        <Points items={p.features} />
      </Section>

      {p.decisions ? (
        <Section id="decisions" eyebrow="Technical decisions" title="Interesting problems, and how they're solved">
          <div className={hasCode ? "grid gap-10 lg:grid-cols-2" : ""}>
            <ol className="space-y-6">
              {p.decisions.map((d, i) => (
                <li key={d.title} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-medium">{d.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            {hasCode ? <div className="min-w-0"><CodeExcerpt repo={p.slug} /></div> : null}
          </div>
        </Section>
      ) : null}


      {p.security ? (
        <Section id="security" eyebrow="Security" title="What protects the data">
          <Points items={p.security} />
        </Section>
      ) : null}

      {p.testing ? (
        <Section id="testing" eyebrow="Testing" title="How it's verified">
          <p className="max-w-3xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{p.testing}</p>
        </Section>
      ) : null}

      <Section id="stack" eyebrow="Stack & skills" title="Built with">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">Technology</p>
            <ul className="mt-4 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s}><Chip>{s}</Chip></li>)}</ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">What this project demonstrates</p>
            <ul className="mt-4 flex flex-wrap gap-2">{p.demonstrates.map((s) => <li key={s}><Chip tone="accent">{s}</Chip></li>)}</ul>
          </div>
        </div>
      </Section>

      <section id="run" aria-labelledby="run-h" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Repository & demo</Eyebrow>
              <h2 id="run-h" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Run it yourself</h2>
              <p className="mt-4 leading-relaxed text-muted">{p.demoNote}</p>
              <p className="mt-3 text-sm text-faint">No public live demo is hosted. Everything below runs locally with Python 3.12+ and Node 20+.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={repo} external><GitHubIcon className="size-4" /> Source code</Button>
                <Button href={`${repo}#readme`} variant="ghost" external>README</Button>
              </div>
            </div>
            <div className="card overflow-hidden rounded-2xl">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" />
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
                <code>
                  <span className="text-faint">$ </span>git clone {repo}.git{"\n"}
                  <span className="text-faint">$ </span>cd {p.slug}{"\n"}
                  {p.run.map((r) => {
                    const [cmd, note] = r.split("#");
                    return (
                      <span key={r}>
                        <span className="text-faint">$ </span>{cmd.trimEnd()}
                        {note ? <span className="text-faint">   # {note.trim()}</span> : null}
                        {"\n"}
                      </span>
                    );
                  })}
                </code>
              </pre>
            </div>
          </div>
        </Container>
      </section>

      <nav aria-label="Next project" className="border-t border-line">
        <Container className="py-10">
          <Link href={`/projects/${next.slug}/`} className="group flex items-center justify-between gap-6 rounded-2xl p-2">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">Next project</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">{next.name}</p>
              <p className="mt-1 text-sm text-muted">{next.tagline}</p>
            </div>
            <span className="text-2xl text-muted transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </Container>
      </nav>
      <ContactBand />
    </article>
  );
}
