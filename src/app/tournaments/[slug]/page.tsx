import { notFound } from "next/navigation";
import { getTournamentById } from "../../../lib/getTournaments";

export default async function TournamentDetailPage(props: any) {
  const params = props?.params as { slug: string };
  const item = await getTournamentById(params.slug);
  if (!item) return notFound();

  return (
    <main>
      <section className="news-article">
        <div className="container">
          <article className="article">
            <img className="article-cover" src={item.image} alt={item.title} />
            <h1 className="article-title">{item.title}</h1>
            <div className="article-content">
              {(item.content || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
