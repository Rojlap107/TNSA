import newsData from "../data/news.json";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: string[];
}

function getExcerpt(item: NewsItem, maxWords = 30) {
  const first = (item.content && item.content[0]) || "";
  const words = first.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return first;
  return words.slice(0, maxWords).join(" ") + "…";
}

export default function LatestStories() {
  const [main, ...rest] = [...(newsData as NewsItem[])]
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 5);

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  return (
    <section className="top-stories" id="news">
      <div className="container">
        <h2>Latest Stories</h2>
        <div className="stories-grid">
          <a
            className="story-main"
            href={main ? `/news/${main.id}` : undefined}
          >
            {main ? (
              <>
                <img
                  className="story-main-image"
                  src={main.image}
                  alt={main.title}
                />
                <div className="story-content">
                  <h3>{main.title}</h3>
                  <p className="story-subtitle">
                    {main.author || "TNSA"}
                    {main.date ? ` · ${formatDate(main.date)}` : ""}
                  </p>
                  <p className="story-excerpt">{getExcerpt(main)}</p>
                </div>
              </>
            ) : (
              <div className="story-content">
                <h3>Latest from TNSA</h3>
                <p className="story-excerpt">Updates will appear here.</p>
              </div>
            )}
          </a>
          <div className="story-sidebar">
            {rest.map((n: NewsItem) => (
              <a className="story-item" key={n.id} href={`/news/${n.id}`}>
                <img src={n.image} alt={n.title} />
                <div className="story-info">
                  <h4>{n.title}</h4>
                  <p className="story-item-meta">
                    {n.author || "TNSA"}
                    {n.date ? ` · ${formatDate(n.date)}` : ""}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
