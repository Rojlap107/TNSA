import TeamRoster from "../../../components/TeamRoster";
import { getTeamRoster } from "../../../lib/getPlayers";

export default async function WomenTeamPage() {
  const entries = await getTeamRoster("women");

  return (
    <TeamRoster
      title="Women's Tibetan National Team"
      entries={entries}
      sectionId="national-team-women"
    />
  );
}
