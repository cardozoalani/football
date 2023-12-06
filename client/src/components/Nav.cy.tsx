import React from 'react'
import NavBar from './Nav'

describe('<NavBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavBar />)
    cy.get(".MuiTypography-h5").should("have.text", "FOOTBALL");
  })
})