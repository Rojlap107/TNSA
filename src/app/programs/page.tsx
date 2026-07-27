export const metadata = {
  title: "Programs - Tibetan National Sports Association",
};

const tournaments = [
  {
    id: "gcmgc",
    title: "Gyalyum Chenmo Memorial Gold Cup (GCMGC)",
    image: "/images/tournaments cover/gcmgc.webp",
  },
  {
    id: "gcm-international",
    title: "GCM International",
    image: "/images/tournaments cover/gcm-international.jpg",
  },
  {
    id: "tongsten-cup",
    title: "Tongsten Cup",
    image: "/images/tournaments cover/tongsten-cup.webp",
  },
  {
    id: "chikdril",
    title: "Chikdril Gold Cup",
    image: "/images/tournaments cover/women-chikdril.jpg",
  },
  {
    id: "freedom-cup",
    title: "Freedom Cup",
    image: "/images/tournaments cover/freedom-cup.jpg",
  },
];

const communityPrograms = [
  {
    id: "mens-camp",
    title: "Men's Football Camp",
    image: "/mens-football.jpg",
  },
  {
    id: "womens-camp",
    title: "Women's Football Camp",
    image: "/womens-football.jpg",
  },
  {
    id: "run-club",
    title: "TNSA Run Club",
    image: "/run-club.jpg",
  },
];

export default function ProgramsPage() {
  return (
    <main>
      <section className="projects" id="programs-index">
        <div className="container">
          <h2>Programs</h2>
          <p style={{ color: "#555", fontSize: 15, marginBottom: 40, textAlign: "center" }}>
            Tournaments and community programs organised by the Tibetan National Sports Association.
          </p>

          <div className="section-category">
            <h3>Tournaments Organised by TNSA</h3>
            <div className="projects-grid" style={{ marginTop: 16 }}>
              {tournaments.map((t) => (
                <a key={t.id} href={`/tournaments/${t.id}`} className="project-card">
                  <img src={t.image} alt={t.title} />
                  <h3>{t.title}</h3>
                </a>
              ))}
            </div>
          </div>

          <div className="section-category">
            <h3>Community Programs</h3>
            <div className="projects-grid" style={{ marginTop: 16 }}>
              {communityPrograms.map((p) => (
                <a key={p.id} href={`/programs/${p.id}`} className="project-card">
                  <img src={p.image} alt={p.title} />
                  <h3>{p.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
