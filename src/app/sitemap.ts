import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "projects/", "services/", "about/", "contact/", ...projects.map((p) => `projects/${p.slug}/`)];
  return pages.map((path) => ({ url: `${site.url}/${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : path.startsWith("projects/") ? 0.8 : 0.6 }));
}
