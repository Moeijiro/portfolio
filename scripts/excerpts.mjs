// Copies short, real code excerpts out of the project repositories into
// src/content/excerpts.json, with the commit they came from, so every snippet on
// the site links to the exact lines on GitHub.
//   SRC=/path/to/clones node scripts/excerpts.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = process.env.SRC ?? path.resolve("..");
const EXCERPTS = {
  studyraid: ["backend/app/services/progression.py", 29, 64],
  nexusguard: ["backend/app/engine/detectors/spam.py", 37, 63],
  "discord-automation-platform": ["backend/app/core/security.py", 97, 107],
  databridge: ["backend/app/connectors/http.py", 147, 169],
  nexaflow: ["backend/app/services/templating.py", 26, 44],
  scoutflow: ["backend/app/fetch/http.py", 208, 231],
  resolveai: ["backend/app/services/answering.py", 79, 104],
  "api-management-platform": ["backend/app/core/rate_limit.py", 46, 72],
  forgedesk: ["backend/app/api/deps.py", 63, 76],
};

const out = {};
for (const [repo, [file, start, end]] of Object.entries(EXCERPTS)) {
  const dir = path.join(SRC, repo);
  const lines = fs.readFileSync(path.join(dir, file), "utf8").split("\n").slice(start - 1, end);
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  const sha = execFileSync("git", ["-C", dir, "rev-parse", "HEAD"]).toString().trim();
  out[repo] = {
    file,
    start,
    end,
    code: lines.map((l) => l.slice(indent)).join("\n").trimEnd(),
    url: `https://github.com/Moeijiro/${repo}/blob/${sha}/${file}#L${start}-L${end}`,
  };
}
fs.writeFileSync("src/content/excerpts.json", JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${Object.keys(out).length} excerpts`);
