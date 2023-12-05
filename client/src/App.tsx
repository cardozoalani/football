import React, { useEffect, useState } from "react";
import Select from "./components/Select";
import Dashboard from "./container/Dashboard";
import { Grid } from "@mui/material";
import { useRequest } from "./hooks/useRequest";
import { Team } from "./common/types/apiResponse";
import TeamInfo from "./components/TeamInfo";
import Fixture from "./components/Fixture";
import Players from "./components/Players";

function App() {
  const [teams, setTeams] = useState<Team[]>();
  const [team, setTeam] = useState<Team>();
  const { doRequest } = useRequest({
    url: "/teams",
    method: "get",
    onSuccess: (teams: Team[]) => {
      setTeams(teams);
    },
  });
  useEffect(() => {
    doRequest();
  }, []);
  const handleTeam = (e: React.ChangeEvent<HTMLInputElement>, v: any) => {
    setTeam(v);
  };
  return (
    <Dashboard>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item mt={10}>
          <Select
            label="Football team"
            options={teams ? teams : []}
            onChange={handleTeam}
          />
        </Grid>
        <Grid item mt={2}>
          {team && (
            <TeamInfo
              name={team.team_name}
              icon={team.team_badge}
              country={team.team_country}
              yearFounded={team.team_founded}
            />
          )}
        </Grid>
        {team && (
          <Grid container mt={2}>
            <Grid item xs={12} md={8} padding={1}>
              <Fixture teamId={team?.team_key} />
            </Grid>
            <Grid item xs={12} md={4} padding={1}>
              <Players teamId={team?.team_key} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Dashboard>
  );
}

export default App;
