import { sanityClient } from "../sanity/client";
import menData from "../data/national-team-men.json";
import womenData from "../data/national-team-women.json";

export interface Player {
  name: string;
  location: string;
  image: string;
}

export interface TeamYear {
  year: number;
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  forwards: Player[];
}

const QUERY = `*[_type=="player" && team==$team]|order(year desc, name asc){
  name,
  year,
  position,
  location,
  "image": coalesce(photo.asset->url, "")
}`;

export async function getTeamRoster(team: "men" | "women"): Promise<TeamYear[]> {
  const jsonData: TeamYear[] = (team === "men" ? menData : womenData) as TeamYear[];

  let sanityPlayers: { name: string; year: number; position: string; location: string; image: string }[] = [];
  try {
    sanityPlayers = await sanityClient.fetch(QUERY, { team });
  } catch {}

  if (!sanityPlayers.length) return jsonData;

  // Group Sanity players by year
  const sanityByYear = new Map<number, typeof sanityPlayers>();
  for (const p of sanityPlayers) {
    const arr = sanityByYear.get(p.year) || [];
    arr.push(p);
    sanityByYear.set(p.year, arr);
  }

  // Merge: combine all years from both sources
  const allYears = new Set([
    ...jsonData.map((y) => y.year),
    ...sanityByYear.keys(),
  ]);

  const result: TeamYear[] = [];
  for (const year of Array.from(allYears).sort((a, b) => b - a)) {
    const jsonYear = jsonData.find((y) => y.year === year);
    const sanityYear = sanityByYear.get(year);

    if (sanityYear) {
      const gk: Player[] = [];
      const df: Player[] = [];
      const mf: Player[] = [];
      const fw: Player[] = [];
      for (const p of sanityYear) {
        const player: Player = { name: p.name, location: p.location || "", image: p.image || "" };
        if (p.position === "goalkeeper") gk.push(player);
        else if (p.position === "defender") df.push(player);
        else if (p.position === "midfielder") mf.push(player);
        else if (p.position === "forward") fw.push(player);
      }
      result.push({
        year,
        goalkeepers: [...(jsonYear?.goalkeepers || []), ...gk],
        defenders: [...(jsonYear?.defenders || []), ...df],
        midfielders: [...(jsonYear?.midfielders || []), ...mf],
        forwards: [...(jsonYear?.forwards || []), ...fw],
      });
    } else if (jsonYear) {
      result.push(jsonYear);
    }
  }

  return result;
}
