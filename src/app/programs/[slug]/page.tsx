import programs from "../../../data/programs.json";
import { notFound } from "next/navigation";

interface ProgramItem {
  id: string;
  title: string;
  image: string;
  content?: string[];
  documents?: { title: string; file: string }[];
}

export default function ProgramDetailPage(props: any) {
  const params = props?.params as { slug: string };
  const item = (programs as ProgramItem[]).find((p) => p.id === params.slug);
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

              {item.documents && item.documents.length ? (
                <div style={{ marginTop: 16 }}>
                  <h3 style={{ marginBottom: 8 }}>Documents</h3>
                  <ul style={{ marginLeft: 20 }}>
                    {item.documents.map((d, i) => (
                      <li key={i}>
                        <a href={d.file} target="_blank" rel="noreferrer">
                          {d.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
