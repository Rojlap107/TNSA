"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  author?: string;
  date?: string;
  content?: string[];
}

export default function AdminNewsPage() {
  const router = useRouter();

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Data
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setImage("");
    setAuthor("");
    setDate("");
    setContent("");
  };

  // Authentication
  useEffect(() => {
    const isLogged = localStorage.getItem("isAdminLoggedIn") === "true";

    if (!isLogged) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setAuthChecked(true);
  }, [router]);

  // Fetch News
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/news");
      const data = await res.json();
      setItems(data);
    } catch {
      setError("Failed to fetch news items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Save News
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Partial<NewsItem> = {
      id: editingId ? undefined : crypto.randomUUID(),
      title: title.trim(),
      image: image.trim(),
      author: author.trim() || undefined,
      date: date.trim() || undefined,
      content: content.split("\n").map(p => p.trim()).filter(Boolean),
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/news/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save news.");

      resetForm();
      fetchItems();
    } catch {
      setError("Unable to save news. Try again.");
    } finally {
      setSaving(false);
    }
  };

  // Fill form when editing
  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setImage(item.image);
    setAuthor(item.author || "");
    setDate(item.date || "");
    setContent((item.content || []).join("\n"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // UI Loading states
  if (!authChecked) return <p style={{ padding: 20 }}>Checking authentication...</p>;
  if (!isAuthenticated) return <p style={{ padding: 20 }}>Redirecting...</p>;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Admin News Panel</h1>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("isAdminLoggedIn");
          router.push("/admin/login");
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#e63946",
          border: "none",
          borderRadius: 6,
          color: "#fff",
          cursor: "pointer",
          marginBottom: 30,
        }}
      >
        Logout
      </button>

      {/* Form Card */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: 40,
        }}
      >
        <h2 style={{ marginBottom: 15 }}>
          {editingId ? "Edit News Item" : "Add News Item"}
        </h2>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div>
            <label>Title</label>
            <input
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Image Path (public folder)</label>
            <input
              style={inputStyle}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/example.jpg"
              required
            />
          </div>

          <div style={{ display: "flex", gap: 15 }}>
            <div style={{ flex: 1 }}>
              <label>Author</label>
              <input
                style={inputStyle}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Date (YYYY-MM-DD)</label>
              <input
                style={inputStyle}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label>Content (each paragraph on a new line)</label>
            <textarea
              style={{ ...inputStyle, height: 120 }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "12px 20px",
              backgroundColor: "#1d3557",
              border: "none",
              color: "white",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {saving ? "Saving..." : editingId ? "Update News" : "Add News"}
          </button>
        </form>
      </div>

      {/* News List */}
      <h2 style={{ marginBottom: 15 }}>News Items</h2>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No news available.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 20,
              background: "#fafafa",
              borderRadius: 10,
              marginBottom: 20,
              border: "1px solid #eee",
            }}
          >
            <h3 style={{ marginBottom: 5 }}>{item.title}</h3>
            <p style={{ margin: "5px 0", color: "#555" }}>
              {item.author || "Unknown"} — {item.date || "No date"}
            </p>

            <button
              onClick={() => handleEdit(item)}
              style={{
                padding: "8px 15px",
                backgroundColor: "#0077b6",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                marginTop: 10,
              }}
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// Reusable input style for cleaner UI
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  marginTop: 5,
};
