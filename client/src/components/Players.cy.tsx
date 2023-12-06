import React from 'react'
import Players from './Players'

describe('<Players />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Players teamId='88' />)
  })
  it("table structure", () => {
    cy.mount(<Players teamId="88" />);
    cy.get(".MuiTypography-root").should("have.text", "PLAYERS");
    cy.get(".css-1ygcj2i-MuiTableCell-root").should("have.text", "Name");
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
      "have.text",
      "Number"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(3)").should(
      "have.text",
      "Position"
    );    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(4)").should(
      "have.text",
      "Age"
    );    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(5)").should(
      "have.text",
      "Goals"
    );
  });
})