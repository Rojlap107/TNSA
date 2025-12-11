import projects from "../data/projects.json";

export default function ProjectsGrid() {
  return (
    <section className="projects" id="programs">
      <div className="container">
        <h2>Our Projects</h2>
        <div className="projects-grid">
          {projects.map((p: any) => (
            <a className="project-card" key={p.id} href={`/programs/${p.id}`}>
              <img src={p.image} alt={p.title} />
              <h3>{p.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
