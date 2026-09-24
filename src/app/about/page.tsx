import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { Container, Eyebrow } from "@/components/ui";
import { flagships, projects } from "@/content/projects";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "Python backend and automation developer building FastAPI services, API integrations, Discord systems and full-stack applications.",
  path: "about/",
});

const FOCUS = [
  ["Python backend systems", "FastAPI services with typed models, authentication, roles, background work and a test suite."],
  ["Automation", "Webhook-triggered workflows, schedulers, monitors and alerts that record what happened and why."],
  ["Discord infrastructure", "discord.py bots, OAuth2 dashboards, moderation and community tooling with real permission checks."],
  ["API integrations", "Moving data between services with mapping, retries, signing and a readable log of every failure."],
  ["Full-stack applications", "Next.js and React front ends on top of those backends — dashboards, portals and landing pages."],
];

const WAYS = [
  ["I start from the failure cases.", "What happens on a timeout, a 429, a duplicate event or a missing permission is decided before the happy path is polished."],
  ["The README is a design document.", "Each repository explains its architecture, lifecycle, security choices and known limitations — not just how to install it."],
  ["Tests drive the real code.", "Suites call the actual services in-process instead of mocking everything; demo data is produced by the same pipelines."],
  ["Scope is explicit.", "The READMEs say what a project is not and list its known limitations. A small tool that is honest about its limits beats a large one that pretends."],
];

export default function AboutPage() {
  const tests = projects.reduce((n, p) => n + p.tests, 0);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid gap-12 pt-16 pb-16 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">I build the systems between services.</h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
              <p>
                I&apos;m {site.name}, a Python backend and automation developer. I work on the parts of software that connect things:
                FastAPI backends, API integrations and webhooks, Discord bots and dashboards, and the full-stack applications people
                use to run them.
              </p>
              <p>
                My public work is {projects.length} open-source projects. Each one is built as a complete product — backend, web interface,
                tests, CI, a runnable demo and documentation — so you can judge the engineering, not a screenshot. They are personal
                portfolio projects, not client work.
              </p>
              <p>I&apos;m open to freelance projects and backend-focused roles.</p>
            </div>
          </div>
          <aside className="card self-start rounded-2xl p-6" aria-label="At a glance">
            <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">At a glance</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-faint">Focus</dt><dd className="mt-1">{site.role}</dd></div>
              <div><dt className="text-faint">Also</dt><dd className="mt-1">{site.focus.join(" · ")}</dd></div>
              <div><dt className="text-faint">Public work</dt><dd className="mt-1">{projects.length} repositories · {tests} automated tests · CI on each</dd></div>
              <div><dt className="text-faint">Core stack</dt><dd className="mt-1">Python, FastAPI, SQLAlchemy, httpx, discord.py, Next.js, TypeScript</dd></div>
              <div><dt className="text-faint">Start with</dt><dd className="mt-1"><Link href={`/projects/${flagships[0].slug}/`} className="text-accent underline decoration-accent/40 underline-offset-4">{flagships[0].name}</Link>, <Link href="/projects/databridge/" className="text-accent underline decoration-accent/40 underline-offset-4">DataBridge</Link> or <Link href="/projects/scoutflow/" className="text-accent underline decoration-accent/40 underline-offset-4">ScoutFlow</Link></dd></div>
            </dl>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="focus" className="border-t border-line py-16 sm:py-20">
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
