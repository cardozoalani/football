describe('Complete flow', () => {
  it('Select team', () => {
    cy.visit("https://football-olive.vercel.app/");
    cy.get(".MuiInputBase-root").click()
    cy.get('li[data-option-index="0"]').click()
    cy.get(".MuiGrid-grid-md-8 > .MuiPaper-root > .MuiTypography-root").should(
      "have.text",
      "FIXTURE"
    );
  })
})