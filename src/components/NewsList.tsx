"use client";

import { useMemo, useState, useEffect } from "react";

interface NewsItem {
  id: string;
  title: string;
  image: string; // Primary image
  images: string[]; // All images
  imageCount: number;
  date?: string;
  author?: string;
  excerpt?: string;
  link?: string;
}

interface FBPost {
  id: string;
  date: string;
  content: string;
  image_urls: string[];
  image_count: number;
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

        const mappedItems: NewsItem[] = posts.map((p) => {
          // Use first meaningful sentence as title, or truncation
          const firstSentence = p.content.split('\n')[0] || p.content.slice(0, 50);
          const title = firstSentence.length > 80 ? firstSentence.slice(0, 80) + "..." : firstSentence;

          return {
            id: `fb-${p.id}`,
            title: title || "News Update",
            image: p.image_urls?.[0] || "/images/fb-placeholder.png",
            images: p.image_urls || [],
            imageCount: p.image_count,
            date: p.date,
            author: "Tibet Football Team",
            excerpt: p.content,
            link: p.link
          };
        });

        setNewsItems(mappedItems);
      } catch (e) {
        console.error("Failed to fetch news", e);
      }
    })();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr === "Unknown") return "";
    return dateStr;
  };

  const items = useMemo<NewsItem[]>(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...newsItems];
    // Sort logic, defaulting to index/creation order if date is ambiguous or assume file is sorted
    // But since our dates are often "Unknown" or rough, we rely on the scrape order (newest first usually)
    // If we want to sort strictly:
    // sorted.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());

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
              href={`/news/${n.id}`}
              className="news-card"
            >
              <div
                className="news-image-wrapper"
                style={{
                  height: 250,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eee',
                  position: 'relative'
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
                    e.currentTarget.parentElement!.style.backgroundColor = '#ccc';
                  }}
                />
                {n.imageCount > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    +{n.imageCount - 1} Photos
                  </div>
                )}
              </div>

              <div className="news-card-body">
                <div className="news-meta" style={{ marginBottom: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                  <span>{n.author}</span>
                  {formatDate(n.date) ? <span> · {formatDate(n.date)}</span> : null}
                </div>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{n.title}</h3>

                {n.excerpt ? (
                  <p className="news-excerpt" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {n.excerpt}
                  </p>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
