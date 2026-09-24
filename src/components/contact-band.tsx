import { Button, Container } from "@/components/ui";

export function ContactBand() {
  return (
    <section aria-labelledby="cta" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="glow pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <Container className="relative text-center">
        <h2 id="cta" className="text-gradient mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Have a workflow, API or system you want built?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          Tell me what it should do and what it connects to. I&apos;ll tell you how I&apos;d build it.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="/contact/">Get in touch</Button>
          <Button href="/services/" variant="ghost">What I can build</Button>
        </div>
      </Container>
    </section>
  );
}
