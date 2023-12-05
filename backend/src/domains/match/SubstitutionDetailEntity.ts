class SubstitutionDetailEntity {
  time: string;
  substitution: string;
  substitutionPlayerId: string;

  constructor(data: any) {
    this.time = data.time;
    this.substitution = data.substitution;
    this.substitutionPlayerId = data.substitution_player_id
  }
}

export { SubstitutionDetailEntity };