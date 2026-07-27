export const metadata = {
  title: "Participations - Tibetan National Sports Association",
};

const participations = [
  {
    id: "conifa-world-cup",
    title: "CONIFA (World Cup)",
    image: "/images/tournaments cover/men-conifa-world-cup.jpg",
  },
  {
    id: "conifa-asian-cup",
    title: "CONIFA (Asian Cup)",
    image: "/images/tournaments cover/men-confica-asian-cup.jpg",
  },
  {
    id: "climate-cup",
    title: "Climate Cup",
    image: "/images/tournaments cover/climate-cup.jpg",
  },
  {
    id: "unity-cup",
    title: "Unity Cup",
    image: "/images/tournaments cover/unity-cup.jpg",
  },
  {
    id: "governors-gold-cup",
    title: "Governor's Gold Cup",
    image: "/images/tournaments cover/governors-gold-cup.jpg",
  },
  {
    id: "independence-cup",
    title: "Independence Cup",
    image: "/images/tournaments cover/independence-cup.jpg",
  },
];

export default function ParticipationsPage() {
  return (
    <main>
      <section className="projects" id="participations-index">
        <div className="container">
          <h2>Participations</h2>
          <p style={{ color: "#555", fontSize: 15, marginBottom: 40, textAlign: "center" }}>
            Tournaments and international competitions in which TNSA and Team Tibet have proudly participated.
          </p>

          <div className="section-category">
            <div className="projects-grid" style={{ marginTop: 16 }}>
              {participations.map((t) => (
                <a key={t.id} href={`/tournaments/${t.id}`} className="project-card">
                  <img src={t.image} alt={t.title} />
                  <h3>{t.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
