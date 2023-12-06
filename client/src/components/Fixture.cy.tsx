import React from "react";
import Fixture from "./Fixture";

describe("<Fixture />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Fixture teamId="88" />);
  });
  it("table structure", () => {
    cy.mount(<Fixture teamId="88" />);
    cy.get(".MuiTypography-root").should("have.text", "FIXTURE");
    cy.get(".css-1ygcj2i-MuiTableCell-root").should("have.text", "VS");
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
      "have.text",
      "Score"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(3)").should(
      "have.text",
      "A/H (alway/home)"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(4)").should(
      "have.text",
      "League"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(5)").should(
      "have.text",
      "Day"
    );
  });
});
