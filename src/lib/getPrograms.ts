import { sanityClient } from "../sanity/client";

export interface ProgramDocument {
  title: string;
  file: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  image: string;
  content?: string[];
  documents?: ProgramDocument[];
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

const QUERY = `*[_type=="program"]|order(title asc){
  "id": slug.current,
  title,
  "image": coalesce(coverImage.asset->url, ""),
  content,
  "documents": documents[]{title, "file": file.asset->url}
}`;

export async function getAllPrograms(): Promise<ProgramItem[]> {
  const jsonData: ProgramItem[] = (
    await import("../data/programs.json").then((m) => m.default)
  ) as ProgramItem[];

  let sanityData: ProgramItem[] = [];
  try {
    const raw: any[] = await sanityClient.fetch(QUERY);
    sanityData = raw.map((p) => ({
      id: p.id,
      title: p.title,
      image: p.image || "",
      content: blocksToStrings(p.content),
      documents: p.documents || [],
    }));
  } catch {}

  const map = new Map<string, ProgramItem>();
  for (const p of jsonData) map.set(p.id, p);
  for (const p of sanityData) map.set(p.id, p);

  return Array.from(map.values());
}

export async function getProgramById(slug: string): Promise<ProgramItem | null> {
  const all = await getAllPrograms();
  return all.find((p) => p.id === slug) || null;
}
