import newsData from "../../../data/news.json";
import { notFound } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  content?: any;
}

export default async function NewsArticlePage(props: any) {
  const params = props?.params as { slug: string };
  async function fetchCms(): Promise<NewsItem | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/cms/news/${params.slug}`,
        { cache: "no-store" }
      );
      if (!res.ok) return null;
      return (await res.json()) as NewsItem;
    } catch {
      return null;
    }
  }

  const cmsItem = await fetchCms();
  const localItem =
    (newsData as NewsItem[]).find((n) => n.id === params.slug) || null;
  const item = cmsItem || localItem;
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
            <img className="article-cover" src={item.image} alt={item.title} />
            <h1 className="article-title">{item.title}</h1>
            <div className="article-meta">
              <span>{item.author || "TNSA"}</span>
              {item.date ? <span> · {formatDate(item.date)}</span> : null}
            </div>
            <div className="article-content">
              {contentBlocks.length
                ? contentBlocks.map((p, i) => <p key={i}>{p}</p>)
                : (localItem?.content || []).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
