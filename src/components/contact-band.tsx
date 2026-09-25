import { DiscordIcon, GitHubIcon } from "@/components/icons";
import { Button, Container } from "@/components/ui";
import { site } from "@/lib/site";

export function ContactBand() {
  return (
    <section aria-labelledby="cta" className="relative overflow-hidden border-t border-line py-20 sm:py-28">
      <div className="glow pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative text-center">
        <h2 id="cta" className="text-gradient mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted">
          I build APIs, automation systems, Discord integrations and full-stack applications. Tell me what it should do and I&apos;ll tell you how I&apos;d build it.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="/contact/">
            <DiscordIcon className="size-4" /> Contact me
          </Button>
          <Button href={site.github} variant="ghost" external>
            <GitHubIcon className="size-4" /> GitHub
          </Button>
        </div>
      </Container>
    </section>
  );
}
