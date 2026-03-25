import TeamRoster from "../../../components/TeamRoster";
import { getTeamRoster } from "../../../lib/getPlayers";

export default async function MenTeamPage() {
  const entries = await getTeamRoster("men");

  return (
    <TeamRoster
      title="Men's Tibetan National Team"
      entries={entries}
      sectionId="national-team-men"
    />
  );
}
