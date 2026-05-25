import sharp from "sharp";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const svg = readFileSync(resolve(publicDir, "favicon.svg"), "utf-8");

const sizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  // 48x48 is covered by SVG + 32x32 for all modern browsers
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

async function generate() {
  // Ensure public directory exists
  mkdirSync(publicDir, { recursive: true });

  for (const { size, name } of sizes) {
    const outPath = resolve(publicDir, name);
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`✓ ${name} (${size}x${size})`);
  }

  // Generate site.webmanifest
  const manifest = {
    name: "Prestige Estates",
    short_name: "Prestige",
    description: "Luxury Real Estate — Find your dream property",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a12",
    theme_color: "#0a0a12",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };

  writeFileSync(
    resolve(publicDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
  console.log("✓ site.webmanifest");
}

generate().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
