import tournaments from "../../data/tournaments.json";

export const metadata = {
  title: "Tournaments - Tibetan National Sports Association",
};

export default function TournamentsPage() {
  return (
    <main>
      <section className="projects" id="tournaments-index">
        <div className="container">
          <h2>Tournaments</h2>
          <div className="projects-grid">
            {(tournaments as any[]).map((t) => (
              <a
                key={t.id}
                href={`/tournaments/${t.id}`}
                className="project-card"
              >
                <img src={t.image} alt={t.title} />
                <h3>{t.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
