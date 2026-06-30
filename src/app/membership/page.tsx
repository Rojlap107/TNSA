export const metadata = {
  title: "Membership - Tibetan National Sports Association",
};

export default function MembershipPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>Join TNSA</h1>
          <p>Two ways to be part of TNSA — as a member or as a player.</p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="membership-grid">
            <div className="about-section membership-card">
              <h2>General Membership</h2>
              <p>
                Become a TNSA member and support Tibetan sports, youth
                development, and community programs across the diaspora.
              </p>
              <ul>
                <li>
                  <strong>Eligibility</strong>: Open to all Tibetan community
                  members.
                </li>
                <li>
                  <strong>Annual Fee</strong>: To be confirmed.
                </li>
                <li>
                  <strong>Benefits</strong>: To be confirmed.
                </li>
              </ul>
              <a href="/contact" className="fcra-contact-btn">
                CONTACT TO JOIN
              </a>
            </div>

            <div className="about-section membership-card">
              <h2>Player Registration</h2>
              <p>
                Register as a player to be considered for upcoming TNSA
                tournaments, trials, and national team selection.
              </p>
              <ul>
                <li>
                  <strong>Eligibility</strong>: Tibetan players of all ages.
                </li>
                <li>
                  <strong>Registration Fee</strong>: To be confirmed.
                </li>
                <li>
                  <strong>What you get</strong>: To be confirmed.
                </li>
              </ul>
              <a href="/contact" className="fcra-contact-btn">
                CONTACT TO REGISTER
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
