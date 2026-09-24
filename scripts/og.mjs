// Renders the social images with headless Chrome:
//   public/og/home.png, public/og/<slug>.png (1200×630, also used as GitHub social previews)
//   public/og/linkedin-banner.png (1584×396)
// Usage: node scripts/og.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { projects } from "../src/content/projects.ts";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const TMP = path.resolve(".og");
const OUT = path.resolve("public/og");
fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const head = (w, h, hue) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;background:#07080a;color:#eceef1;font-family:Geist,sans-serif;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgb(255 255 255/.05) 1px,transparent 1px),linear-gradient(to bottom,rgb(255 255 255/.05) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 90% at 70% 40%,#000 20%,transparent 75%)}
.glow{position:absolute;inset:0;background:radial-gradient(45% 70% at 80% 10%,oklch(0.5 0.12 ${hue}/.45),transparent 70%),radial-gradient(35% 60% at 10% 100%,oklch(0.45 0.1 285/.25),transparent 70%)}
.mono{font-family:'Geist Mono',monospace}
.brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:500}
.chip{display:inline-block;border:1px solid rgb(255 255 255/.14);border-radius:999px;padding:6px 14px;font-size:17px;color:#b4b9c2;margin:0 8px 8px 0;background:rgb(255 255 255/.03)}
</style></head><body><div class="glow"></div><div class="grid"></div>`;

const logo = (s = 34) => `<svg width="${s}" height="${s}" viewBox="0 0 32 32"><rect x=".5" y=".5" width="31" height="31" rx="8" fill="#0e1013" stroke="#2a2d33"/><path d="M9 11 C 14 11, 13 16, 16 16 M9 21 C 14 21, 13 16, 16 16 L 23 16" fill="none" stroke="#5fe0d0" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="11" r="2.4" fill="#eceef1"/><circle cx="9" cy="21" r="2.4" fill="#eceef1"/><circle cx="16" cy="16" r="2.8" fill="#5fe0d0"/><circle cx="23.5" cy="16" r="2.4" fill="#eceef1"/></svg>`;

// A small node network, drawn once and reused as decoration.
const network = (w, h, hue, opacity = 1) => {
  const nodes = [[0.08, 0.3], [0.08, 0.7], [0.4, 0.5], [0.72, 0.22], [0.72, 0.5], [0.72, 0.78]].map(([x, y]) => [x * w, y * h]);
  const edges = [[0, 2], [1, 2], [2, 3], [2, 4], [2, 5]];
  const c = (a, b) => { const [x1, y1] = nodes[a], [x2, y2] = nodes[b]; const dx = (x2 - x1) / 2; return `M${x1} ${y1} C${x1 + dx} ${y1},${x2 - dx} ${y2},${x2} ${y2}`; };
  return `<svg width="${w}" height="${h}" style="opacity:${opacity}">${edges.map(([a, b]) => `<path d="${c(a, b)}" fill="none" stroke="rgb(255 255 255/.22)" stroke-width="1.5"/>`).join("")}
  ${edges.map(([a, b], i) => { const [x1, y1] = nodes[a], [x2, y2] = nodes[b]; const t = 0.35 + i * 0.1; return `<circle cx="${x1 + (x2 - x1) * t}" cy="${y1 + (y2 - y1) * t}" r="3.5" fill="oklch(0.86 0.12 ${hue})"/>`; }).join("")}
  ${nodes.map(([x, y], i) => `<rect x="${x - 34}" y="${y - 15}" width="68" height="30" rx="8" fill="${i === 2 ? `oklch(0.35 0.07 ${hue}/.6)` : "#0e1013"}" stroke="${i === 2 ? `oklch(0.8 0.12 ${hue})` : "rgb(255 255 255/.25)"}"/>`).join("")}</svg>`;
};

const pages = [];

pages.push({
  name: "home", w: 1200, h: 630,
  html: head(1200, 630, 190) + `
  <div style="position:absolute;right:40px;top:150px">${network(460, 330, 190, 0.9)}</div>
  <div style="position:absolute;left:72px;top:64px;right:72px;bottom:64px;display:flex;flex-direction:column">
    <div class="brand">${logo()} Moeijiro</div>
    <div style="margin-top:auto">
      <p class="mono" style="font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:#5fe0d0">Python Backend &amp; Automation Developer</p>
      <h1 style="margin-top:22px;font-size:64px;line-height:1.04;letter-spacing:-.035em;font-weight:600;max-width:680px">Backend systems and automation that hold up past the happy path.</h1>
      <p style="margin-top:26px;font-size:22px;color:#9aa0aa">Discord Systems · APIs · Full-Stack Web Applications</p>
    </div>
  </div></body></html>`,
});

for (const p of projects) {
  const shot = path.resolve(`public/shots/${p.slug}/${p.cover}.webp`);
  pages.push({
    name: p.slug, w: 1200, h: 630,
    html: head(1200, 630, p.hue) + `
    <div style="position:absolute;left:600px;top:118px;width:720px;border:1px solid rgb(255 255 255/.16);border-radius:14px;overflow:hidden;box-shadow:0 30px 80px -20px #000">
      <img src="file://${shot}" style="display:block;width:100%">
    </div>
    <div style="position:absolute;left:72px;top:64px;bottom:64px;width:480px;display:flex;flex-direction:column">
      <div class="brand">${logo()} Moeijiro</div>
      <div style="margin-top:auto">
        <p class="mono" style="font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:oklch(0.84 0.12 ${p.hue})">${p.kind}</p>
        <h1 style="margin-top:16px;font-size:${p.name.length > 18 ? 50 : 64}px;line-height:1.02;letter-spacing:-.035em;font-weight:600">${p.name}</h1>
        <p style="margin-top:18px;font-size:22px;line-height:1.4;color:#b4b9c2">${p.tagline}</p>
        <div style="margin-top:26px">${p.stack.slice(0, 4).map((s) => `<span class="chip mono">${s}</span>`).join("")}</div>
      </div>
    </div></body></html>`,
  });
}

// LinkedIn banner: the profile photo covers the lower-left, so the content sits right.
pages.push({
  name: "linkedin-banner", w: 1584, h: 396,
  html: head(1584, 396, 190) + `
  <div style="position:absolute;left:470px;top:40px">${network(420, 316, 190, 0.85)}</div>
  <div style="position:absolute;right:88px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-end;text-align:right">
    <p class="mono" style="font-size:17px;letter-spacing:.16em;text-transform:uppercase;color:#5fe0d0">Moeijiro</p>
    <h1 style="margin-top:14px;font-size:50px;line-height:1.08;letter-spacing:-.03em;font-weight:600">Python Backend · Automation<br>APIs · Discord Systems</h1>
    <p class="mono" style="margin-top:20px;font-size:19px;color:#9aa0aa">moeijiro.github.io/portfolio</p>
  </div></body></html>`,
});

for (const pg of pages) {
  const file = path.join(TMP, `${pg.name}.html`);
  fs.writeFileSync(file, pg.html);
  execFileSync(CHROME, [
    "--headless=new", "--hide-scrollbars", "--allow-file-access-from-files", "--virtual-time-budget=4000",
    `--window-size=${pg.w},${pg.h}`, `--screenshot=${path.join(OUT, `${pg.name}.png`)}`, `file://${file}`,
  ], { stdio: "ignore" });
  console.log(pg.name);
}
