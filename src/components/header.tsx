"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GitHubIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { site } from "@/lib/site";

const NAV = [
  { href: "/projects/", label: "Projects" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const current = (href: string) => (path.startsWith(href.replace(/\/$/, "")) ? "page" : undefined);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/75 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-medium tracking-tight" aria-label={`${site.name} — home`}>
          <LogoMark />
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={current(n.href)}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-fg aria-[current=page]:bg-white/[0.06] aria-[current=page]:text-fg"
            >
              {n.label}
            </Link>
          ))}
          <a href={site.github} target="_blank" rel="noreferrer" className="ml-2 inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg" aria-label="GitHub profile">
            <GitHubIcon className="size-[18px]" />
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-muted hover:text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-bg px-4 pt-2 pb-5 md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={current(n.href)} className="block rounded-lg px-3 py-3 text-base text-muted aria-[current=page]:text-fg">
              {n.label}
            </Link>
          ))}
          <a href={site.github} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-base text-muted">
            <GitHubIcon className="size-4" /> GitHub
          </a>
        </nav>
      ) : null}
    </header>
  );
}
