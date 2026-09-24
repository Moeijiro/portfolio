import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-mono text-sm text-faint">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-muted">The link may be old. The projects are all one click away.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/projects/">View projects</Button>
        <Button href="/" variant="ghost">Home</Button>
      </div>
    </Container>
  );
}
