import { notFound } from "next/navigation";
import { getFcraReportsByYear } from "../../../../lib/getFcraReports";

const VALID_YEARS = ["2025-26", "2024-25", "2023-24"];

export function generateStaticParams() {
  return VALID_YEARS.map((year) => ({ year }));
}

export const dynamic = "force-dynamic";

export default async function FcraAnnualReportPage(props: any) {
  const params = (await props?.params) as { year: string };
  if (!VALID_YEARS.includes(params.year)) return notFound();

  const reports = await getFcraReportsByYear("annual-report", params.year);

  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>FCRA Annual Report {params.year}</h1>
          <p>
            Annual disclosure of foreign contributions received and utilised
            under the Foreign Contribution (Regulation) Act.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <h2>Annual Report — FY {params.year}</h2>
            {reports.length === 0 ? (
              <p>
                The FCRA annual report for fiscal year {params.year} will be
                made available here.
              </p>
            ) : (
              <ul style={{ marginLeft: 20 }}>
                {reports.map((r) => (
                  <li key={r.id} style={{ marginBottom: 8 }}>
                    <a href={r.file} target="_blank" rel="noreferrer">
                      {r.title}
                    </a>
                    {r.publishedAt && (
                      <span style={{ color: "#888", marginLeft: 8 }}>
                        ({r.publishedAt})
                      </span>
                    )}
                    {r.description && (
                      <p style={{ color: "#666", marginTop: 4 }}>
                        {r.description}
                      </p>
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
