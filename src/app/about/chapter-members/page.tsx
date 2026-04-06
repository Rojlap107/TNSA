export const metadata = {
  title: "International Chapter Members - Tibetan National Sports Association",
};

const members = [
  {
    name: "Karma Ngudup",
    role: "International Chapter Coordinator",
    location: "Chicago, USA",
    image:
      "https://tibetansports.org/wp-content/uploads/2020/09/karma-ngodupedit-300x300.jpg",
    bio: "Faculty at University of Chicago; founding member of Tibetan National Football team; first manager who took the team to Italy (1998) and Denmark (2001).",
  },
  {
    name: "Karma Samdup",
    location: "England",
    image:
      "https://tibetansports.org/wp-content/uploads/2020/09/karmaedit-300x300.jpg",
  },
  {
    name: "Tenzing Ngawang",
    location: "Toronto, Canada",
    image:
      "https://tibetansports.org/wp-content/uploads/2022/01/Screen-Shot-2022-01-20-at-2.47.28-PM-300x290.png",
    bio: "Professional truck driver; former executive member of RTYC.",
  },
  {
    name: "Karma Yeshe",
    location: "New York, USA",
    image:
      "https://tibetansports.org/wp-content/uploads/2022/01/Screen-Shot-2022-01-20-at-3.11.11-PM-264x300.png",
    bio: "Coach of Team Tibet NYC; founder of Tibet FC (2021). Won 2018 North American GCM Cup and 2019 Dalai Lama Cup.",
  },
];

export default function ChapterMembersPage() {
  return (
    <>
      <div className="about-hero">
        <div className="container">
          <h1>TNSA International Chapter Members</h1>
        </div>
      </div>

      <section className="projects">
        <div className="container">
          <p style={{ textAlign: "center", color: "#555", marginBottom: 40, fontSize: 16 }}>
            TNSA's international chapter members help promote and develop
            Tibetan sports across the global diaspora.
          </p>
          <div className="members-grid">
            {members.map((m) => (
              <div key={m.name} className="member-card">
                <img src={m.image} alt={m.name} />
                <h3>{m.name}</h3>
                {m.role && <p className="member-role">{m.role}</p>}
                <p className="member-location">{m.location}</p>
                {m.bio && <p className="member-bio">{m.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
