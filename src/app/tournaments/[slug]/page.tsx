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
            {item.image && (
              <img className="article-cover" src={item.image} alt={item.title} />
            )}
            <h1 className="article-title">{item.title}</h1>

            {item.content && item.content.length > 0 && (
              <div className="article-content">
                {item.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {item.sections && item.sections.length > 0 && (
              <div className="article-content">
                {item.sections.map((section, idx) => (
                  <div key={idx} className="tournament-section">
                    <h2 className="tournament-section-label">{section.label}</h2>
                    {section.image && (
                      <img
                        className="tournament-section-cover"
                        src={section.image}
                        alt={`${item.title} - ${section.label}`}
                      />
                    )}
                    {(section.content || []).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
