import React from 'react'
import Select from './Select'

describe('<Select />', () => {
  const mockData = {
    label: "Football team",
    options: [
      {
        team_key: "3429",
        team_name: "Crystal Palace",
        team_country: "England",
        team_founded: "1905",
        team_badge:
          "https://apiv3.apifootball.com/badges/3429_crystal-palace.jpg",
      }
    ],
    onChange: () => console.log("change"),
  };
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Select
        label={mockData.label}
        options={mockData.options}
        onChange={mockData.onChange}
      />
    );
    cy.get(".MuiInputBase-root").click()
  })
})