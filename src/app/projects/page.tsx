import type { Metadata } from "next";
import { ContactBand } from "@/components/contact-band";
import { ProjectGrid } from "@/components/project-grid";
import { Container, Eyebrow } from "@/components/ui";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description: "Discord systems, API integrations, automation, security tools and full-stack apps — Python/FastAPI backends with Next.js dashboards, each open source with tests.",
  path: "projects/",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative pt-16 pb-12 sm:pt-20">
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{projects.length} projects, all open source</h1>
          <p className="mt-5 max-w-2xl text-muted sm:text-lg">
            Personal portfolio projects, each built as a complete product — backend, dashboard, tests, CI and a local demo. Flagship projects have a full case study.
          </p>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">
        <ProjectGrid />
      </Container>
      <ContactBand />
    </>
  );
}
