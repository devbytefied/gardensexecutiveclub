import type { MetadataRoute } from "next";
import { navigation, site } from "@/lib/site";

/** Every destination in the site index, de-duplicated, home first. */
function routes(): string[] {
  const flat = navigation
    .flatMap((g) => g.children)
    // Directory routes only — a file in /public (the printed EPK) is linked
    // from the index but is not a page, and does not belong in a sitemap.
    .filter((c) => c.href.endsWith("/"))
    .filter((c, i, arr) => arr.findIndex((x) => x.href === c.href) === i);

  return ["/", ...flat.map((c) => c.href)];
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes().map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
