import tournaments from "../../../data/tournaments.json";
import { notFound } from "next/navigation";

interface TournamentItem {
  id: string;
  title: string;
  image: string;
}

export default function TournamentDetailPage(props: any) {
  const params = props?.params as { slug: string };
  const item = (tournaments as TournamentItem[]).find(
    (t) => t.id === params.slug
  );
  if (!item) return notFound();

  return (
    <main>
      <section className="news-article">
        <div className="container">
          <article className="article">
            <img className="article-cover" src={item.image} alt={item.title} />
            <h1 className="article-title">{item.title}</h1>
            <div className="article-content">
              <p>
                Details coming soon. This page will include schedules, results,
                and galleries.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
