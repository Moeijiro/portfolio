import { codeToHtml } from "shiki";
import excerpts from "@/content/excerpts.json";

type Excerpt = { file: string; start: number; end: number; code: string; url: string };

/** A real excerpt from a repository, highlighted at build time, with its line numbers. */
export async function CodeExcerpt({ repo, caption }: { repo: string; caption?: string }) {
  const ex = (excerpts as Record<string, Excerpt>)[repo];
  if (!ex) return null;
  const html = await codeToHtml(ex.code, { lang: "python", theme: "github-dark-default" });
  return (
    <figure className="card overflow-hidden rounded-2xl">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5 text-xs">
        <span className="font-mono text-muted">{ex.file}<span className="text-faint"> · L{ex.start}–{ex.end}</span></span>
        <a href={ex.url} className="text-accent underline-offset-4 hover:underline" target="_blank" rel="noreferrer">View on GitHub ↗</a>
      </figcaption>
      <div
        className="overflow-x-auto py-4 pr-4 font-mono text-[12.5px] leading-[1.7] [&_pre]:outline-none"
        style={{ counterReset: `line ${ex.start - 1}` }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption ? <p className="border-t border-line px-4 py-3 text-sm text-muted">{caption}</p> : null}
    </figure>
  );
}
