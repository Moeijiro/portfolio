import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{children}</p>;
}

export function SectionHead({ eyebrow, title, lead, id }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode; id?: string }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">{lead}</p> : null}
    </div>
  );
}

export function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs whitespace-nowrap ${
        tone === "accent" ? "border-accent/30 bg-accent/10 text-accent" : "border-line bg-white/[0.03] text-muted"
      }`}
    >
      {children}
    </span>
  );
}

type ButtonProps = { href: string; children: React.ReactNode; variant?: "primary" | "ghost"; external?: boolean };

export function Button({ href, children, variant = "primary", external }: ButtonProps) {
  const cls =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-white"
      : "border border-line-2 bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.06]";
  const all = `inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${cls}`;
  if (external) {
    return <a href={href} className={all} target="_blank" rel="noreferrer">{children}</a>;
  }
  return <Link href={href} className={all}>{children}</Link>;
}
