import type { Metadata } from "next";
import { ContactBand } from "@/components/contact-band";
import { ProjectGrid } from "@/components/project-grid";
import { Container, Eyebrow } from "@/components/ui";
import { flagships, projects } from "@/content/projects";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description: `${projects.length} open-source projects: full-stack apps, automation platforms, Discord systems, APIs, AI and security tools. Python and FastAPI backends with React and Next.js frontends.`,
  path: "projects/",
});

export default function ProjectsPage() {
  const tests = projects.reduce((n, p) => n + p.tests, 0);
  return (
    <>
      <section className="border-b border-line">
        <Container className="pt-14 pb-10 sm:pt-20">
          <Eyebrow>Projects</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Everything I&apos;ve built, open source</h1>
          <p className="mt-4 max-w-2xl text-muted sm:text-lg">
            {projects.length} projects, {flagships.length} with a full case study. Each one runs locally with a seeded demo and ships with tests ({tests} in total).
          </p>
        </Container>
      </section>
      <Container className="py-10 sm:py-14">
        <ProjectGrid />
      </Container>
      <ContactBand />
    </>
  );
}
