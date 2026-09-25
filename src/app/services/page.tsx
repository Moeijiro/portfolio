import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { Container, Eyebrow } from "@/components/ui";
import { bySlug } from "@/content/projects";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description: "Discord bots and automation, Python backends, API development and integrations, full-stack web apps and internal monitoring tools.",
  path: "services/",
});

const SERVICES = [
  {
    title: "Discord systems & automation",
    body: "Bots and dashboards for server workflows: moderation and anti-raid rules, onboarding flows, ticket queues, events, roles and verification — with Discord OAuth2 and permission checks.",
    includes: ["discord.py bots", "OAuth2 web dashboards", "Audit logs", "Rate-limit-aware REST"],
    proof: ["nexusguard", "discord-automation-platform", "supportdesk", "guildpilot"],
  },
  {
    title: "Backend development",
    body: "FastAPI services with a clear data model, authentication and roles, background work and tests — documented so the next developer can pick it up.",
    includes: ["FastAPI + Pydantic", "SQLAlchemy models", "Auth & roles", "pytest suites"],
    proof: ["studyraid", "forgedesk", "api-management-platform", "vaultshare"],
  },
  {
    title: "API development & integrations",
    body: "REST APIs with keys, quotas and request logs, and integrations that move data between services with mapping, retries and a log of what failed.",
    includes: ["REST API design", "API keys & rate limits", "Webhooks & HMAC", "Data mapping & sync"],
    proof: ["databridge", "api-management-platform", "nexaflow"],
  },
  {
    title: "Python automation",
    body: "Scheduled jobs, webhook-triggered workflows and responsible monitoring of public pages, with alerts to Discord, Telegram or your own endpoint.",
    includes: ["Schedulers & background jobs", "Change & uptime monitoring", "Discord / Telegram alerts", "Retry strategies"],
    proof: ["scoutflow", "nexaflow", "webhook-automation-hub", "pulsewatch"],
  },
  {
    title: "Full-stack web applications",
    body: "Next.js and React interfaces on a Python backend: consumer apps, dashboards, client portals and landing pages, responsive and accessible.",
    includes: ["Next.js + TypeScript", "Tailwind CSS · shadcn/ui", "Dashboards & portals", "Landing pages"],
    proof: ["studyraid", "forgedesk", "resolveai", "nexaflow"],
  },
  {
    title: "Monitoring & internal tools",
    body: "The tools a team runs itself on: uptime and incident tracking, status pages, admin dashboards and audit trails.",
    includes: ["Uptime & incidents", "Status pages", "Admin dashboards", "Audit trails"],
    proof: ["pulsewatch", "scoutflow", "nexusguard"],
  },
];

const STEPS = [
  ["Scope", "You describe the workflow and the systems involved; I come back with questions, edge cases and a written scope."],
  ["Plan", "A short technical plan and estimate: data model, integrations, what gets tested and what is out of scope."],
  ["Build", "Small increments you can run, with the risky integration done first rather than last."],
  ["Hand over", "Source, README, environment template, tests and deployment notes — nothing that only lives in my head."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative pt-16 pb-12 sm:pt-20">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">What I can build for you</h1>
          <p className="mt-5 max-w-2xl text-muted sm:text-lg">Each service links to the open-source projects where you can see that work done end to end.</p>
        </Container>
      </section>
      <Container className="pb-20">
        <ul className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.title} className="card flex flex-col rounded-2xl p-6 sm:p-7">
              <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {s.includes.map((i) => (
                  <li key={i} className="flex items-center gap-2"><span className="size-1 rounded-full bg-accent" aria-hidden="true" />{i}</li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-xs text-faint">
                Proof:{" "}
                {s.proof.map((slug, i) => (
                  <span key={slug}>
                    {i ? " · " : ""}
                    <Link href={`/projects/${slug}/`} className="text-muted underline decoration-white/25 underline-offset-4 hover:text-fg">{bySlug(slug)!.name}</Link>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <section aria-labelledby="process" className="mt-20">
          <Eyebrow>Process</Eyebrow>
          <h2 id="process" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">How a project would run</h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([t, b], i) => (
              <li key={t} className="bg-bg p-6">
                <p className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-medium">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </section>
      </Container>
      <ContactBand />
    </>
  );
}
