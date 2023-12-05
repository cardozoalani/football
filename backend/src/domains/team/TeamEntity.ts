import CoachEntity from "./CoachEntity";
import PlayerEntity from "../player/PlayerEntity";

class TeamEntity {
  teamKey: string;
  teamName: string;
  teamCountry: string;
  teamFounded: string;
  teamBadge: string;
  venue: {
    venueName: string;
    venueAddress: string;
    venueCity: string;
    venueCapacity: string;
    venueSurface: string;
  };
  players: PlayerEntity[];
  coaches: CoachEntity[];

  constructor(data: any) {
    this.teamKey = data.team_key;
    this.teamName = data.team_name;
    this.teamCountry = data.team_country;
    this.teamFounded = data.team_founded;
    this.teamBadge = data.team_badge;
    this.venue = {
      venueName: data.venue.venue_name,
      venueAddress: data.venue.venue_address,
      venueCity: data.venue.venue_city,
      venueCapacity: data.venue.venue_capacity,
      venueSurface: data.venue.venue_surface,
    };
    this.players = data.players.map(
      (playerData: any) => new PlayerEntity(playerData)
    );
    this.coaches = data.coaches.map(
      (coachData: any) => new CoachEntity(coachData)
    );
  }
}

export default TeamEntity;
