describe('E2E test for buying a security', () => {
  it('should buy a stock', () => {
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
    cy.get('button').contains('Buy').should('be.disabled');
    cy.wait(1000);
    let initQuantity: number;
    cy.get('h6#stockHoldings').then(($text) => {
      initQuantity = parseInt($text.text());
    });
    cy.get('input#buyQuantity').type('2');
    cy.get('button').contains('Buy').should('not.be.disabled');
    cy.wait(1000);
    cy.get('button').contains('Buy', { timeout: 15000 }).click();
    cy.wait(1000);
    let finalQuantity: number = 0;
    cy.get('h6#stockHoldings').then(($text) => {
      finalQuantity = parseInt($text.text());
      expect(finalQuantity).to.eq(initQuantity + 2);
    });
    cy.get('button.close').click();
    cy.get('li a').contains('Portfolio', { timeout: 15000 }).click();
    cy.wait(1000);
    cy.contains('MMM').should('exist');
    cy.contains(finalQuantity.toString()).should('exist');

    //SELL
    cy.get('li a').contains('Trade', { timeout: 15000 }).click();
    cy.wait(1000);
    cy.get('table tbody tr td')
      .contains('3M Company', { timeout: 15000 })
      .click();
    cy.get('a').contains('Sell').click();
    cy.get('button').contains('Sell').should('be.disabled');
    cy.get('h6#stockHoldings').then(($text) => {
      initQuantity = parseInt($text.text());
    });
    cy.get('input#sellQuantity').type('2');
    cy.get('button').contains('Sell').should('not.be.disabled');
    cy.get('button').contains('Sell', { timeout: 15000 }).click();
    cy.wait(1000);
    cy.get('h6#stockHoldings').then(($text) => {
      finalQuantity = parseInt($text.text());
      expect(finalQuantity).to.eq(initQuantity - 2);
    });
    cy.get('button.close').click();
    cy.get('li a').contains('Portfolio', { timeout: 15000 }).click();
    cy.wait(1000);
    cy.contains('MMM').should('exist');
    cy.contains(finalQuantity.toString()).should('exist');
  });
});
