class CoachEntity {
  coachName: string;
  coachCountry: string;
  coachAge: string;

  constructor(data: any) {
    this.coachName = data.coach_name;
    this.coachCountry = data.coach_country;
    this.coachAge = data.coach_age;
  }
}

export default CoachEntity;
