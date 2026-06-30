import { notFound } from "next/navigation";
import { getFcraReportsByYear } from "../../../../lib/getFcraReports";

const VALID_YEARS = ["2025-26", "2024-25", "2023-24"];
const QUARTERS: { id: "Q1" | "Q2" | "Q3" | "Q4"; label: string }[] = [
  { id: "Q1", label: "Q1 (Apr – Jun)" },
  { id: "Q2", label: "Q2 (Jul – Sep)" },
  { id: "Q3", label: "Q3 (Oct – Dec)" },
  { id: "Q4", label: "Q4 (Jan – Mar)" },
];

export function generateStaticParams() {
  return VALID_YEARS.map((year) => ({ year }));
}

export const dynamic = "force-dynamic";

export default async function FcraQuarterlyReceiptPage(props: any) {
  const params = (await props?.params) as { year: string };
  if (!VALID_YEARS.includes(params.year)) return notFound();

  const reports = await getFcraReportsByYear("quarterly-receipt", params.year);

  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>FCRA Quarterly Receipt {params.year}</h1>
          <p>
            Quarterly disclosure of foreign contributions received under the
            Foreign Contribution (Regulation) Act.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <h2>Quarterly Receipts — FY {params.year}</h2>
            <ul style={{ marginLeft: 20 }}>
              {QUARTERS.map((q) => {
                const match = reports.find((r) => r.quarter === q.id);
                return (
                  <li key={q.id} style={{ marginBottom: 10 }}>
                    <strong>{q.label}</strong>{" "}
                    {match ? (
                      <a
                        href={match.file}
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginLeft: 8 }}
                      >
                        Download
                      </a>
                    ) : (
                      <span style={{ color: "#888", marginLeft: 8 }}>
                        — coming soon
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="about-section">
            <p>
              Quarterly receipts are published within 15 days of the end of
              each quarter, as required by FCRA disclosure rules.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
