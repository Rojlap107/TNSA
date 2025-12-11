"use client";

import { useEffect, useMemo, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: string[];
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setId("");
    setTitle("");
    setImage("");
    setAuthor("");
    setDate("");
    setContent("");
    setEditingId(null);
  };

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load");
      const data = (await res.json()) as NewsItem[];
      setItems(data);
    } catch (e: any) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload: Partial<NewsItem> = {
      id: editingId ? undefined : id.trim(),
      title: title.trim(),
      image: image.trim(),
      author: author.trim() || undefined,
      date: date.trim() || undefined,
      content: content
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    try {
      let res: Response;
      if (editingId) {
        res = await fetch(`/api/news/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        if (!payload.id) throw new Error("id is required");
        res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
      await fetchItems();
      resetForm();
    } catch (e: any) {
      setError(e.message || "Error");
    }
  };

  const onEdit = (n: NewsItem) => {
    setEditingId(n.id);
    setId(n.id);
    setTitle(n.title);
    setImage(n.image);
    setAuthor(n.author || "");
    setDate(n.date || "");
    setContent((n.content || []).join("\n\n"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this news item?")) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchItems();
    } catch (e: any) {
      setError(e.message || "Error");
    }
  };

  const sorted = useMemo(
    () => [...items].sort((a, b) => (b.date || "").localeCompare(a.date || "")),
    [items]
  );

  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>Admin: News</h1>
          <p>Add, edit, and delete news items.</p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <h2>{editingId ? "Edit News" : "Add News"}</h2>
            {error ? (
              <p style={{ color: "#b00020", marginBottom: 12 }}>{error}</p>
            ) : null}
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
              {!editingId && (
                <label>
                  <div>ID (slug)</div>
                  <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="e.g. new-tournament-2025"
                    required
                  />
                </label>
              )}
              <label>
                <div>Title</div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                <div>Image path (in /public)</div>
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/your-image.jpg"
                  required
                />
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <label>
                  <div>Author</div>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </label>
                <label>
                  <div>Date (YYYY-MM-DD)</div>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="2025-02-10"
                  />
                </label>
              </div>
              <label>
                <div>Content (paragraphs, separate by blank lines)</div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                />
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="project-btn" type="submit">
                  {editingId ? "Save Changes" : "Add News"}
                </button>
                {editingId ? (
                  <button type="button" className="cta-btn" onClick={resetForm}>
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="about-section">
            <h2>Existing News</h2>
            <div className="news-grid">
              {sorted.map((n) => (
                <div key={n.id} className="news-card">
                  <img src={n.image} alt={n.title} />
                  <div className="news-card-body">
                    <h3>{n.title}</h3>
                    <div className="news-meta">
                      <span>{n.author || "TNSA"}</span>
                      {n.date ? <span> · {n.date}</span> : null}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={`/news/${n.id}`} className="project-btn">
                        View
                      </a>
                      <button className="cta-btn" onClick={() => onEdit(n)}>
                        Edit
                      </button>
                      <button
                        className="donate-btn"
                        onClick={() => onDelete(n.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
