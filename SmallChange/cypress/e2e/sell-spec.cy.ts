describe('E2E test for selling a security', () => {
  it('should selling a stock', () => {
    cy.visit('/');
    cy.contains('SmallChange');
    cy.get('button').contains('Login', { timeout: 15000 }).click();
    cy.get('input[name="username"]').type('a000007@gmail.com');
    cy.get('input[name="password"]').type('itsasecret101');
    cy.get('button.btn').click();
    cy.get('li a').contains('Trade', { timeout: 15000 }).click();
    cy.wait(1000);
    cy.get('table tbody tr td')
      .contains('3M Company', { timeout: 15000 })
      .click();
    cy.get('a').contains('Sell').click();
    cy.get('button').contains('Sell').should('be.disabled');
    let initQuantity: number;
    cy.get('h6#stockHoldings').then(($text) => {
      initQuantity = parseInt($text.text());
    });
    cy.get('input#sellQuantity').type('2');
    cy.get('button').contains('Sell').should('not.be.disabled');
    cy.get('button').contains('Sell', { timeout: 15000 }).click();
    cy.wait(1000);
    let finalQuantity: number;
    cy.get('h6#stockHoldings').then(($text) => {
      finalQuantity = parseInt($text.text());
      expect(finalQuantity).to.not.eq(initQuantity);
    });
  });
});
