import { notFound } from "next/navigation";
import { getNewsById, getAllNews } from "../../../lib/getNews";
import GalleryLightbox from "../../../components/GalleryLightbox";

export default async function NewsArticlePage(props: any) {
  const params = props?.params as { slug: string };

  const item = await getNewsById(params.slug);
  if (!item) return notFound();

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const contentBlocks: string[] = Array.isArray(item.content)
    ? item.content.filter(Boolean)
    : [];

  const allNews = await getAllNews();
  const latestOthers = allNews.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <main>
      <section className="news-article">
        <div className="container">
          <article className="article">
            <img className="article-cover" src={item.image} alt={item.title} />
            <h1 className="article-title">{item.title}</h1>
            <div className="article-meta">
              <span>{item.author || "TNSA"}</span>
              {item.date ? <span> · {formatDate(item.date)}</span> : null}
            </div>
            <div className="article-content">
              {contentBlocks.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {item.gallery && item.gallery.length > 0 && (
              <div className="article-gallery">
                <h3>Gallery</h3>
                <GalleryLightbox images={item.gallery} alt={item.title} />
              </div>
            )}

          </article>

          {latestOthers.length > 0 && (
            <div className="more-news">
              <h3>Latest News</h3>
              <div className="news-grid">
                {latestOthers.map((n) => (
                  <a key={n.id} href={`/news/${n.id}`} className="news-card">
                    <img src={n.image} alt={n.title} />
                    <div className="news-card-body">
                      <h3>{n.title}</h3>
                      <p className="news-meta">
                        {n.author || "TNSA"}
                        {n.date ? ` · ${formatDate(n.date)}` : ""}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <a href="/news" className="cta-btn">See More News</a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
