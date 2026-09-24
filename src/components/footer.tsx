import Link from "next/link";
import { DiscordIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5 font-medium"><LogoMark /> {site.name}</div>
          <p className="mt-3 max-w-sm text-sm text-muted">{site.role}. {site.focus.join(" · ")}.</p>
          <p className="mt-6 text-xs text-faint">
            All projects on this site are personal, open-source portfolio projects. Built with Next.js, TypeScript and Tailwind CSS;{" "}
            <a className="underline underline-offset-4 hover:text-muted" href={`${site.github}/portfolio`} target="_blank" rel="noreferrer">source on GitHub</a>.
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-1">
            <Link href="/projects/" className="text-muted hover:text-fg">Work</Link>
            <Link href="/services/" className="text-muted hover:text-fg">Services</Link>
            <Link href="/about/" className="text-muted hover:text-fg">About</Link>
            <Link href="/contact/" className="text-muted hover:text-fg">Contact</Link>
          </nav>
          <div className="flex gap-2">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-fg"><GitHubIcon className="size-4" /></a>
            {site.linkedin ? (
              <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-fg"><LinkedInIcon className="size-4" /></a>
            ) : null}
            <Link href="/contact/" aria-label={`Discord: ${site.discord}`} className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-fg"><DiscordIcon className="size-4" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
