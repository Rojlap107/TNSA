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

export async function GET() {
  try {
    const items = await readNews();
    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to read" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NewsItem;
    if (!body || !body.id || !body.title || !body.image) {
      return NextResponse.json({ error: "id, title, image are required" }, { status: 400 });
    }
    const items = await readNews();
    if (items.some((n) => n.id === body.id)) {
      return NextResponse.json({ error: "id already exists" }, { status: 409 });
    }
    const toSave: NewsItem = {
      id: body.id,
      title: body.title,
      image: body.image,
      date: body.date || new Date().toISOString().slice(0, 10),
      author: body.author || "TNSA",
      content: Array.isArray(body.content) ? body.content : [],
    };
    items.push(toSave);
    // Sort desc by date if present
    items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    await writeNews(items);
    return NextResponse.json(toSave, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to create" }, { status: 500 });
  }
}
