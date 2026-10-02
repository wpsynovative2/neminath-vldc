// Packs out/ (including .htaccess files) into hostinger-upload.zip for hPanel File Manager.
import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const zip = "hostinger-upload.zip";
if (!existsSync("out")) throw new Error("Run `next build` first — out/ is missing.");
if (existsSync(zip)) rmSync(zip);

// bsdtar (built into Windows 10+ and macOS) writes zip archives with -a.
execFileSync("tar", ["-a", "-c", "-f", zip, "-C", "out", "."], { stdio: "inherit" });
console.log(`Created ${zip} — upload it to public_html and extract.`);
