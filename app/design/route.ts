import { readFileSync } from "fs";
import path from "path";

export function GET() {
  const filePath = path.join(process.cwd(), "public", "design-guide.html");
  const html = readFileSync(filePath, "utf-8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
