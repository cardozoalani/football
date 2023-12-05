import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRequest } from "../hooks/useRequest";
import { Player } from "../common/types/apiResponse";
import { Typography } from "@mui/material";

interface PlayersProps {
  teamId: string
}
export default function Players({ teamId }: PlayersProps) {
  const [rows, setRows] = React.useState<Player[]>()
    const { doRequest } = useRequest({
      url: `/teams/${teamId}/players`,
      method: "get",
      onSuccess: (players: Player[]) => {
        setRows(players);
      },
    });
    React.useEffect(() => {
      doRequest();
    }, [teamId]);
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" style={{
        textAlign: 'center'
      }}>PLAYERS</Typography>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Goals</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.playerId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.playerName}
              </TableCell>
              <TableCell align="right">{row.playerNumber}</TableCell>
              <TableCell align="right">{row.playerType}</TableCell>
              <TableCell align="right">{row.playerAge}</TableCell>
              <TableCell align="right">{row.playerGoals}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
