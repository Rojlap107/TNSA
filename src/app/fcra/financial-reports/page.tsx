import { getFcraReportsByCategory } from "../../../lib/getFcraReports";

export const metadata = {
  title: "Financial Reports - Tibetan National Sports Association",
};

export const dynamic = "force-dynamic";

export default async function FinancialReportsPage() {
  const reports = await getFcraReportsByCategory("financial-report");

  const byYear = new Map<string, typeof reports>();
  for (const r of reports) {
    const key = r.fiscalYear || "Other";
    if (!byYear.has(key)) byYear.set(key, []);
    byYear.get(key)!.push(r);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b.localeCompare(a));

  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>Financial Reports</h1>
          <p>
            Audited financial statements and annual reports of Tibetan National
            Sports Association.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <h2>Audited Statements</h2>
            {years.length === 0 ? (
              <p>
                Financial reports will be published here as part of our
                commitment to transparency and accountability.
              </p>
            ) : (
              years.map((year) => (
                <div key={year} style={{ marginBottom: 16 }}>
                  <h3 style={{ marginBottom: 8 }}>{year}</h3>
                  <ul style={{ marginLeft: 20 }}>
                    {byYear.get(year)!.map((r) => (
                      <li key={r.id} style={{ marginBottom: 6 }}>
                        <a href={r.file} target="_blank" rel="noreferrer">
                          {r.title}
                        </a>
                        {r.publishedAt && (
                          <span style={{ color: "#888", marginLeft: 8 }}>
                            ({r.publishedAt})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
