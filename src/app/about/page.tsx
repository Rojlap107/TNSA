export const metadata = {
  title: "About TNSA - Tibetan National Sports Association",
};

export default function AboutPage() {
  return (
    <>
      <div className="about-hero">
        <div className="container">
          <h1>About TNSA (Tibetan National Sports Association)</h1>
        </div>
      </div>

      <div className="container" style={{ padding: "20px 0 60px" }}>
        <div className="about-section">
          <p className="about-lead" style={{ marginBottom: 16 }}>
            The Tibetan National Sports Association (TNSA) was formally
            established in May 2002 with the mission to energize Tibetan youth
            through sports and preserve our identity and culture through
            athletic excellence. The initiative was championed by Kasur Jetsun
            Pema, drawing early support from the Tibetan Children’s Villages
            (TCV). TNSA is registered under the Indian Societies Act XXI, 1860
            and its mission and functions are approved by the Kashag (Cabinet)
            Office of the Tibetan Government‑in‑Exile. The Association is
            overseen by a Governing Body and an Executive Board.
          </p>
        </div>

        <div className="about-section">
          <h2>Origins of Tibetan Football</h2>
          <p>
            The first ever Tibetan National Football Team played in Bologna,
            Italy in 1999, a milestone that opened doors for talented players to
            represent Tibet internationally. In 2001, the team toured Denmark
            and played matches in Greenland, Germany and Switzerland—reinforcing
            that with proper training and support, Tibetan players can compete
            at international levels.
          </p>
        </div>

        <div className="about-section">
          <h2>Aims & Objectives</h2>
          <ul style={{ marginLeft: 20 }}>
            <li>Build a sustainable TNSA and Tibetan National Team.</li>
            <li>
              Develop, organize and promote football within the Tibetan
              community.
            </li>
            <li>
              Promote Tibetan football at the international level and
              professional opportunities for players.
            </li>
            <li>Promote awareness of the Tibetan cause through sports.</li>
            <li>
              Organize tournaments and sporting activities for Tibetan children
              and youth worldwide.
            </li>
            <li>
              Develop sports infrastructure and training programs for athletes,
              coaches and officials.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Future Initiatives</h2>
          <ul style={{ marginLeft: 20 }}>
            <li>Establish a coaching centre with modern sports facilities.</li>
            <li>
              Strengthen clubs within the community and encourage school‑level
              football through incentives.
            </li>
            <li>
              Organize school and club tournaments across regions and
              participate in national/international events.
            </li>
            <li>Arrange international tours for senior and junior teams and
              conduct development workshops.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Historical Teams</h2>
          <p>
            <strong>‘Lhasa United’ (1936):</strong> A diverse local side
            comprising Tibetan officials and expatriates as recorded by
            Frederick Spencer Chapman.
          </p>
          <p>
            <strong>‘Mission Marmots’ (1936):</strong> The British Mission team
            in Lhasa that famously never conceded a goal in their friendlies,
            playing in army field boots.
          </p>
        </div>
      </div>
    </>
  );
}
