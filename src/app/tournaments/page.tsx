import { getAllTournaments } from "../../lib/getTournaments";

export const metadata = {
  title: "Tournaments - Tibetan National Sports Association",
};

export default async function TournamentsPage() {
  const tournaments = await getAllTournaments();

  return (
    <main>
      <section className="projects" id="tournaments-index">
        <div className="container">
          <h2>Tournaments</h2>
          <div className="projects-grid">
            {tournaments.map((t) => (
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
