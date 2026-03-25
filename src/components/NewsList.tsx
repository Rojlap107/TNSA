"use client";

import { useMemo, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: string[];
}

interface Props {
  items: NewsItem[];
}

export default function NewsList({ items }: Props) {
  const [query, setQuery] = useState("");

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const getExcerpt = (item: NewsItem, maxWords = 25) => {
    const first = (item.content && item.content[0]) || "";
    const words = first.split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return first;
    return words.slice(0, maxWords).join(" ") + "…";
  };

  const filtered = useMemo<NewsItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((n) => {
      const hay = [n.title, n.author, ...(n.content || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, items]);

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
          {filtered.map((n) => (
            <a key={n.id} href={`/news/${n.id}`} className="news-card">
              <div
                className="news-image-wrapper"
                style={{
                  height: 200,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#eee",
                }}
              >
                <img
                  src={n.image}
                  alt={n.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.style.backgroundColor =
                      "#ccc";
                  }}
                />
              </div>

              <div className="news-card-body">
                <h3>{n.title}</h3>
                <div className="news-meta">
                  <span>{n.author || "TNSA"}</span>
                  {n.date ? <span> · {formatDate(n.date)}</span> : null}
                </div>
                <p className="news-excerpt">{getExcerpt(n)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
