import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: string[];
}

function getDataPath(): string {
  return path.join(process.cwd(), "src", "data", "news.json");
}

async function readNews(): Promise<NewsItem[]> {
  const p = getDataPath();
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw) as NewsItem[];
}

async function writeNews(items: NewsItem[]): Promise<void> {
  const p = getDataPath();
  const json = JSON.stringify(items, null, 2);
  await fs.writeFile(p, json, "utf8");
}

export async function GET(_: NextRequest, context: any) {
  try {
    const id = context?.params?.id as string | undefined;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const items = await readNews();
    const found = items.find((n) => n.id === id);
    if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(found);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to read" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const id = context?.params?.id as string | undefined;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = (await req.json()) as Partial<NewsItem>;
    const items = await readNews();
    const idx = items.findIndex((n) => n.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const current = items[idx];
    const updated: NewsItem = {
      id: current.id,
      title: body.title ?? current.title,
      image: body.image ?? current.image,
      date: body.date ?? current.date,
      author: body.author ?? current.author,
      content: body.content ?? current.content,
    };
    items[idx] = updated;
    await writeNews(items);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: any) {
  try {
    const id = context?.params?.id as string | undefined;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const items = await readNews();
    const filtered = items.filter((n) => n.id !== id);
    if (filtered.length === items.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    await writeNews(filtered);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to delete" }, { status: 500 });
  }
}
