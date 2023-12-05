import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { CardActionArea, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface TeamInfoProps {
    icon: string
    name: string
    country: string
    yearFounded: string
}

export default function TeamInfo({ icon, name, country, yearFounded }: TeamInfoProps) {
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={icon}
          alt="team icon"
          style={{
            width: "40%",
            alignSelf: "center",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary={country} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary={yearFounded} />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
