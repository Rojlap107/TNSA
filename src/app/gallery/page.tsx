export const metadata = {
  title: "Gallery - Tibetan National Sports Association",
};

export default function GalleryPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>Moments from TNSA tournaments, camps, and community events.</p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 16, color: "#555", marginBottom: 12 }}>
              Photos are being curated and will be published here shortly.
            </p>
            <p style={{ color: "#888" }}>Please check back soon.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
