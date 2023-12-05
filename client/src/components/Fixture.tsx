import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRequest } from "../hooks/useRequest";
import { Match } from "../common/types/apiResponse";
import { CardMedia, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

interface FixtureProps {
  teamId: string;
}
export default function Fixture({ teamId }: FixtureProps) {
  const [rows, setRows] = React.useState<Match[]>();
  const { doRequest } = useRequest({
    url: `/matches/${teamId}/matches`,
    method: "get",
    onSuccess: (match: Match[]) => {
      setRows(match);
    },
  });
  React.useEffect(() => {
    doRequest();
  }, [teamId]);
  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h5"
        style={{
          textAlign: "center",
        }}
      >
        FIXTURE
      </Typography>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>VS</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">A/H (alway/home)</TableCell>
            <TableCell align="right">League</TableCell>
            <TableCell align="right">Day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.matchId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      row.matchAwayteamId === teamId
                        ? row.teamHomeBadge
                        : row.teamAwayBadge
                    }
                    alt="team icon"
                    style={{
                      width: "5%",
                      alignSelf: "center",
                      marginRight: "5px",
                    }}
                  />
                  {row.matchAwayteamId === teamId
                    ? row.matchHometeamName
                    : row.matchAwayteamName}
                </Grid>
              </TableCell>
              <TableCell align="right">
                {row.goals[0]?.score ?? '0 - 0'}
              </TableCell>
              <TableCell align="right">
                {row.matchAwayteamId === teamId ? "A" : "H"}
              </TableCell>
              <TableCell align="right">
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={row.leagueLogo}
                    alt="team icon"
                    style={{
                      width: "5%",
                      alignSelf: "center",
                      marginRight: "5px",
                    }}
                  />
                  {row.leagueName}
                </Grid>
              </TableCell>
              <TableCell align="right">
                {dayjs(row.matchDate).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
