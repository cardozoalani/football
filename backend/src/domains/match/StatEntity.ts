class StatEntity {
  type: string;
  home: string;
  away: string;

  constructor(data: any) {
    this.type = data.type;
    this.home = data.home;
    this.away = data.away;
  }
}

export { StatEntity };
