export const metadata = {
  title: "National Team - Tibetan National Sports Association",
};

export default function NationalTeamPage() {
  return (
    <main>
      <section className="projects" id="national-team-index">
        <div className="container">
          <h2>National Team</h2>
          <div className="projects-grid">
            <a href="/national-team/men" className="project-card">
              <img src="/mens-football.jpg" alt="Men's National Team" />
              <h3>Men's Tibetan National Team</h3>
            </a>
            <a href="/national-team/women" className="project-card">
              <img src="/womens-football.jpg" alt="Women's National Team" />
              <h3>Women's Tibetan National Team</h3>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
