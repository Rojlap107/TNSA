export const metadata = {
  title: "FAQs - Tibetan National Sports Association",
};

export default function FaqsPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Answers to common questions about TNSA and our work.</p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <p>
              We are compiling a list of frequently asked questions. Please
              check back soon, or reach out via the{" "}
              <a href="/contact" style={{ color: "#4A90E2" }}>Contact page</a>{" "}
              with any questions in the meantime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
