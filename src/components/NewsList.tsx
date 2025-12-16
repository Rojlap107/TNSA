"use client";

import { useMemo, useState, useEffect } from "react";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: string[];
  excerpt?: string;
  link?: string; // Added for external link
}

interface FBPost {
  id: string;
  date: string;
  content: string;
  link: string;
}

export default function NewsList() {
  const [query, setQuery] = useState("");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        if (!res.ok) return;
        const posts = (await res.json()) as FBPost[];

        const mappedItems: NewsItem[] = posts.map((p) => ({
          id: `fb-${p.id}`,
          title: p.content.split('. ')[0] + '...', // Use first sentence as title
          image: "/images/fb-placeholder.png", // Using the generated thematic placeholder
          date: p.date, // Format is "Dec 10, 2025" which is parseable
          author: "Tibet Football Team",
          excerpt: p.content,
          link: p.link
        }));

        setNewsItems(mappedItems);
      } catch (e) {
        console.error("Failed to fetch news", e);
      }
    })();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    // If it's already "Dec 10, 2025", just return it or ensure consistent formatting
    return dateStr;
  };

  const items = useMemo<NewsItem[]>(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...newsItems]; // Already sorted by nature of extraction? Or sort by date if needed.
    // robust sort
    sorted.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());

    if (!q) return sorted;
    return sorted.filter((n) => {
      const hay = [n.title, n.author, n.excerpt]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, newsItems]);

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
            <a
              key={n.id}
              href={n.link || `/news/${n.id}`}
              target={n.link ? "_blank" : undefined}
              rel={n.link ? "noopener noreferrer" : undefined}
              className="news-card"
            >
              <div
                className="news-image-wrapper"
                style={{
                  height: 200,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eee',
                }}
              >
                <img
                  src={n.image}
                  alt={n.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#ccc'; // visual fallback
                  }}
                />
              </div>

              <div className="news-card-body">
                <h3>{n.title}</h3>
                <div className="news-meta">
                  <span>{n.author}</span>
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
