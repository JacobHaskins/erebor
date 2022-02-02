describe('Stock Comparison Integration Test', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })

  it('should render', () => {
    cy.get('h1')
    .should('have.text', 'Stock Comparison');
  })

  it('should search for a stock and pin it', () => {
    cy.get('#search-bar')
    .should('be.visible')
    .type('F{enter}')
    .wait(2000)
    .get('.result-item')
    .first()
    .click()
    .wait(2000)
    .get('.stock-card')
    .first()
    .should('include.text', 'Ford Motor');
  })
})
