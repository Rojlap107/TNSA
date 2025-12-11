"use client";

import { useMemo, useState, useEffect } from "react";
import newsData from "../data/news.json";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: string[];
  excerpt?: string;
}

export default function NewsList() {
  const [query, setQuery] = useState("");
  const [cmsItems, setCmsItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/cms/news", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as NewsItem[];
        if (!cancelled) setCmsItems(data);
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const source = cmsItems ?? (newsData as NewsItem[]);

  const items = useMemo<NewsItem[]>(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...source].sort((a, b) =>
      (b.date || "").localeCompare(a.date || "")
    );
    if (!q) return sorted;
    return sorted.filter((n) => {
      const hay = [n.title, n.author, (n.content || []).join(" "), n.excerpt]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, source]);

  return (
    <section className="news">
      <div className="container">
        <div
          className="news-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <h1 style={{ fontSize: 32 }}>News</h1>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            className="news-search"
            aria-label="Search news"
          />
        </div>

        <div className="news-grid">
          {items.map((n) => (
            <a key={n.id} href={`/news/${n.id}`} className="news-card">
              <img src={n.image} alt={n.title} />
              <div className="news-card-body">
                <h3>{n.title}</h3>
                <div className="news-meta">
                  <span>{n.author || "TNSA"}</span>
                  {n.date ? <span> · {formatDate(n.date)}</span> : null}
                </div>
                {n.excerpt ? <p className="news-excerpt">{n.excerpt}</p> : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
