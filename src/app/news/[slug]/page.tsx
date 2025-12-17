import newsData from "../../../data/news.json";
import fbPosts from "../../../data/facebook-posts.json";
import { notFound } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  images?: string[];
  date?: string;
  author?: string;
  content?: any;
}

export default async function NewsArticlePage(props: any) {
  const params = await props.params;
  const { slug } = params;

  async function fetchCms(): Promise<NewsItem | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/cms/news/${slug}`,
        { cache: "no-store" }
      );
      if (!res.ok) return null;
      return (await res.json()) as NewsItem;
    } catch {
      return null;
    }
  }

  // Check if it is a facebook post
  let fbItem: NewsItem | null = null;
  if (slug.startsWith("fb-")) {
    const fbId = slug.replace("fb-", "");
    const found = fbPosts.find((p) => p.id === fbId);
    if (found) {
      // Use first sentence as title logic same as list
      const firstSentence = found.content.split('\n')[0] || found.content.slice(0, 50);
      const title = firstSentence.length > 80 ? firstSentence.slice(0, 80) + "..." : firstSentence;

      fbItem = {
        id: slug,
        title: title || "News Update",
        image: found.image_urls?.[0] || "",
        images: found.image_urls,
        date: found.date,
        author: "Tibet Football Team",
        content: [found.content]
      };
    }
  }

  const cmsItem = await fetchCms();
  const localItem =
    (newsData as NewsItem[]).find((n) => n.id === slug) || null;
  const item = fbItem || cmsItem || localItem;

  if (!item) return notFound();

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    // If it's already in the format "Dec 12, 2025", just return it
    if (isoDate.match(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/)) return isoDate;

    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate; // Fallback

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const contentBlocks: string[] = Array.isArray(item.content)
    ? item.content
      .map((b: any) =>
        typeof b === "string"
          ? b
          : b.children?.map((c: any) => c.text).join(" ") || ""
      )
      .filter(Boolean)
    : (localItem?.content as string[] | undefined) || [];

  return (
    <main>
      <section className="news-article">
        <div className="container">
          <article className="article">
            {/* Main Cover Image */}
            <img className="article-cover" src={item.image} alt={item.title} />

            <h1 className="article-title">{item.title}</h1>
            <div className="article-meta">
              <span>{item.author || "TNSA"}</span>
              {item.date ? <span> · {formatDate(item.date)}</span> : null}
            </div>

            <div className="article-content">
              {contentBlocks.length
                ? contentBlocks.map((p, i) => (
                  <div key={i} style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                    {p}
                  </div>
                ))
                : (localItem?.content || []).map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Gallery for multiple images */}
            {item.images && item.images.length > 1 && (
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Gallery</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {item.images.map((img, idx) => (
                    <div key={idx} style={{
                      height: '200px',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <img
                        src={img}
                        alt={`Gallery image ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
