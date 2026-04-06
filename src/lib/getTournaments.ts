import { sanityClient } from "../sanity/client";

export interface TournamentSection {
  label: string;
  image?: string;
  content?: string[];
}

export interface TournamentItem {
  id: string;
  title: string;
  image: string;
  content?: string[];
  sections?: TournamentSection[];
}

interface SanityBlock {
  _type: string;
  children?: { text: string }[];
}

function blocksToStrings(blocks: SanityBlock[] | undefined): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children || []).map((c) => c.text).join(""))
    .filter(Boolean);
}

const QUERY = `*[_type=="tournament"]|order(title asc){
  "id": slug.current,
  title,
  "image": coalesce(coverImage.asset->url, ""),
  content
}`;

export async function getAllTournaments(): Promise<TournamentItem[]> {
  const jsonData: TournamentItem[] = (
    await import("../data/tournaments.json").then((m) => m.default)
  ) as TournamentItem[];

  let sanityData: TournamentItem[] = [];
  try {
    const raw: any[] = await sanityClient.fetch(QUERY);
    sanityData = raw.map((t) => ({
      id: t.id,
      title: t.title,
      image: t.image || "",
      content: blocksToStrings(t.content),
    }));
  } catch {}

  const map = new Map<string, TournamentItem>();
  for (const t of jsonData) map.set(t.id, t);
  for (const t of sanityData) map.set(t.id, t);

  return Array.from(map.values());
}

export async function getTournamentById(slug: string): Promise<TournamentItem | null> {
  const all = await getAllTournaments();
  return all.find((t) => t.id === slug) || null;
}
