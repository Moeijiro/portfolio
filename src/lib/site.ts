export const site = {
  name: "Moeijiro",
  role: "Python Backend & Automation Developer",
  focus: ["Discord Systems", "APIs", "Full-Stack Web Applications"],
  url: "https://moeijiro.github.io/portfolio",
  description:
    "Python backend and automation developer. FastAPI services, API integrations, webhooks, Discord bots and dashboards, and the full-stack apps around them — 16 open-source projects with tests and seeded demos.",
  github: "https://github.com/Moeijiro",
  discord: "mojiro_31",
  linkedin: null as string | null,
};

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Files in /public need the base path spelled out (next/link adds it by itself). */
export function asset(path: string) {
  return `${base}${path}`;
}

/** Per-page metadata with a canonical URL and a matching social card. */
export function pageMeta({ title, description, path, image = "og/home.png" }: { title?: string; description: string; path: string; image?: string }) {
  const full = title ? `${title} · ${site.name}` : `${site.name} — ${site.role}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, images: [{ url: image, width: 1200, height: 630, alt: full }] },
    twitter: { card: "summary_large_image" as const, title: full, description, images: [image] },
  };
}
