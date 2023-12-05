import { SubstitutionDetailEntity } from "./SubstitutionDetailEntity";

class SubstitutionEntity {
  home: SubstitutionDetailEntity;
  away: SubstitutionDetailEntity;

  constructor(data: any) {
    this.home = data.home.map(
      (home: any) => new SubstitutionDetailEntity(home)
    );
    this.away = data.away.map(
      (away: any) => new SubstitutionDetailEntity(away)
    );
  }
}

export { SubstitutionEntity };
