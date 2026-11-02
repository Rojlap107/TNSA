export const metadata = {
  title: "Board Members - Tibetan National Sports Association",
};

const members = [
  {
    name: "Kalon Pema Tso",
    role: "Chairman",
    position: "Kalon, Department of Health",
    image: "/images/board-members/pema-tso.jpg",
  },
  {
    name: "Karma Choeying",
    role: "Board Member",
    position: "Secretary, Department of Education",
    image: "/images/board-members/karma-choeying.jpg",
  },
  {
    name: "Dhondup Tsering",
    role: "Board Member",
    position: "Director, Sambhota",
    image: "/images/board-members/dhondup-tsering.jpg",
  },
  {
    name: "Migmar Tsering",
    role: "Board Member",
    position: "General Secretary, Tibetan Homes School",
    image: "/images/board-members/migmar-tsering.jpg",
  },
];

export default function BoardMembersPage() {
  return (
    <>
      <div className="about-hero">
        <div className="container">
          <h1>Board Members</h1>
        </div>
      </div>

      <section className="projects">
        <div className="container">
          <p style={{ textAlign: "center", color: "#555", marginBottom: 40, fontSize: 16 }}>
            The governing board of the Tibetan National Sports Association.
          </p>
          <div className="members-grid">
            {members.map((m) => (
              <div key={m.name} className="member-card">
                <img src={m.image} alt={m.name} style={{ objectPosition: "center 20%" }} />
                <h3>{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p className="member-location">{m.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
