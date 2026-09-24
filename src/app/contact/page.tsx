import type { Metadata } from "next";
import { CopyButton } from "@/components/copy";
import { DiscordIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Have a workflow, API or system you want built? Reach me on Discord, GitHub or LinkedIn.",
  path: "contact/",
});

const BRIEF = [
  "What the system should do, in a few sentences",
  "What it connects to — APIs, Discord servers, databases, webhooks",
  "Whether there is existing code or it starts from scratch",
  "Your timeline, and a rough budget if you have one",
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid gap-12 pt-16 pb-24 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-gradient mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Have a workflow, API or system you want built?</h1>
          <p className="mt-6 max-w-xl text-muted sm:text-lg">Send a message with a short description. I read everything and reply with questions or a plan.</p>
          <div className="card mt-10 rounded-2xl p-6">
            <p className="font-medium">A useful first message includes</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {BRIEF.map((b) => (
                <li key={b} className="flex gap-3"><span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />{b}</li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="space-y-4 lg:pt-10">
          <li className="card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <DiscordIcon className="size-5 text-[#8b93ff]" />
              <p className="font-medium">Discord</p>
              <span className="ml-auto rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] text-accent">fastest</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-lg">{site.discord}</p>
              <CopyButton value={site.discord} label="Copy Discord username" />
            </div>
            <p className="mt-2 text-xs text-faint">Add me or send a message request by username.</p>
          </li>
          <li className="card rounded-2xl p-6">
            <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent">
              <GitHubIcon className="size-5" />
              <span className="font-medium">GitHub</span>
              <span className="ml-auto font-mono text-sm text-muted">github.com/Moeijiro ↗</span>
            </a>
            <p className="mt-2 text-xs text-faint">Source for every project on this site.</p>
          </li>
          {site.linkedin ? (
            <li className="card rounded-2xl p-6">
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent">
                <LinkedInIcon className="size-5 text-[#4c9ce0]" />
                <span className="font-medium">LinkedIn</span>
                <span className="ml-auto text-sm text-muted">Profile ↗</span>
              </a>
            </li>
          ) : null}
        </ul>
      </Container>
    </section>
  );
}
