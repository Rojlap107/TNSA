import { sanityClient } from "../sanity/client";

export interface HighlightItem {
  id: string;
  url: string;
}

const QUERY = `*[_type=="highlight"]|order(_createdAt desc){
  "id": _id,
  "url": youtubeUrl
}`;

export async function getAllHighlights(): Promise<HighlightItem[]> {
  const jsonData: HighlightItem[] = (
    await import("../data/highlights.json").then((m) => m.default)
  ) as HighlightItem[];

  let sanityData: HighlightItem[] = [];
  try {
    const raw: any[] = await sanityClient.fetch(QUERY);
    sanityData = raw
      .filter((h) => h.url)
      .map((h) => ({ id: h.id, url: h.url }));
  } catch {}

  // Deduplicate by URL (same video shouldn't appear twice)
  const seen = new Set<string>();
  const merged: HighlightItem[] = [];
  for (const h of [...sanityData, ...jsonData]) {
    if (!seen.has(h.url)) {
      seen.add(h.url);
      merged.push(h);
    }
  }

  return merged;
}
