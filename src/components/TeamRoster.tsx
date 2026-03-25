"use client";

import { useMemo, useState } from "react";

interface Player {
  name: string;
  location: string;
  image: string;
}

interface YearEntry {
  year: number;
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  forwards: Player[];
}

interface Props {
  title: string;
  entries: YearEntry[];
  sectionId: string;
}

export default function TeamRoster({ title, entries, sectionId }: Props) {
  const years = useMemo(() => {
    const set = new Set(entries.map((e) => e.year));
    for (let y = new Date().getFullYear(); y >= 2000; y--) set.add(y);
    return Array.from(set).sort((a, b) => b - a);
  }, [entries]);

  const [selectedYear, setSelectedYear] = useState<number>(
    years[0] || new Date().getFullYear()
  );
  const current = entries.find((e) => e.year === selectedYear);

  const Section = ({
    label,
    players,
  }: {
    label: string;
    players: Player[];
  }) => (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>{label}</h3>
      <div className="projects-grid">
        {players.map((p, i) => (
          <div key={i} className="project-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p style={{ padding: "0 20px 20px", color: "#666" }}>
              {p.location}
            </p>
          </div>
        ))}
        {!players.length ? (
          <p style={{ color: "#777" }}>No players listed.</p>
        ) : null}
      </div>
    </div>
  );

  return (
    <main>
      <section className="projects" id={sectionId}>
        <div className="container">
          <h2>{title}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: 24,
            }}
          >
            <aside
              className="about-section"
              style={{ height: "fit-content", position: "sticky", top: 20 }}
            >
              <h3 style={{ marginBottom: 10 }}>Years</h3>
              <div
                style={{
                  display: "grid",
                  gap: 6,
                  maxHeight: 500,
                  overflow: "auto",
                }}
              >
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className="project-btn"
                    style={{
                      background: y === selectedYear ? "#4A90E2" : "#eee",
                      color: y === selectedYear ? "#fff" : "#333",
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </aside>
            <div>
              <Section
                label="Goalkeepers"
                players={current?.goalkeepers || []}
              />
              <Section label="Defenders" players={current?.defenders || []} />
              <Section
                label="Midfielders"
                players={current?.midfielders || []}
              />
              <Section label="Forwards" players={current?.forwards || []} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
