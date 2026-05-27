import fs from "fs";
import path from "path";

const map = {
  "langue-arabe": "apprendre-arabe",
  sciences: "sciences-islamiques",
  "finance-islamique": "finance-islamique",
};

const root = process.cwd();
const src = path.join(root, "content", "articles");

for (const lang of ["fr", "en", "ar"]) {
  for (const section of Object.values(map)) {
    fs.mkdirSync(path.join(root, "content", lang, section), { recursive: true });
  }
}

for (const file of fs.readdirSync(src).filter((f) => f.endsWith(".md"))) {
  const content = fs.readFileSync(path.join(src, file), "utf8");
  const match = content.match(/category:\s*"([^"]+)"/);
  if (match && map[match[1]]) {
    const dest = path.join(root, "content", "fr", map[match[1]], file);
    fs.copyFileSync(path.join(src, file), dest);
  }
}

const moved = fs.readdirSync(path.join(root, "content", "fr"), { recursive: true });
console.log("Migrated:", moved.filter((f) => String(f).endsWith(".md")).length, "files");
