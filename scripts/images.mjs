// Converts each repository's real screenshots (docs/screenshots/*.png) into WebP
// for the site: public/shots/<repo>/<name>.webp (full) and <name>-card.webp.
// Tall landing pages are cropped to their first screen.
//   SRC=/path/to/clones node scripts/images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.env.SRC ?? path.resolve("..");
const OUT = "public/shots";

for (const repo of fs.readdirSync(SRC)) {
  const dir = path.join(SRC, repo, "docs", "screenshots");
  if (!fs.existsSync(dir)) continue;
  fs.mkdirSync(path.join(OUT, repo), { recursive: true });
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".png"))) {
    const name = file.replace(/\.png$/, "");
    const image = sharp(path.join(dir, file));
    const { width, height } = await image.metadata();
    const mobile = width < 1000;
    const crop = !mobile && height > width * 0.95 ? { left: 0, top: 0, width, height: Math.round(width * 0.625) } : null;
    const base = crop ? sharp(path.join(dir, file)).extract(crop) : sharp(path.join(dir, file));
    await base.clone().resize({ width: mobile ? 780 : 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(OUT, repo, `${name}.webp`));
    await base.clone().resize({ width: mobile ? 390 : 800 }).webp({ quality: 78 }).toFile(path.join(OUT, repo, `${name}-card.webp`));
  }
  console.log(repo);
}
