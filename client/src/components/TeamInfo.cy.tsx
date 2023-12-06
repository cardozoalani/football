import React from "react";
import TeamInfo from "./TeamInfo";

describe("<TeamInfo />", () => {
  const modkData = {
    icon: "	https://apiv3.apifootball.com/badges/80_manchester-city.jpg",
    name: "Manchester City",
    yearFounded: "1880",
    country: "England",
  };
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <TeamInfo
        icon={modkData.icon}
        name={modkData.name}
        yearFounded={modkData.yearFounded}
        country={modkData.country}
      />
    );
    cy.get(
      ":nth-child(1) > .MuiListItemText-root > .MuiTypography-root"
    ).should("have.text", modkData.country);
    cy.get(
      ":nth-child(2) > .MuiListItemText-root > .MuiTypography-root"
    ).should("have.text", modkData.yearFounded);
  });
});
