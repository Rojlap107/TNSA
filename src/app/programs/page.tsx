export const metadata = {
  title: "Programs - Tibetan National Sports Association",
};

const programs = [
  {
    id: "gcmgc",
    title: "GCM (Gyalyum Chenmo Memorial Gold Cup)",
    image: "/images/tournaments cover/gcmgc.jpg",
  },
  {
    id: "gcm-international",
    title: "GCM Internationals",
    image: "/images/tournaments cover/gcm-international.jpg",
  },
  {
    id: "chikdril",
    title: "Chikdril Gold Cup",
    image: "/images/tournaments cover/women-chikdril.jpg",
  },
  {
    id: "tongsten-cup",
    title: "Tongsten Cup",
    image: "/images/tournaments cover/school-tournament.jpg",
  },
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
          <p style={{ color: "#555", fontSize: 15, marginBottom: 24, textAlign: "center" }}>
            TNSA is registered under the Foreign Contribution Regulation Act (FCRA). View our FCRA compliance{" "}
            <a href="/programs/fcra" style={{ color: "#4A90E2", textDecoration: "underline" }}>
              documents and annual reports
            </a>.
          </p>

          {/* TNSA Programs */}
          <div className="section-category">
            <div className="projects-grid">
              {programs.map((p) => {
                const isTournament = ["gcmgc", "gcm-international", "chikdril", "tongsten-cup"].includes(p.id);
                const href = isTournament ? `/tournaments/${p.id}` : `/programs/${p.id}`;
                return (
                  <a
                    key={p.id}
                    href={href}
                    className="project-card"
                  >
                    <img src={p.image} alt={p.title} />
                    <h3>{p.title}</h3>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
