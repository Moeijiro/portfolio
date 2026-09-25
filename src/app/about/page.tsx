import type { Metadata } from "next";
import Link from "next/link";
import { CodeExcerpt } from "@/components/code";
import { ContactBand } from "@/components/contact-band";
import { FlowDiagram } from "@/components/diagram";
import { Container, Eyebrow } from "@/components/ui";
import { principles, stack, systemCaptions, systemMap } from "@/content/home";
import { projects } from "@/content/projects";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "Python and full-stack developer building FastAPI services, automation, Discord systems and Next.js products. How I build, and the stack counted per repository.",
  path: "about/",
});

const FOCUS = [
  ["Python backends", "FastAPI services with typed models, authentication, roles, background work and a test suite."],
  ["Automation", "Webhook-triggered workflows, schedulers, monitors and alerts that record what happened and why."],
  ["Discord systems", "discord.py bots, OAuth2 dashboards, moderation and community tooling with real permission checks."],
  ["API integrations", "Moving data between services with mapping, retries, signing and a readable log of every failure."],
  ["Full-stack products", "Next.js and React front ends on top of those backends: dashboards, portals, consumer apps."],
];

const WAYS = [
  ["I start from the failure cases.", "What happens on a timeout, a 429, a duplicate event or a missing permission is decided before the happy path is polished."],
  ["The README is a design document.", "Each repository explains its architecture, security choices and known limitations, not just how to install it."],
  ["Tests drive the real code.", "Suites call the actual app in-process instead of mocking everything; demo data comes from the same services."],
  ["Scope is explicit.", "READMEs say what a project is not. A small tool that is honest about its limits beats a large one that pretends."],
];

export default function AboutPage() {
  const tests = projects.reduce((n, p) => n + p.tests, 0);
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid gap-12 pt-14 pb-14 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">I build the systems between services, and the products on top.</h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
              <p>
                I&apos;m {site.name}, a Python and full-stack developer. I work on the parts of software that connect things (FastAPI backends, API
                integrations, webhooks, Discord bots) and on the web apps people use to run them.
              </p>
              <p>
                My public work is {projects.length} open-source projects. Each one is built as a complete product with a backend, a web interface, tests, CI, a
                runnable demo and documentation, so you can judge the engineering and not just a screenshot. They are personal portfolio projects, not client work.
              </p>
              <p>I&apos;m open to freelance projects and full-time roles.</p>
            </div>
          </div>
          <aside className="card self-start rounded-2xl p-6" aria-label="At a glance">
            <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">At a glance</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-faint">Role</dt><dd className="mt-1">{site.role}</dd></div>
              <div><dt className="text-faint">Focus</dt><dd className="mt-1">{site.focus.join(" · ")}</dd></div>
              <div><dt className="text-faint">Public work</dt><dd className="mt-1">{projects.length} repositories · {tests} automated tests · CI on each</dd></div>
              <div><dt className="text-faint">Core stack</dt><dd className="mt-1">Python, FastAPI, SQLAlchemy, httpx, discord.py, Next.js, TypeScript</dd></div>
              <div>
                <dt className="text-faint">Start with</dt>
                <dd className="mt-1">
                  <Link href="/projects/studyraid/" className="text-accent underline decoration-accent/40 underline-offset-4">StudyRaid</Link>,{" "}
                  <Link href="/projects/nexusguard/" className="text-accent underline decoration-accent/40 underline-offset-4">NexusGuard</Link> or{" "}
                  <Link href="/projects/databridge/" className="text-accent underline decoration-accent/40 underline-offset-4">DataBridge</Link>
                </dd>
              </div>
            </dl>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="focus" className="py-16 sm:py-20">
        <Container>
          <Eyebrow>Focus</Eyebrow>
          <h2 id="focus" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What I work on</h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS.map(([t, b]) => (
              <li key={t} className="bg-bg p-6">
                <p className="font-medium">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </li>
            ))}
            <li className="flex items-end bg-bg p-6">
              <Link href="/services/" className="text-sm text-accent underline-offset-4 hover:underline">How this translates into services →</Link>
            </li>
          </ul>
        </Container>
      </section>

      <section id="how" aria-labelledby="how-h" className="scroll-mt-20 border-t border-line bg-bg-2/60 py-16 sm:py-20">
        <Container>
          <Eyebrow>How I build</Eyebrow>
          <h2 id="how-h" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">The unglamorous parts, done on purpose</h2>
          <p className="mt-3 max-w-2xl text-muted">They show up across the repositories as code you can read, not as slogans.</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
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
                        <Link href={l.href} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">{l.label}</Link>
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
            <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Real code · DataBridge</Eyebrow>
              <p className="mt-3 mb-5 text-sm leading-relaxed text-muted">
                Retry with exponential backoff, but only where a retry can change the outcome. An unsafe URL is never retried; a 4xx is returned as the answer.
              </p>
              <CodeExcerpt repo="databridge" />
            </div>
          </div>

          <div className="card mt-14 rounded-3xl p-4 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">The shape most of my projects share</p>
              <p className="hidden font-mono text-[11px] text-faint sm:block">hover a node</p>
            </div>
            <FlowDiagram
              diagram={systemMap}
              hue={190}
              label="Discord, webhooks and web apps feed a Python backend with async workers, which writes to a database and calls Discord, Telegram and external APIs."
              captions={systemCaptions}
              hint="Hover or tap a node to see what it does and which projects implement it."
            />
          </div>
        </Container>
      </section>

      <section id="stack" aria-labelledby="stack-h" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
        <Container>
          <Eyebrow>Stack</Eyebrow>
          <h2 id="stack-h" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Counted from the code</h2>
          <p className="mt-3 max-w-2xl text-muted">How many of the {projects.length} repositories use each technology, taken from their dependency files. Nothing is listed that isn&apos;t in the code.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

      <section aria-labelledby="ways" className="border-t border-line py-16 sm:py-20">
        <Container>
          <Eyebrow>How I work</Eyebrow>
          <h2 id="ways" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Four habits you&apos;ll find in the code</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {WAYS.map(([t, b], i) => (
              <li key={t} className="flex gap-4">
                <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-medium">{t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <ContactBand />
    </>
  );
}
