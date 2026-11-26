// Copies the site into dist/ and appends a content hash to every local .js/.css
// reference in HTML, so those files can be cached by browsers for a year.
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist");
const skip = new Set([".git", ".gitignore", ".assetsignore", ".wrangler", "node_modules", "dist", "scripts", "tests", "wrangler.jsonc", "README.md"]);

rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const name of readdirSync(root)) if (!skip.has(name)) cpSync(join(root, name), join(out, name), { recursive: true });

const hash = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10);

function walk(dir) {
  return readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
}

for (const html of walk(out).filter((f) => f.endsWith(".html"))) {
  const src = readFileSync(html, "utf8").replace(/(src|href)="(\/?)([\w./-]+\.(?:js|css))"/g, (m, attr, slash, path) => {
    const file = slash ? join(out, path) : join(dirname(html), path);
    return existsSync(file) ? `${attr}="${slash}${path}?v=${hash(file)}"` : m;
  });
  writeFileSync(html, src);
  console.log("stamped", relative(out, html));
}
