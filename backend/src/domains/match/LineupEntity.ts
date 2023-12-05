import { LineupDetailEntity } from "./LineupDetailEntity";

class LineupEntity {
  home: LineupDetailEntity;
  away: LineupDetailEntity;

  constructor(data: any) {
    this.home = new LineupDetailEntity(data.home);
    this.away = new LineupDetailEntity(data.away);
  }
}

export { LineupEntity };