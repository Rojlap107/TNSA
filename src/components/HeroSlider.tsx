"use client";

import { useEffect, useState, useMemo } from "react";
import newsData from "../data/news.json";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
}

export default function HeroSlider() {
  const items = useMemo<NewsItem[]>(() => newsData.slice(0, 5), []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;
  const active = items[index];

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0) 70%), url(${active.image})`,
      }}
    >
      <div className="hero-content">
        <div className="hero-text">
          <h1>{active.title}</h1>
          <a href={`/news/${active.id}`} className="cta-btn">
            Read Story
          </a>
        </div>
      </div>

      {/* Slider bullets */}
      <div className="hero-bullets" role="tablist" aria-label="Hero slides">
        {items.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-bullet${i === index ? " active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
