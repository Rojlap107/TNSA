import { getFcraReportsByCategory } from "../../../lib/getFcraReports";

export const metadata = {
  title: "FCRA Registration - Tibetan National Sports Association",
};

export const dynamic = "force-dynamic";

export default async function FcraRegistrationPage() {
  const certs = await getFcraReportsByCategory("registration");

  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>FCRA Registration</h1>
          <p>
            Foreign Contribution (Regulation) Act registration details for
            Tibetan National Sports Association.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <h2>Registration Details</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td>
                      <strong>Organisation Name</strong>
                    </td>
                    <td>Tibetan National Sports Association</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>FCRA Registration Number</strong>
                    </td>
                    <td>To be provided</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Registration Date</strong>
                    </td>
                    <td>To be provided</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Validity</strong>
                    </td>
                    <td>To be provided</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="about-section">
            <h2>Registration Certificate</h2>
            {certs.length === 0 ? (
              <p>
                The FCRA registration certificate will be made available here
                for public viewing.
              </p>
            ) : (
              <ul style={{ marginLeft: 20 }}>
                {certs.map((c) => (
                  <li key={c.id} style={{ marginBottom: 8 }}>
                    <a href={c.file} target="_blank" rel="noreferrer">
                      {c.title}
                    </a>
                    {c.publishedAt && (
                      <span style={{ color: "#888", marginLeft: 8 }}>
                        ({c.publishedAt})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
