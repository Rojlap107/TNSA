import { getAllPrograms } from "../../lib/getPrograms";

export const metadata = {
  title: "Programs - Tibetan National Sports Association",
};

export default async function ProgramsPage() {
  const programs = await getAllPrograms();

  return (
    <main>
      <section className="projects" id="programs-index">
        <div className="container">
          <h2>Programs</h2>
          <div className="projects-grid">
            {programs.map((p) => (
              <a key={p.id} href={`/programs/${p.id}`} className="project-card">
                <img src={p.image} alt={p.title} />
                <h3>{p.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
