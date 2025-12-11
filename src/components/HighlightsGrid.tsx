"use client";

import { useEffect, useState } from "react";
import highlights from "../data/highlights.json";

interface Item {
  id: string;
  url: string;
}
interface OEmbed {
  title: string;
  thumbnail_url: string;
}

async function fetchOEmbed(url: string): Promise<OEmbed | null> {
  try {
    const resp = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        url
      )}&format=json`
    );
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

export default function HighlightsGrid() {
  const [data, setData] = useState<
    { url: string; title: string; thumb: string }[]
  >([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const rows = await Promise.all(
        (highlights as Item[]).map(async (h) => {
          const meta = await fetchOEmbed(h.url);
          return {
            url: h.url,
            title: meta?.title || "Tournament Highlight",
            thumb: meta?.thumbnail_url || "/final-match.jpg",
          };
        })
      );
      if (mounted) setData(rows);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="highlights">
      <div className="container">
        <h2>Highlights</h2>
        <div className="highlights-grid">
          {data.map((v) => (
            <a
              className="highlight-card"
              href={v.url}
              target="_blank"
              rel="noreferrer"
              key={v.url}
            >
              <img src={v.thumb} alt={v.title} />
              <h3>{v.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
