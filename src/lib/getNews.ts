import { sanityClient } from "../sanity/client";

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: string[];
  gallery?: string[];
  source: "json" | "sanity";
}

interface SanityBlock {
  _type: string;
  children?: { text: string }[];
}

/** Convert Sanity Portable Text blocks to plain string[] paragraphs. */
function blocksToStrings(blocks: SanityBlock[] | undefined): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children || []).map((c) => c.text).join(""))
    .filter(Boolean);
}

const SANITY_LIST_QUERY = `*[_type=="news"]|order(date desc){
  "id": slug.current,
  title,
  "image": coalesce(coverImage.asset->url, ""),
  date,
  author,
  content
}`;

/**
 * Fetch all news from both static JSON and Sanity, merge, deduplicate by id,
 * and return sorted by date (newest first).
 *
 * Designed to be called from server components / route handlers only.
 */
export async function getAllNews(): Promise<NewsItem[]> {
  // 1. Load static JSON
  const jsonNews: NewsItem[] = (
    await import("../data/news.json").then((m) => m.default)
  ).map((n: any) => ({ ...n, source: "json" as const }));

  // 2. Fetch from Sanity (graceful fallback on error)
  let sanityNews: NewsItem[] = [];
  try {
    const raw: any[] = await sanityClient.fetch(SANITY_LIST_QUERY);
    sanityNews = raw.map((n) => ({
      id: n.id,
      title: n.title,
      image: n.image || "",
      date: n.date,
      author: n.author,
      content: blocksToStrings(n.content),
      source: "sanity" as const,
    }));
  } catch {
    // Sanity unreachable — just use JSON data
  }

  // 3. Merge: Sanity wins when IDs collide (newer source of truth)
  const map = new Map<string, NewsItem>();
  for (const n of jsonNews) map.set(n.id, n);
  for (const n of sanityNews) map.set(n.id, n);

  // 4. Sort newest-first
  return Array.from(map.values()).sort(
    (a, b) => (b.date || "").localeCompare(a.date || "")
  );
}

/**
 * Find a single news article by slug/id from merged sources.
 */
export async function getNewsById(slug: string): Promise<NewsItem | null> {
  const all = await getAllNews();
  return all.find((n) => n.id === slug) || null;
}
