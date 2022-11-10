describe('Initial Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('SmallChange');
  });
});
