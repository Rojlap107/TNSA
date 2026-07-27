export const metadata = {
  title: "FAQs - Tibetan National Sports Association",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is TNSA?",
    a: (
      <>
        The Tibetan National Sports Association (TNSA) is the apex sporting
        body of the Tibetan diaspora community. Based in Dharamsala, India,
        TNSA promotes and develops sport — most notably football — across
        Tibetan settlements in India, Nepal, and around the world. It fields
        the Tibetan Men's and Women's National Football Teams and organises
        the community's flagship tournaments.
      </>
    ),
  },
  {
    q: "When was TNSA established?",
    a: (
      <>
        TNSA was established in 2002 and took over the organisation of the
        Gyalyum Chenmo Memorial Gold Cup (GCMGC) in 2003, the tournament
        first held at TCV Dharamshala in 1981.
      </>
    ),
  },
  {
    q: "Where is TNSA based?",
    a: (
      <>
        TNSA's Head Office is located at the Department of Health, Central
        Tibetan Administration, Gangchen Kyishong, Dharamsala Cantt 176215,
        District Kangra, Himachal Pradesh, India.
      </>
    ),
  },
  {
    q: "What does TNSA do?",
    a: (
      <>
        TNSA runs three main streams of work:
        <ul style={{ marginTop: 8, marginLeft: 20 }}>
          <li>
            <strong>Tournaments</strong> — organising domestic and international
            competitions such as the GCMGC, Tongsten Cup, GCM International,
            Chikdril Gold Cup, and Freedom Cup.
          </li>
          <li>
            <strong>National teams</strong> — selecting, training, and managing
            the Tibetan Men's and Women's National Football Teams for
            international competition (including CONIFA tournaments).
          </li>
          <li>
            <strong>Grassroots &amp; youth development</strong> — running
            Men's and Women's Football Camps, the TNSA Run Club, and the
            Under-15 Tongsten Cup for schools.
          </li>
        </ul>
      </>
    ),
  },
  {
    q: "Which tournaments does TNSA organise and participate in?",
    a: (
      <>
        <p>
          <strong>Organised by TNSA:</strong>
        </p>
        <ul style={{ marginTop: 8, marginLeft: 20 }}>
          <li>Gyalyum Chenmo Memorial Gold Cup (GCMGC)</li>
          <li>GCM International</li>
          <li>Tongsten Cup</li>
          <li>Chikdril Gold Cup (men's and women's)</li>
          <li>Freedom Cup (hosted by the TNSA International Chapter)</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          <strong>Participated in by Team Tibet:</strong>
        </p>
        <ul style={{ marginTop: 8, marginLeft: 20 }}>
          <li>CONIFA World Cup (men's and women's)</li>
          <li>CONIFA Asia Cup</li>
          <li>Climate Cup</li>
          <li>Unity Cup</li>
          <li>Governor's Gold Cup</li>
          <li>Independence Cup</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          See our{" "}
          <a href="/programs" style={{ color: "#4A90E2" }}>Programs</a> and{" "}
          <a href="/participations" style={{ color: "#4A90E2" }}>Participations</a>{" "}
          pages for details on each.
        </p>
      </>
    ),
  },
  {
    q: "Does TNSA have international chapters?",
    a: (
      <>
        Yes. TNSA has international chapter members in the United States
        (Chicago, New York), Canada (Toronto), and the United Kingdom, who
        help promote and develop Tibetan sports across the global diaspora.
        The TNSA International Chapter also hosts the Freedom Cup in New York.
      </>
    ),
  },
  {
    q: "How can I become a member of TNSA?",
    a: (
      <>
        TNSA offers two membership pathways:
        <ul style={{ marginTop: 8, marginLeft: 20 }}>
          <li>
            <strong>General Membership</strong> — for community supporters
            who want to be part of TNSA's mission.
          </li>
          <li>
            <strong>Player Registration</strong> — for footballers who wish
            to be considered for TNSA-organised tournaments and national team
            trials.
          </li>
        </ul>
        <span style={{ display: "block", marginTop: 8 }}>
          Visit the{" "}
          <a href="/membership" style={{ color: "#4A90E2" }}>Membership</a>{" "}
          page and contact us to apply.
        </span>
      </>
    ),
  },
  {
    q: "How can I support TNSA financially?",
    a: (
      <>
        You can donate directly to TNSA's designated bank accounts:
        <ul style={{ marginTop: 8, marginLeft: 20 }}>
          <li>
            <strong>Foreign donors</strong> should use TNSA's FCRA-designated
            account with the State Bank of India.
          </li>
          <li>
            <strong>Indian donors</strong> can use TNSA's Canara Bank account.
          </li>
        </ul>
        <span style={{ display: "block", marginTop: 8 }}>
          Full bank details are available on the{" "}
          <a href="/donate" style={{ color: "#4A90E2" }}>Donate</a> and{" "}
          <a href="/fcra/bank-detail" style={{ color: "#4A90E2" }}>FCRA Bank Detail</a>{" "}
          pages.
        </span>
      </>
    ),
  },
  {
    q: "Is TNSA a registered non-profit?",
    a: (
      <>
        Yes. TNSA is registered under the Foreign Contribution (Regulation)
        Act (FCRA) of India, which permits it to receive foreign
        contributions. TNSA publishes its annual financial reports and
        registration certificate publicly under the{" "}
        <strong>FCRA Info</strong> menu in the header.
      </>
    ),
  },
  {
    q: "How can I watch TNSA tournaments?",
    a: (
      <>
        All major TNSA tournaments are broadcast live on the{" "}
        <a
          href="https://www.youtube.com/@tibetannationalsportsassoc8912"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4A90E2" }}
        >
          TNSA Dharamsala YouTube channel
        </a>
        . Match highlights are also featured on the{" "}
        <a href="/" style={{ color: "#4A90E2" }}>homepage</a> Highlights
        section.
      </>
    ),
  },
  {
    q: "How can I contact TNSA?",
    a: (
      <>
        You can reach TNSA by phone, email, or in person at our Dharamsala
        office. Full contact details are on the{" "}
        <a href="/contact" style={{ color: "#4A90E2" }}>Contact</a> page.
      </>
    ),
  },
];

export default function FaqsPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about TNSA and our work.</p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <div className="faq-list">
              {FAQS.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary>{item.q}</summary>
                  <div className="faq-answer">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
