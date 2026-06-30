export const metadata = {
  title: "Contact - Tibetan National Sports Association",
};

export default function ContactPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Reach TNSA using the details below.</p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <h2>Get in touch</h2>
            <p style={{ marginBottom: 8 }}>
              <strong>Tibetan National Sports Association (TNSA)</strong>
            </p>
            <p style={{ marginBottom: 8 }}>
              TVHA, Dept. of Health, CTA, Gangchen Kyishong,
              <br />
              Dharamsala Cantt 176215, District Kangra, H.P., India
            </p>
            <p style={{ marginBottom: 8 }}>
              <strong>Director</strong>: +91 8351888737
              <br />
              <strong>Accountant</strong>: +91 7895659101
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Email</strong>: tnsadhasa@gmail.com,
              office@tibetansports.org
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
